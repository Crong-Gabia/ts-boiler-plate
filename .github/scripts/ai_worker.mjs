import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

function mustEnv(name) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing required env: ${name}`)
  return v
}

async function sh(cmd, args, opts = {}) {
  const { stdout, stderr } = await execFileAsync(cmd, args, {
    ...opts,
    env: {
      ...process.env,
      ...(opts.env ?? {}),
    },
  })
  return { stdout, stderr }
}

async function githubJson(url, token) {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`GitHub API failed: ${res.status} ${res.statusText} ${text}`)
  }
  return res.json()
}

async function openAiGeneratePlan({ apiKey, model, issueTitle, issueBody }) {
  const prompt = [
    'You are an engineering agent. Produce an implementation plan for the issue.',
    'Constraints:',
    '- Output must be concise and actionable.',
    '- Include: Summary, Proposed Changes (file-level), Test Plan, Risks, Open Questions.',
    '',
    `Issue Title: ${issueTitle}`,
    'Issue Body:',
    issueBody || '(empty)',
  ].join('\n')

  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: prompt,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`OpenAI API failed: ${res.status} ${res.statusText} ${text}`)
  }

  const json = await res.json()
  // responses API: concatenate output_text
  const output = (json.output ?? [])
    .flatMap((o) => o.content ?? [])
    .filter((c) => c.type === 'output_text')
    .map((c) => c.text)
    .join('')

  return output.trim() || '(no output)'
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true })
}

async function main() {
  const githubToken = mustEnv('GITHUB_TOKEN')
  const repo = mustEnv('GITHUB_REPOSITORY') // owner/name
  const issueNumberRaw = mustEnv('ISSUE_NUMBER')
  const issueNumber = Number(issueNumberRaw)
  if (!Number.isFinite(issueNumber) || issueNumber <= 0) {
    throw new Error(`Invalid ISSUE_NUMBER: ${issueNumberRaw}`)
  }

  const openAiKey = mustEnv('OPENAI_API_KEY')
  const openAiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const baseBranch = process.env.BASE_BRANCH || 'main'
  const branchName = process.env.BRANCH_NAME || `ai/issue-${issueNumber}`

  const issue = await githubJson(`https://api.github.com/repos/${repo}/issues/${issueNumber}`, githubToken)
  const issueTitle = String(issue.title ?? '')
  const issueBody = String(issue.body ?? '')

  const plan = await openAiGeneratePlan({
    apiKey: openAiKey,
    model: openAiModel,
    issueTitle,
    issueBody,
  })

  await sh('git', ['fetch', 'origin', baseBranch])
  await sh('git', ['checkout', '-B', branchName, `origin/${baseBranch}`])

  await sh('git', ['config', 'user.name', 'dev-factory-bot'])
  await sh('git', ['config', 'user.email', 'dev-factory-bot@users.noreply.github.com'])

  const outDir = path.join(process.cwd(), 'dev-factory-output', `issue-${issueNumber}`)
  await ensureDir(outDir)

  const outPath = path.join(outDir, 'plan.md')
  const md = [
    `# AI Plan: Issue #${issueNumber}`,
    '',
    `- Repo: ${repo}`,
    `- Issue: ${issue.html_url ?? ''}`,
    `- Model: ${openAiModel}`,
    '',
    '## Issue',
    `### ${issueTitle}`,
    '',
    issueBody || '(empty)',
    '',
    '## Plan',
    plan,
    '',
  ].join('\n')
  await fs.writeFile(outPath, md, 'utf8')

  await sh('git', ['add', outPath])

  const hasChanges = (await sh('git', ['status', '--porcelain'])).stdout.trim().length > 0
  if (!hasChanges) {
    throw new Error('No changes to commit (unexpected)')
  }

  await sh('git', ['commit', '-m', `docs(dev-factory): add AI plan for issue #${issueNumber}`])
  await sh('git', ['push', '--set-upstream', 'origin', branchName])

  // Create PR via gh (available on GitHub-hosted runners)
  const prTitle = `AI: Plan for #${issueNumber} - ${issueTitle}`.slice(0, 240)
  const prBody = [
    `Closes #${issueNumber}.`,
    '',
    'This PR was created by the Dev Factory MVP worker.',
    '',
    '- Output: `dev-factory-output/issue-' + issueNumber + '/plan.md`',
  ].join('\n')

  await sh(
    'gh',
    [
      'pr',
      'create',
      '--base',
      baseBranch,
      '--head',
      branchName,
      '--title',
      prTitle,
      '--body',
      prBody,
    ],
    {
      env: {
        GH_TOKEN: githubToken,
      },
    }
  )
}

await main()

#!/usr/bin/env node
import { spawnSync } from 'child_process'

function run(cmd, args, opts = {}) {
  const out = spawnSync(cmd, args, { stdio: 'inherit', ...opts })
  return out
}

// Run the safety checker first
const checker = spawnSync('node', ['--experimental-specifier-resolution=node', './scripts/release-safe.mjs'], { encoding: 'utf8' })
// If checker printed anything, log it so CI contains the full diagnostic
if (checker.stdout) console.log('release-safe stdout:\n' + checker.stdout)
if (checker.stderr) console.error('release-safe stderr:\n' + checker.stderr)

if (checker.status === 3) {
  console.log('\nrelease-safe reported release already applied (tag points to HEAD). Skipping standard-version.')
  process.exit(0)
}

if (checker.status !== 0) {
  console.error('\nrelease-safe failed. Aborting release.')
  // Preserve the checker status so CI error is meaningful
  process.exit(checker.status || 1)
}

// Safe to run standard-version
console.log('\nRunning standard-version...')
const runner = run('npx', ['standard-version'])
process.exit(runner.status || 0)

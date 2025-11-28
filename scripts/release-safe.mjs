#!/usr/bin/env node
import { execSync } from 'child_process'
import fs from 'fs'

function log(...args) {
  console.log('[release-safe]', ...args)
}

function semverToTuple(v) {
  const clean = v.replace(/^v/, '')
  const parts = clean.split('.')
  return parts.map((p) => parseInt(p, 10) || 0)
}

function cmpSemver(a, b) {
  const A = semverToTuple(a)
  const B = semverToTuple(b)
  for (let i = 0; i < 3; i++) {
    if (A[i] > B[i]) return 1
    if (A[i] < B[i]) return -1
  }
  return 0
}

try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const currentVersion = pkg.version
  log('current package.json version:', currentVersion)

  log('fetching tags...')
  try {
    execSync('git fetch --tags --quiet')
  } catch (e) {
    log('warning: git fetch failed (continuing)')
  }

  const rawTags = execSync('git tag --list', { encoding: 'utf8' })
    .split(/\r?\n/)
    .map((t) => t.trim())
    .filter(Boolean)

  const semverTags = rawTags.filter((t) => /^v?\d+\.\d+\.\d+$/.test(t))

  const conflicting = semverTags.filter((t) => cmpSemver(t, currentVersion) > 0)

  if (conflicting.length === 0) {
    log('no existing tags found that are greater than package.json version. safe to release.')
    process.exit(0)
  }

  log('found existing tag(s) greater than current version:', conflicting.join(', '))

  const force = (process.env.FORCE_RELEASE || '').toLowerCase() === 'true'
  if (!force) {
    console.error('\nERROR: There are existing git tag(s) newer than the current package.json version.')
    console.error('This would cause `standard-version` to attempt to create a tag that already exists and fail.')
    console.error('\nConflicting tag(s):', conflicting.join(', '))
    console.error('\nOptions:')
    console.error('- Delete the conflicting tag(s) on the remote and retry:')
    console.error("    git push --delete origin <tag>")
    console.error('- Or run with FORCE_RELEASE=true to automatically remove the lowest conflicting tag and continue:')
    console.error('    FORCE_RELEASE=true npm run release')
    process.exit(1)
  }

  const sorted = conflicting.sort((a, b) => cmpSemver(a, b))
  const toDelete = sorted[0]
  log('FORCE_RELEASE is set: will delete tag', toDelete, 'and attempt to continue')

  try {
    execSync(`git tag -d ${toDelete}`, { stdio: 'inherit' })
  } catch (e) {
    log('local tag deletion had an error or tag did not exist locally (continuing)')
  }

  try {
    execSync(`git push --delete origin ${toDelete}`, { stdio: 'inherit' })
  } catch (e) {
    console.error('warning: failed to delete remote tag', toDelete, '(you may need to delete it manually)')
  }

  log('done. continuing with release')
  process.exit(0)
} catch (err) {
  console.error('release-safe error:', err && err.message ? err.message : err)
  process.exit(2)
}

# trivio

## Testing & Releases

- Run tests locally:

```bash
pnpm install
pnpm test
```

- To enable automated releases and npm publishing from GitHub Actions:
	- Add `NPM_TOKEN` to the repository secrets (your npm token).
	- The workflow will use `standard-version` to bump `package.json` and create tags.
	- On `push` to `master`, the `release` workflow runs `pnpm run release` and then publishes with `pnpm publish`.

Install the dev dependencies locally if you want to run releases locally:

```bash
pnpm add -D vitest standard-version
```

Note: The GitHub Actions workflows expect `pnpm` (lockfile `pnpm-lock.yaml` is present).

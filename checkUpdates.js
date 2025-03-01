import { execSync } from "child_process";
import { createRequire } from "module";
import * as p from "@clack/prompts";
import color from "picocolors";

const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

const CURRENT_VERSION = packageJson.version;
const PACKAGE_NAME = packageJson.name;

/**
 * Detects the package manager used globally
 * Defaults to `npm` if not detected
 */
function detectPackageManager() {
  try {
    execSync("pnpm --version", { stdio: "ignore" });
    return "pnpm";
  } catch {
    try {
      execSync("yarn --version", { stdio: "ignore" });
      return "yarn";
    } catch {
      return "npm";
    }
  }
}

/**
 * Checks for updates and prompts the user to update if needed.
 */
async function checkForUpdates() {
  try {
    const latestVersion = execSync(`npm show ${PACKAGE_NAME} version`, {
      encoding: "utf-8",
    }).trim();

    if (latestVersion !== CURRENT_VERSION) {
      p.log.step(
        `${color.yellow(`🚀 A new version (${latestVersion}) of ${PACKAGE_NAME} is available!`)}`
      );

      const updateChoice = await p.select({
        message: "Update now?",
        options: [
          { value: "yes", label: "✅ Yes, update now" },
          { value: "later", label: "⏳ Remind me later" },
        ],
      });

      if (updateChoice === "yes") {
        const packageManager = detectPackageManager();
        const updateCommand =
          packageManager === "pnpm"
            ? `pnpm add -g ${PACKAGE_NAME}`
            : packageManager === "yarn"
            ? `yarn global add ${PACKAGE_NAME}`
            : `npm install -g ${PACKAGE_NAME}`;

        p.log.step(`🔄 Updating with ${color.green(packageManager)}...`);

        const s = p.spinner();
        s.start();
        try {
          execSync(updateCommand, { stdio: "inherit" });
          s.stop("✅ Update complete! Restart the CLI to use the latest version.");
          process.exit(0);
        } catch (updateError) {
          s.stop();
          p.log.error(`❌ Update failed: ${color.red(updateError.message)}`);
        }
      } else {
        p.log.info("📌 Update skipped. You can update manually later.");
      }
    } else {
      p.log.success("✅ You are using the latest version.");
    }
  } catch (error) {
    p.log.error(`❌ Error checking for updates: ${color.red(error.message)}`);
  }
}

export default checkForUpdates;

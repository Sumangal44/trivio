#!/usr/bin/env node
import welcome from "conwelcome";
import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import { createRequire } from "module";
import { questionsData } from "./questions.js";
import checkForUpdates from './checkUpdates.js';

const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

const CURRENT_VERSION = packageJson.version;
const PACKAGE_NAME = packageJson.name;
const DESCRIPTION = packageJson.description;
const TAGLINE = packageJson.author.name;
let totalCorrect = 0;

/**
 * Displays a welcome message.
 */
const displayWelcomeMessage = () => {
  welcome({
    title: `🔥 ${PACKAGE_NAME} 🔥`,
    tagLine: `by ${TAGLINE} 💻`,
    description: `${DESCRIPTION}`,
    bgColor: "#fadc5e",
    color: "#000000",
    bold: true,
    clear: true,
    version: `${CURRENT_VERSION}`,
  });
};

// Function to handle errors gracefully
process.on("uncaughtException", (err) => {
  console.error(color.bgRed(color.white(` Error: ${err.message} `)));
  process.exit(1);
});

async function askQuestion(question, answers, correctAnswerIndex) {
  const options = answers.map((answer) => ({
    value: answer,
    label: answer,
  }));

  const answer = await p.select({
    message: question,
    options,
  });

  const s = p.spinner();
  s.start();
  await setTimeout(1000);
  s.stop();

  if (answer === answers[correctAnswerIndex]) {
    totalCorrect++;
  }
}

// async function main() {
//   console.clear();
//   await setTimeout(1000);
//   displayWelcomeMessage();
  
//   p.intro(
//     `${color.bgMagenta(
//       color.black(" Welcome to Trivio! Test your tech knowledge in a fun way! ")
//     )}`
//   );

 // Choose technology category
//   const techCategory = await p.select({
//     message: "Select a category for your quiz:",
//     options: [
//       { value: "html", label: "HTML" },
//       { value: "css", label: "CSS" },
//       { value: "js", label: "JavaScript" },
//       { value: "python", label: "Python" },
//       { value: "cli", label: "CLI & Linux" },
//     ],
//   });

//   const questions = questionsData[techCategory] || [];

  // Ask if the player is ready
//   const readyToPlay = await p.select({
//     message: "10 questions. No cheating! Ready to play?",
//     options: [
//       { value: "Yes", label: "Yes" },
//       { value: "No", label: "No" },
//     ],
//   });

//   if (readyToPlay === "Yes") {
//     for (const { question, answers, correctAnswerIndex } of questions) {
//       await askQuestion(question, answers, correctAnswerIndex);
//     }

    // Show results
    // p.outro(
    //   `${color.bgMagenta(color.black(`You got ${totalCorrect}/${questions.length} correct!`))}`
    // );

//     if (totalCorrect === questions.length) {
//       const s = p.spinner();
//       s.start("Generating secret message...");
//       await setTimeout(5000);
//       s.stop();
//       p.outro(
//         `${color.bgGreen(color.black(`🎉 Amazing! You're a true ${techCategory} expert! 🎉`))}`
//       );
//     } else {
//       p.outro(
//         `${color.bgRed(
//           color.white(`😢 You need a perfect score to unlock the secret message. Try again!`)
//         )}`
//       );
//     }
//   } else {
//     p.outro(`${color.bgMagenta(color.black(`Goodbye! Come back when you're ready!`))}`);
//   }
// }
//}
// main().catch((err) => {
//   console.error(color.bgRed(color.white(` Unexpected Error: ${err.message} `)));
// });

// 🌟 Run CLI Tool
(async () => {
    try {
      console.log('🔍 Checking for updates... ⏳');
      const updateAvailable = await checkForUpdates(); // Wait for update check
      if (updateAvailable) {
        console.log('🔄 Update completed. Please restart the CLI.');
        process.exit(0); // Exit after update
      }
        displayWelcomeMessage();
        p.intro(
            `${color.bgMagenta(
              color.black(" Welcome to Trivio! Test your tech knowledge in a fun way! ")
            )}`
          );
         // Choose technology category
  const techCategory = await p.select({
    message: "Select a category for your quiz:",
    options: [
      { value: "html", label: "HTML" },
      { value: "css", label: "CSS" },
      { value: "js", label: "JavaScript" },
      { value: "python", label: "Python" },
      { value: "cli", label: "CLI & Linux" },
    ],
  });

  const questions = questionsData[techCategory] || [];

  const readyToPlay = await p.select({
    message: "10 questions. No cheating! Ready to play?",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  });

  if (readyToPlay === "Yes") {
    for (const { question, answers, correctAnswerIndex } of questions) {
      await askQuestion(question, answers, correctAnswerIndex);
    }
        // Show results
        p.outro(
            `${color.bgMagenta(color.black(`You got ${totalCorrect}/${questions.length} correct!`))}`
          );
      
    if (totalCorrect === questions.length) {
        const s = p.spinner();
        s.start("Generating secret message...");
        await setTimeout(5000);
        s.stop();
        p.outro(
          `${color.bgGreen(color.black(`🎉 Amazing! You're a true ${techCategory} expert! 🎉`))}`
        );
      } else {
        p.outro(
          `${color.bgRed(
            color.white(`😢 You need a perfect score to unlock the secret message. Try again!`)
          )}`
        );
      }
    } else {
      p.outro(`${color.bgMagenta(color.black(`Goodbye! Come back when you're ready!`))}`);
    }
   
    } catch (err) {
      if (err.message.includes('User force closed the prompt')) {
        console.error(color.bgRed(color.white(` Unexpected Error: ${err.message} `)));
        console.log('🚫 Operation canceled by user.');
        process.exit(0); // ✅ Exit normally without error
      }
    }
  })();
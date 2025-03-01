export const questionsData = {
  html: [
    {
      question: "1) What is the correct HTML element for inserting a line break?",
      answers: ["<br>", "<break>", "<lb>", "<line>"],
      correctAnswerIndex: 0,
    },
    {
      question: "2) Which HTML tag is used to define an unordered list?",
      answers: ["<ul>", "<ol>", "<li>", "<list>"],
      correctAnswerIndex: 1,
    },
    {
      question: "3) What is the purpose of the `<meta>` tag in HTML?",
      answers: [
        "Creates a new section in the document",
        "Adds images to the document",
        "Defines metadata about the document",
        "Defines a hyperlink",
      ],
      correctAnswerIndex: 2,
    },
    {
      question: "4) Which attribute specifies an alternative text for an image?",
      answers: ["src", "title", "alt", "href"],
      correctAnswerIndex: 2,
    },
    {
      question: "5) What is the correct HTML for creating a hyperlink?",
      answers: [
        "<link src='https://example.com'>Visit</link>",
        "<url>https://example.com</url>",
        "<a href='https://example.com'>Visit</a>",
        "<href>https://example.com</href>",
      ],
      correctAnswerIndex: 2,
    },
    {
      question: "6) Which HTML tag is used to create a table?",
      answers: ["<tab>", "<tr>", "<table>", "<td>"],
      correctAnswerIndex: 2,
    },
    {
      question: "7) What does the `<title>` tag do in an HTML document?",
      answers: [
        "Links an external stylesheet",
        "Creates a title bar on the webpage",
        "Defines the main heading",
        "Specifies the title of the webpage (shown in the browser tab)",
      ],
      correctAnswerIndex: 3,
    },
    {
      question: "8) How can you open a link in a new tab using HTML?",
      answers: [
        "It happens automatically",
        "Use `<newtab>` element",
        "Add `open='new'` to the `<a>` tag",
        "Add `target='_blank'` to the `<a>` tag",
      ],
      correctAnswerIndex: 3,
    },
    {
      question: "9) Which HTML tag is used to define important text?",
      answers: ["<b>", "<i>", "<em>", "<strong>"],
      correctAnswerIndex: 3,
    },
    {
      question: "10) What is the correct way to comment in HTML?",
      answers: [
        "// This is a comment",
        "/* This is a comment */",
        "# This is a comment",
        "<!-- This is a comment -->",
      ],
      correctAnswerIndex: 3,
    }
  ],
      cli: [
      {
        question: "1) What year was PowerShell first released?",
        answers: ["1993", "1999", "2006", "2014"],
        correctAnswerIndex: 2,
      },
      {
        question: "2) What display technology was used in early terminals with green text?",
        answers: [
          "Cathode Ray Tube (CRT)",
          "Vapotron Display",
          "Lumigenic Screen",
          "Phosphor-Enhanced Matrix",
        ],
        correctAnswerIndex: 0,
      },
      {
        question: "3) What year did macOS switch from Bash to Zsh?",
        answers: ["1990", "2013", "2019", "2022"],
        correctAnswerIndex: 2,
      },
    ],
    js: [
      {
        question: "1) Which keyword is used to declare a constant variable in JavaScript?",
        answers: ["var", "let", "const", "static"],
        correctAnswerIndex: 2,
      },
      {
        question: "2) What does `typeof NaN` return?",
        answers: ["number", "string", "undefined", "NaN"],
        correctAnswerIndex: 0,
      },
      {
        question: "3) What will `console.log(0.1 + 0.2 === 0.3)` print?",
        answers: ["true", "false", "undefined", "NaN"],
        correctAnswerIndex: 1,
      },
    ],
  };
  
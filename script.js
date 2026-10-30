
const output = document.getElementById("output");
const input = document.getElementById("command");
const suggestions = document.getElementById("suggestions");

let history = [];
let historyIndex = -1;
let busy = false;

const commandNames = [
    "help",
    "whoami",
    "about",
    "education",
    "study",
    "domains",
    "skills",
    "interests",
    "goals",
    "journey",
    "contact",
    "github",
    "clear"
];

/* PERSONAL INFORMATION */

const data = {

    about: `
Hello! I am Sudharshan M.

I am a second-year Cyber Security student at
Chennai Institute of Technology.

I am interested in understanding how technology
works and how digital systems can be protected.

I believe in continuous learning, practical
experimentation and problem solving.
`,

    education: `
EDUCATION

Institution : Chennai Institute of Technology
Department  : Cyber Security
Year        : Second Year

Currently developing my foundation in
computer science, networking and cybersecurity.
`,

    study: `
CURRENT LEARNING

- Computer Networks
- Operating Systems
- Python Programming
- Linux Fundamentals
- Web Technologies
- Cybersecurity Fundamentals

Focus: Strengthening theoretical knowledge
through practical learning.
`,

    domains: `
AREAS OF INTEREST

01. Cybersecurity Fundamentals
02. Network Security
03. Ethical Hacking
04. Penetration Testing
05. Digital Forensics
06. Security Analysis

Currently exploring these domains
to identify and develop my strengths.
`,

    skills: `
TECHNICAL SKILLS

PROGRAMMING
- Python
- C
- Java
- JavaScript

TOOLS & TECHNOLOGIES
- Linux
- Kali Linux
- Wireshark
- Nmap
- Git & GitHub

SKILL LEVEL
Learning and developing through practice.
`,

    interests: `
AREAS THAT INTEREST ME

- Cybersecurity and digital security
- Ethical hacking and security research
- Networking and system administration
- Emerging technologies
- Problem solving
- Cricket
`,

    goals: `
CAREER GOAL

My goal is to build a career in cybersecurity
and work towards becoming a Security Analyst.

MY FOCUS

- Strengthen cybersecurity fundamentals.
- Improve programming and networking skills.
- Develop practical technical knowledge.
- Work on meaningful projects.
- Earn relevant certifications.
- Prepare for industry opportunities.
`,

    journey: `
MY LEARNING JOURNEY

01. Building a foundation in programming.
02. Exploring computer networks and Linux.
03. Learning cybersecurity fundamentals.
04. Practising with security tools.
05. Developing projects and technical skills.
06. Preparing for a cybersecurity career.

The journey is ongoing.
`
};

/* BASIC OUTPUT */

function printLine(text, className = "") {

    const line = document.createElement("div");

    line.className = "output-line " + className;
    line.textContent = text;

    output.appendChild(line);

    output.scrollTop = output.scrollHeight;
}

/* TYPING ANIMATION */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeOutput(text, className = "") {

    const line = document.createElement("pre");

    line.className = "output-line " + className;

    output.appendChild(line);

    for (const character of text) {

        line.textContent += character;

        output.scrollTop = output.scrollHeight;

        await sleep(5);
    }
}

/* PROFILE CARD */

function profileCard() {

    const card = document.createElement("div");

    card.className = "profile-card";

    const top = document.createElement("div");
    top.className = "profile-top";

    const avatar = document.createElement("div");
    avatar.className = "profile-avatar";
    avatar.textContent = "SM";

    const identity = document.createElement("div");

    const heading = document.createElement("h3");
    heading.textContent = "Sudharshan M";

    const role = document.createElement("p");
    role.textContent = "Cybersecurity Student";

    identity.append(heading, role);
    top.append(avatar, identity);

    const details = document.createElement("div");
    details.className = "profile-details";

    const profileData = [
        ["INSTITUTION", "Chennai Institute of Technology"],
        ["DEPARTMENT", "Cyber Security"],
        ["CAREER GOAL", "Security Analyst"],
        ["LOCATION", "Chennai, India"]
    ];

    profileData.forEach(([label, value]) => {

        const item = document.createElement("p");

        const labelElement = document.createElement("span");
        labelElement.textContent = label;

        item.append(labelElement, document.createTextNode(value));

        details.appendChild(item);
    });

    card.append(top, details);

    output.appendChild(card);

    output.scrollTop = output.scrollHeight;
}

/* CONTACT */

function showContact() {

    printLine("CONTACT & CONNECT", "output-heading");

    printLine("GitHub: https://github.com/sudharshan1812", "output-link");

    printLine("");
    printLine("More contact details will be added soon.");
}

/* HELP */

function showHelp() {

    printLine("AVAILABLE COMMANDS", "output-heading");

    printLine("");

    const descriptions = [
        ["help", "Display available commands"],
        ["whoami", "View my profile card"],
        ["about", "Learn about me"],
        ["education", "View my education"],
        ["study", "Explore what I am learning"],
        ["domains", "View cybersecurity interests"],
        ["skills", "View technical skills"],
        ["interests", "View personal interests"],
        ["goals", "Explore my career goals"],
        ["journey", "View my learning journey"],
        ["contact", "Contact and connect"],
        ["github", "Open my GitHub profile"],
        ["clear", "Clear the terminal"]
    ];

    descriptions.forEach(([command, description]) => {

        const line = document.createElement("div");

        line.className = "output-line";

        const commandSpan = document.createElement("span");
        commandSpan.className = "output-label";
        commandSpan.textContent = command.padEnd(13);

        const descriptionSpan = document.createElement("span");
        descriptionSpan.textContent = description;

        line.append(commandSpan, descriptionSpan);

        output.appendChild(line);
    });

    printLine("");
    printLine("Tip: Use TAB for autocomplete.");
    printLine("Use UP / DOWN arrows to navigate command history.");
}

/* COMMAND EXECUTION */

async function executeCommand(rawCommand) {

    const command = rawCommand.trim().toLowerCase();

    if (!command || busy) return;

    history.push(command);
    historyIndex = history.length;

    printLine("sudharshan@portfolio:~$ " + command, "output-label");

    input.value = "";

    suggestions.innerHTML = "";

    if (command === "clear") {

        output.innerHTML = "";
        return;
    }

    busy = true;

    try {

        if (command === "help") {

            showHelp();

        } else if (command === "whoami") {

            profileCard();

        } else if (command === "contact") {

            showContact();

        } else if (command === "github") {

            printLine("Opening GitHub profile...", "output-muted");

            window.open(
                "https://github.com/sudharshan1812",
                "_blank",
                "noopener,noreferrer"
            );

        } else if (data[command]) {

            await typeOutput(data[command]);

        } else {

            printLine(
                "Command not found: " + command,
                "output-error"
            );

            printLine("Type 'help' to see available commands.");
        }

    } finally {

        busy = false;
        input.focus();
    }
}

/* COMMAND SUGGESTIONS */

function updateSuggestions() {

    const value = input.value.toLowerCase().trim();

    suggestions.innerHTML = "";

    if (!value) return;

    const matches = commandNames.filter(command =>
        command.startsWith(value)
    );

    matches.slice(0, 5).forEach(command => {

        const button = document.createElement("button");

        button.className = "suggestion";
        button.textContent = command;

        button.addEventListener("click", () => {

            input.value = command;
            input.focus();

            executeCommand(command);
        });

        suggestions.appendChild(button);
    });
}

/* INPUT EVENTS */

input.addEventListener("input", updateSuggestions);

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();
        executeCommand(input.value);

    } else if (event.key === "ArrowUp") {

        event.preventDefault();

        if (history.length === 0) return;

        historyIndex = Math.max(0, historyIndex - 1);

        input.value = history[historyIndex];

        updateSuggestions();

    } else if (event.key === "ArrowDown") {

        event.preventDefault();

        historyIndex = Math.min(history.length, historyIndex + 1);

        input.value = historyIndex === history.length
            ? ""
            : history[historyIndex];

        updateSuggestions();

    } else if (event.key === "Tab") {

        event.preventDefault();

        const value = input.value.toLowerCase().trim();

        const match = commandNames.find(command =>
            command.startsWith(value)
        );

        if (match) {
            input.value = match;
            updateSuggestions();
        }
    }

});

/* TERMINAL CLICK FOCUS */

document.getElementById("inputArea").addEventListener("click", () => {
    input.focus();
});

document.querySelector(".terminal").addEventListener("click", () => {
    input.focus();
});

/* BOOT ANIMATION */

async function boot() {

    const screen = document.getElementById("bootScreen");

    const bar = document.getElementById("progressBar");

    const status = document.getElementById("bootStatus");

    const steps = [
        "Initializing personal workspace...",
        "Loading user profile...",
        "Preparing cybersecurity information...",
        "Terminal ready!"
    ];

    for (let i = 0; i < steps.length; i++) {

        status.textContent = steps[i];

        bar.style.width =
            ((i + 1) / steps.length * 100) + "%";

        await sleep(650);
    }

    await sleep(400);

    screen.classList.add("finished");

    await sleep(600);

    screen.remove();

    printLine("SUDHARSHAN.OS v3.0", "output-heading");

    printLine("Welcome to my personal workspace.");

    printLine("I am Sudharshan M, a Cybersecurity student.");

    printLine("Type 'help' to explore my profile.");

    printLine("");

    input.focus();
}

/* START */

boot();

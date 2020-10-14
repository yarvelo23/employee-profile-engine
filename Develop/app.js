const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// creating empty team member array to take input
const teamMembers = [];
const emptyId = [];

const employeePrompt = [
    {
        type: "input",
        name: "nameManager",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the manager's ID?"
    },
    {
        type: "input",
        name: "emailManager",
        message: "What is the manager's email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?"
    }
];

function manager() {
    console.log("Assembling your team!");
    inquirer.prompt(employeePrompt).then(function(data){
        console.log(data.nameManager);
        const manager = new Manager(data.nameManager, data.managerId, data.emailManager, data.officeNumber);
        teamMembers.push(manager);
        emptyId.push(data.managerId);
        console.log(teamMembers);
        console.log(emptyId);
        team();
    });
};

function team() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Which type of member would you like to add?",
            choices: [
            "Engineer",
            "Intern",
            "I don't want to add more team members"
            ]
        }
    ]).then(function(data){
        if (data.memberChoice === "Engineer"){
            console.log("Engineer");
            engineer();
        } else if (data.memberChoice === "Intern"){
            console.log("Intern");
            Intern();
        } else (outputTeam());
    });
};



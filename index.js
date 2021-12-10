const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const emailValidator = require('email-validator')
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'create.html');

const render = require('./lib/render');
const Employee = require('./lib/Employee');

const team = [];
let setTeam = true;

const questions = {
    Manager: [
        {
            type: 'input',
            name: 'name',
            message: "Manager's name?",
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log("Invalid input");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Employee id?",
            validate: idInput => {
                if (idInput) {
                    return true
                } else {
                    console.log("Invalid Input");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Email?",
            validate: emailInput => {
                if (emailValidator.validate(emailInput)) {
                    return true
                } else {
                    console.log("Invalid Input");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the office number?",
            validate: numInput => {
                if (numInput) {
                    return true
                } else {
                    console.log("Invalid Input");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'addNew',
            message: 'Adding another manager?',
            choices: ['yes', 'no']
        }
    ],

    Engineer: [
        {
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?",
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log('Invalid Input');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Engineer's id?",
            validate: idInput => {
                if (idInput) {
                    return true
                } else {
                    console.log("Invalid Input");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Email?",
            validate: emailInput => {
                if (emailValidator.validate(emailInput)) {
                    return true
                } else {
                    console.log("Invalid Input");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's GitHub?",
            validate: githubInput => {
                if (githubInput) {
                    return true
                } else {
                    console.log("Invalid Input");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'addNew',
            message: "Adding a new engineer?",
            choices: ['yes', 'no']
        }
    ],

    Intern: [
        {
            type: 'input',
            name: 'name',
            message: "What is the intern's name?",
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log('Invalid Input');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Intern's id?",
            validate: idInput => {
                if (idInput) {
                    return true
                } else {
                    console.log('Invalid Input');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Email?",
            validate: emailInput => {
                if (emailValidator.validate(emailInput)) {
                    return true
                } else {
                    console.log('Invalid Input');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school is the intern attending?',
            validate: schoolInput => {
                if (schoolInput) {
                    return true
                } else {
                    console.log('Invalid Input');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'addNew',
            message: 'Adding another employee?',
            choices: ['yes', 'no']
        }
    ]
};

const selectEmployeeType = [
    {
        type: 'list',
        name: 'roleType',
        message: 'Please choose the role for the employee',
        choices: ['Manager', 'Engineer', 'Intern'],
    }
];
function addNewEmployee() {
    inquirer.prompt(selectEmployeeType)
        .then(answer => {

            if (answer.roleType === 'Manager') {
                if (setTeam) {
                    inquirer.prompt(questions.Manager)
                        .then(answer => {
                            const manager = new Manager
                                (
                                    answer.name,
                                    answer.id,
                                    answer.email,
                                    answer.officeNumber
                                );

                            team.push(manager);
                            setTeam = false;
                            if (answer.addNew === 'yes') {
                                addNewEmployee();
                            } else {
                                generate();
                            }
                        });
                } else {
                    console.log('Manager already set !')
                    addNewEmployee();
                }


            } else if (answer.roleType === 'Engineer') {
                inquirer.prompt(questions.Engineer)
                    .then(answer => {
                        const engineer = new Engineer
                            (
                                answer.name,
                                answer.id,
                                answer.email,
                                answer.github
                            );
                        team.push(engineer);
                        if (answer.addNew === 'yes') {
                            addNewEmployee();
                        } else {
                            generate();
                        };
                    });

            } else if (answer.roleType === 'Intern') {
                inquirer.prompt(questions.Intern)
                    .then(answer => {
                        const intern = new Intern
                            (
                                answer.name,
                                answer.id,
                                answer.email,
                                answer.school
                            );
                        team.push(intern);
                        if (answer.addNew === 'yes') {
                            addNewEmployee();
                        } else {
                            generate();
                        };
                    });
            };
        });
};

addNewEmployee();

function generate() {
    fs.writeFileSync(distPath, render(team), "utf-8");
    process.exit(0);
}
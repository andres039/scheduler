# Interview Scheduler

Interview Scheduler integrates a few different techniques in the React framework to generate a visually appealing and functional web application that allows the user to book an appointment with an interviewer at a time that is available with the interviewer of choice. Available options for the appointments are updated whenever a user cancels, edits or creates a new appointment; each one of this interactions are persistant thanks to the integration of our back end routes, applying express to node.js and the posgreSQL database. 

My contribution to the project was in the application of React to present the data to the user in the front end. The application has been tested with Cypress and Jest, and these tests are also available in the repository. 

## Screenshots
!["Main"] (https://github.com/andres039/scheduler/blob/main/docs/Main.png)
!["Book appointment"] (https://github.com/andres039/scheduler/blob/main/docs/schedule.png)
## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

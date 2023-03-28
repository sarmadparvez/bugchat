# Schmiede.ONE Bugchat challenge!

Welcome!

This challenge is about an app that replicates one of the most sophisticated debugging methods: [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging).

The app is a chatbot which responds to your messages but lets just say that the bot's level of intelligence isn't really production ready. Your job is to make the bot smarter.

We **DO NOT** expect you to do all the tasks listed here. Just focus on the ones that support your application (as a frontend or backend developer).
Focus on [task 2.1](#Tasks) if you're applying for a front-end position. Focus on [task 2.2](#Tasks) for backend positions.

## Prerequisites:
1. Clone with Git (gets you extra mana) or you can download as zip (boring...)
    > If you prefer working with class based components, check out the branch [`master`](https://github.com/schmiedeone/bugchat)
2. Node v10+

## Tasks

Here's a list of tasks that you can accomplish to make it cooler:

1. Refactor and optimize the code where you see fit.
2. Choose one of the following to focus on:
    1. Have a list of other rubber ducks in a sidebar and have their chat history. (imagine whatsapp web, check attached picture for reference)
   2. Write a REST API (using the technology of your choice) to serve the `dialogueEngine`. Make the bot fetch the answers from the API. Try to make the `dialogueEngine` ["smarter"](#Tips-for-making-it-smarter).
        > An express server is setup inside of the server folder. You can use it if you want to.

Lets go!

![whatsapp screenshot](https://www.chip.de/ii/1/0/9/3/1/0/6/4/6/web_whatsapp-1d0159a68e13bb79.jpg)

## Tips for making it smarter

1. You can employ a public API from a service like Wikipedia or StackOverflow to get answers to questions typed in the chatbox.
2. Come up with an algorithm to interpret text (e.g. keywords) and give relevant answers.

---

**NOTE**

Node version 10 is required to run this app and higher versions might not be able to build the dependencies listed in the package.json.
First try with your version of node (ignore make errors and just try to start the app once installation is done).
In case the app does not run on your version of node, you can [install nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
and add the node version to it.

---

## How to run the frontend

In the project directory, you can run:

```shell
$ yarn start
```

OR

```shell
$ npm start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## How to run the backend

In the project directory, you can run:

```shell
$ yarn dev:api
```

OR

```shell
$ npm dev:api
```

This runs the boilerplate express server we provided.
The server should be available on [http://localhost:8000](http://localhost:8000).

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and the [create-express-app](https://github.com/wesleytodd/create-express-app) repo.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all required packages.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run storybook`

Runs the storybook site.<br />
Open [http://localhost:9009](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. story were written in `src/stories`.

### `npm run extract-locale`

Extract & sort (alphabetically) i18n messages into translation folder.

### `npm run cypress:open`

Run e2e test with GUI

## customize create-react-app webpack config

Edit `config-overrides.js` file
it will merge cra oringal configs.
check original config here [react-scripts webpack config](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts/config)

## customize eslint rules

edit `eslintConfig` property in package.json file.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Skill set

- react (with [create-react-app](https://github.com/facebook/create-react-app))
- redux
- redux-observable/rx.js
- [material-ui](https://material-ui.com/)
- [react-intl](https://github.com/formatjs/react-intl)
- other [modules used by react-scripts](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/package.json)

## Environment

- node.js version: v12.11.1

## Directory structure

```
ui/
├ public/        index.html and other public static assets (e.g. favicon)
├ src/
│ ├ common/      common variables, e.g. appConfig.ts for route path and env variables, storageKey.ts for storage key string..etc
│ ├ translation/ i18n translation files
│ ├ models/      type define of requests and responses
│ ├ components/  global usage components without connecting with store
│ ├ containers/  components connect to store and with child components
│ ├ reducers/    reducer functions, will handle dispatched action
│ ├ epics/       redux-observable epics, mainly with ajax call uilities
│ ├ store/       redux store/middleware configuration
│ ├ stories/     storybook components
│ ├ utils/       ajax request and response subject usage utils
│ ├ types/       global type define (e.g. variables in window object)
│ └ index.tsx
└ .env           common usage system variables for create-react-app
```

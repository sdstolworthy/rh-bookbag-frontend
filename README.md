# Project Bookbag Frontend

This app is written using React with Javascript. The state management strategy is [Provider/Consumer using React Contexts](https://reactjs.org/docs/context.html).

## Structure

The app is organized into several principle sections: Components, Contexts, Routes, Schemas, Serializers, and Services

### Components
Global application components. These should not provide any application or business state. When they are stateful, it should only be presentation state (i.e. animations).

### Contexts
Contexts contain business and application state. They mediate the interactions between the UI and the services. All service calls must be made through a context.

#### Repository Context
The repository context deserves special note. It effectively serves as a dependency injector for services in the application. All other contexts that need to make service calls depend on the repository context, and access the service they require through this context.

### Routes
These are "pages" on the website. Routes are responsible for assembling components into a more meaningful whole. These do not manage application state. Routes consume contexts in order to display information to the user. Routes invoke context methods in order to change the application state.

### Schemas
Schemas define the shape of objects passed in the application. Services return instances of classes defined in schemas.

### Serializers
Serializers simply marshal data from one shape to another. Serializers are mostly used within services to convert an object of one type to another immediately prior to or following a network request.

### Services
Services are responsible for managing interactions with external APIs (local or remote). Individual service files encapsulate the implementation details of the interactions with a specific API.


## React Stuff

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

#### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

#### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

#### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

#### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

#### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

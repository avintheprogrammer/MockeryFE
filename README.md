# Phoenix

In Greek mythology, a phoenix (Ancient Greek: φοῖνιξ phoinix; Latin: phoenix, phœnix, fenix) is a long-lived Web Application that is cyclically regenerated or reborn. Associated with the Sun, a phoenix obtains new life by arising from the bit rot of its predecessor. It is also not built using Elixir.

## Technologies
- Node - Web Server
- Webpack - Build Tool
- React - View Layer
- SASS - Styles Preprocessor
- Universal Redux - Isomorphic State Management
- ESLint/AirBnB - Linting
- Prettier - Automatic code style conformance.

## Getting Started

### Installation
1. Clone the app: `git clone https://github.com/MOCKERY/WEB.Phoenix.git`
2. Install the dependencies: `npm install`

NOTE: `npm install` must be performed whenever packages are added to or removed from `package.json`.  If you `git pull` or `git checkout` a branch that doesn't seem to work, always try `npm install` first.

### Corporate Network

If Phoenix is being run on the corporate network, it will likely be necessary to specify corporate proxy settings when invoking Phoenix.  To do so easily, without changing Node configuration settings, prefix the appropriate `npm` or `node` command with the following statement:

`HTTP_PROXY='http://173.213.212.20:80' HTTPS_PROXY='http://173.213.212.20:80' no_proxy='localhost,127.0.0.0/8'`

For example, to start Phoenix on the corporate network in development mode, issue:

`HTTP_PROXY='http://173.213.212.20:80' HTTPS_PROXY='http://173.213.212.20:80' no_proxy='localhost,127.0.0.0/8' npm start`

### Development
1. Run `$ npm start`
2. Navigate to `http://localhost:3000`

NOTE: You may need to also run development versions of PhoenixQL and PCM, locally, in order for Phoenix to work properly.

### Testing

#### Testing with Jest

##### Executing Jest Tests

To execute the current suite of Jest tests, issue the following command from the project root directory:

`npm test`

If `npm test` isn't working as expected, issue the following command instead:

`node_modules/.bin/jest`

##### Executing Specific Jest Tests

To execute one or more tests that match the specified test file name(s), issue the following command from the project root directory:

`npm test [TEST_FILES_REGEX...]`

For example:

`npm test marketsBanner`

or:

`npm test marketsbanner.test.js header.test.js`

or:

`npm test \.\*Banner`

To limit test execution to a specific folder, specify the full relative path.  For example:

`npm test src/components/Article/Header/__tests__/header.test.js`

##### Executing Specific Jest Tests without Coverage Reporting

To execute one or more tests that match the specified test file name(s), while also skipping the coverage report for faster test execution, issue the following command from the project root directory:

`npm test -- --coveragePathIgnorePatterns '.*' -- [TEST_FILES_REGEX]`

For example:

`npm test -- --coveragePathIgnorePatterns '.*' -- marketsBanner`

##### Updating Snapshots for All Jest Tests

To update the snapshots of all Jest tests, issue the following command from the project root directory:

`npm test -- -u`

*WARNING:* Only update the snapshot of all tests when it makes sense to do so.  The preferred strategy is to update only specific tests whose data or rendering logic has changed.

##### Updating Snapshots for Specific Jest Tests

To update the snapshots of one or more tests that match the specified file name(s), issue the following command from the project root directory:

`npm test -- -u [TEST_FILES_REGEX...]`

For example:

`npm test -- -u marketsBanner`

##### Isolating Environment-Specific Variables from Jest Snapshots

Jest tests that retrieve information from the host environment can result in Jest snapshots capturing environment-specific information, such as dates and times, locale-specific representations of strings, etc., causing future invocations of those tests to fail.

To prevent this, please consult the following best practices for composing Jest tests:

https://nbcnewsdigital.atlassian.net/wiki/spaces/MOCKERYREDESIGN/pages/189038598/Testing+Strategy

### Production
1. Run`$ npm run build && npm run server:prod`
2. Navigate to `http://localhost:3000`

## Docker
* Build: `$ docker build --build-arg "BUILD_ENV=qa" --rm -t MOCKERY/phoenix .`
* Start: `$ docker run -p 3001:3000 -u MOCKERY -e 'NODE_ENV=qa' -d MOCKERY/phoenix`
* Stop: `$ docker stop <CONTAINER ID>`
* Enter: `$ docker exec -it <CONTAINER ID> /bin/bash`
* Logs: `$ docker logs <CONTAINER ID> -f`

## Project Structure
```
|-- phoenix
    |-- env.js
    |-- phoenix.js
    |-- bin
    |   |-- webpack-dev-server.js
    |-- config
    |   |-- webpack-isomorphic-tools.js
    |   |-- webpack.dev.js
    |   |-- webpack.prod.js
    |-- src
    |   |-- apolloClient.js
    |   |-- client.js
    |   |-- provider.js
    |   |-- routes.js
    |   |-- server.js
    |   |-- store.js
    |   |-- assets
    |   |   |-- fonts
    |   |   |-- images
    |   |   |-- stylesheets
    |   |       |-- global
    |   |       |-- utils
    |   |-- components
    |   |-- containers
    |   |-- layouts
    |   |-- reducers
    |   |-- utilities
    |-- static
    |   |-- dist
    |-- stories
```

### bin
The bin folder contains the Webpack Dev Server executable

### config
The `config` folder contains JS configuration files for Webpack.

### src/server.js
Main Node web server responsible for including middleware and initiating redux.

### src/assets
Contains all the front-end assets such as fonts, icons, and stylesheets. All assets are bundled, minified, and kept in the `dist` folder upon building the project.

### src/assets/stylesheets
The `stylesheets` folder is divided up into multiple sub-directories including base, utils, and vendor. Each of these is a classification of the stylesheet type. All files within this directory or sub-directories should be `.scss` files.

### src/components
The `components` folder is the main repository of all the reusable React components that are utilized in the UI layer. The folder structure for a component should follow this structure:
```
├── ComponentName
  ├── index.js
  └── styles.scss
```
Where `index.js` is the component logic code and the `styles.scss` is the component-specific styles. When building components please follow this guide for structure and code style.

### static
Folder containing built code and assets within the sub-directory `dist`. Is ignored by source control. All front-end asset filenames have an added hash.

## Code Styles
With Webpack and React, the Phoenix project is built using ES6, ES7, and ES8 techniques and features. A combination of stateful, connected components and functional "dumb" components are utilized in the React UI layer.

### React Components
When building components the developer should decide if the component will be a **functional component** which only inherits it's data from props, a **stateful component** that uses data from props as well as it's own local state, or a **fully connected component** that utilizes and retrieves state data from a redux store.

### ESLint
ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. MOCKERY/Code and Theory is using AirBnB as a reference.
AirBnB StyleGuide: https://github.com/airbnb/javascript

See the `.eslint.rc` configuration file for details.

### Prettier
Prettier Code Formatter: https://github.com/prettier/prettier
MOCKERY/Code and Theory is using Prettier so that outputted code conform to a consistent style. Configuration is defined in `.prettierrc` file.

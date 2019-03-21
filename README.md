### [Color Scheme](https://color.adobe.com/create/color-wheel/?base=2&rule=Analogous&selected=0&name=My%20Color%20Theme&mode=rgb&rgbvalues=0.7376605804152007,0.31463336475735626,1,0.4347114956992402,0.2816101618322564,0.91,0.3104448648402848,0.3969059218085319,1,0.2370048270046591,0.563989852135519,0.91,0.2751764203359873,0.8886264713676254,1&swatchOrder=0,1,2,3,4)

### [Hosted](https://tapbanking.firebaseapp.com/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## `Available Endpoints`

This API has multiple endpoints

### `/get_access_token`

**Required**

> {"public_token" : "example_public_token"}

### `/transactions`

**Required**

> {"startDate" : "YYYY-MM-DD",
> "endDate" : "YYYY-MM-DD",
> "access_token" : "example_access_token"}

# DMNBot control panel
This is the cloud control panel. The business makes an account and can upload DMN models along with some metadata. The cp will provide the user with code to copy and paste in a website.

# Notes
- /ListModels can be omitted, since backend performs native call to firebase now
- Security is not a priority in this POC, if applied commercially, it should be considered
- uid currently hardcoded in ControlPanel.js because of React States that won't cooperate

# Firebase deploy
When you’re ready, deploy your web app
Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”). Then, run this command from your app’s root directory:

# How to run?
Execute once

"""
yarn install
"""

Run app:

"""
yarn start
"""

## Troubleshooting
- Update Nodejs to latest version
- 'react-scripts not recognized': run yarn add react-scripts and try again

## Not relevant right now (only for production)
### `yarn build`
### `firebase deploy`

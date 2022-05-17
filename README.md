# DMNBot control panel
This is the cloud control panel (CP). The business makes an account and can upload DMN models along with some metadata. The CP will provide the user with code to copy and paste in a website.

# Notes
- /ListModels can be omitted, since backend performs native call to firebase now
- Security is not a priority in this POC, if applied commercially, it should be considered

# How to run?
Execute once
```
yarn install
```

Run app:
```
yarn start
```

## Troubleshooting
- Update Nodejs to latest version
- 'react-scripts not recognized': run yarn add react-scripts and try again

## Not relevant right now (only for production)
### `yarn build`
### `firebase deploy`

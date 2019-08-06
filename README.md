Sample Azure Build/Release Task

Steps to reproduce the error
1. Make sure your current folder is **nodeFile** (all following command should be launched from there)
2. Install node dependencies: ```npm install```
3. Install typescript globally: ```npm i --global typescript```
4. Compile the code: ```tsc```
5. Run the application: ```node index.js```

Note:
The libraries I used (azure-devops-extension-sdk, azure-devops-extension-api) look like the ones that can be used only in browser, but services I use in my nodejs application does not need to rely on browser. I wonder if it's possible to get a workaround.

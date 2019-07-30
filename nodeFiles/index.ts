import tl = require('azure-pipelines-task-lib/task');
import * as SDK from 'azure-devops-extension-sdk';
import {CommonServiceIds, IExtensionDataService} from "azure-devops-extension-api";

async function run() {
    const extensionId = SDK.getExtensionContext().extensionId;
    const accessToken = await SDK.getAccessToken();
    const dataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService);
    const manager = await dataService.getExtensionDataManager(extensionId, accessToken);
    const document = await manager.getDocument('MyCollection', 'MyDocument');
    document.action = 'hello world - pipeline';
    manager.updateDocument('MyCollection', document).then(function (doc) {
        console.log(`Doc version: ${doc.__etag}`);
    });
    tl.setResult(tl.TaskResult.Succeeded, "Build passed successfully");
}

run();

import tl = require('azure-pipelines-task-lib/task');
import * as azdev from "azure-devops-node-api";

async function run() {
    const organizationUrl = tl.getVariable('System.TeamFoundationCollectionUri');
    const token = tl.getVariable('System.AccessToken');
    const azDevConnection = azdev.WebApi.createWithBearerToken(organizationUrl, token);
    
    const eManager = await azDevConnection.getExtensionManagementApi();
    
    // Getting a document from collection
    const document = await eManager.getDocumentByName(
      'StanislavParkhomenko', // is there a way to get a publisher?
      'build-release-task', // is there a way to get an extension id?
      'Default',
      'Current',
      'MyCollection',
      'MyDocument'
    );
    
    // Changing a value in the document
    document.action = 'hello world - pipeline';
    
    // Update a document
    eManager.updateDocumentByName(
      document,
      'StanislavParkhomenko', // is there a way to get a publisher?
      'build-release-task', // is there a way to get an extension id?
      'Default',
      'Current',
      'MyCollection'
    ).then(function (doc) {
        console.log(`Doc version: ${doc.__etag}`);
    });
    
    tl.setResult(tl.TaskResult.Succeeded, "Build passed successfully");
}

run();

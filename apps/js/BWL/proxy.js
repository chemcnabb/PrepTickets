BWL.Services.RootService = {
    GetJavaScriptProxiesAsync: function(successCallback, errorCallback) {
        BWL.InvokeService('GET', 'http://stage.azuretickets.com/root.svc/services.js', null, successCallback, errorCallback);
    },
    GetJavaScriptProxiesMetaAsync: function(successCallback, errorCallback) {
        BWL.InvokeService('GET', 'http://stage.azuretickets.com/root.svc/servicesmeta.js', null, successCallback, errorCallback);
    },
    GetJavaScriptModelAsync: function(successCallback, errorCallback) {
        BWL.InvokeService('GET', 'http://stage.azuretickets.com/root.svc/models.js', null, successCallback, errorCallback);
    },
    GetJavaScriptModelMetaAsync: function(successCallback, errorCallback) {
        BWL.InvokeService('GET', 'http://stage.azuretickets.com/root.svc/modelsmeta.js', null, successCallback, errorCallback);
    },
    GetJavaScriptModelEnumAsync: function(successCallback, errorCallback) {
        BWL.InvokeService('GET', 'http://stage.azuretickets.com/root.svc/modelsenum.js', null, successCallback, errorCallback);
    },
    GetJavaScriptModelEmberAsync: function(successCallback, errorCallback) {
        BWL.InvokeService('GET', 'http://stage.azuretickets.com/root.svc/modelember.js', null, successCallback, errorCallback);
    },
    GetServerVersionAsync: function(successCallback, errorCallback) {
        BWL.InvokeService('GET', 'http://stage.azuretickets.com/root.svc/version', null, successCallback, errorCallback);
    },
    InitializeAsync: function(objInitializePayload, successCallback, errorCallback) {
        var uri = 'http://stage.azuretickets.com/root.svc/initialize'.format(objInitializePayload);
        BWL.InvokeService('POST', uri, objInitializePayload, successCallback, errorCallback);
    },
    InitializeInfoAsync: function(successCallback, errorCallback) {
        BWL.InvokeService('GET', 'http://stage.azuretickets.com/root.svc/initializeinfo', null, successCallback, errorCallback);
    },
    InitializeGEOAsync: function(successCallback, errorCallback) {
        BWL.InvokeService('GET', 'http://stage.azuretickets.com/root.svc/initializegeo', null, successCallback, errorCallback);
    }
}; 
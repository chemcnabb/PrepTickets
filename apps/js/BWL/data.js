//////////////////////////////////////////////////
// Copyright 2013 Black & White Logic Inc.
// All rights reserved
//////////////////////////////////////////////////

BWL.Data = {
    xhdList: new Array(),

    ////////////////////////////////
    // 1. Call BWL services
    ///////////////////////////////

    InvokeService: function (method, url, data, successCallback, errorCallback) {
        method = method.toUpperCase();

        if (errorCallback == undefined) errorCallback = BWL.Data.ServiceFailedCallback;

        // the default config is a simple request
        var requestConfig = {
            url: url,
            method: method
        };

        if (method == "POST" || method == "PUT") {
            var contentType = "";

            // if this is a JS object, convert to JSON, else just pass the data as form data
            if (typeof (data) == 'object') {
                contentType = "application/json";
                data = BWL.Plugins.json2.stringify(data);
            } else {
                contentType = "application/x-www-form-urlencoded";
            }

            // setup for posting data
            requestConfig.headers = { "Content-Type": contentType, "Content-Length": data.length };
            requestConfig.data = data;
        }

        var host = BWL.Common.getHost(url);
        var xhd = this.xhdList[host];

        if (xhd == null) {
            xhd = new BWL.Plugins.easyXDM.Rpc({
                remote: host + "/embed/plugins/easyXDM/cors.html",
            }, {
                remote: {
                    request: {}
                }
            });
            this.xhdList[host] = xhd;
        }

        // send the request
        xhd.request(requestConfig,
            // success
            function (rpcdata) {
                var modelObj = BWL.DataAccess.JSON2Obj(rpcdata.data);

                if (modelObj.Message == 'OK') {
                    // the request worked, return the object
                    if (typeof (successCallback) == "function") {
                        successCallback(BWL.DataAccess.JSON2EmberObj(modelObj.Object), modelObj);
                    }
                } else {
                    // there was a server error, alert the message
                    BWL.Common.Waiting.Stop();
                    if (modelObj.Message.substr(0, modelObj.Message.length) == "Object reference not set to an instance of an object.") {
                        return;
                    }
                    if (typeof (errorCallback) == "function") {
                        errorCallback(DataAccessResources.Text_MsgServerError + modelObj.Message, modelObj);
                    }
                }
            },
            // error
            function (error) {
                BWL.Common.Waiting.Stop();

                if (error.message == DataAccessResources.Text_MsgServiceError_401) {
                    BWL.$.msgBox(DataAccessResources.Text_MsgServiceErrorSupport_401, function () {
                        BWL.Common.eraseCookie(BWL.TokenName);

                        // goto root
                        window.location.href = BWL.Common.getRootURL();
                    });
                }
                else {
                    errorCallback(DataAccessResources.Text_MsgServiceError + error.message);
                }
            }
        );
    },

    ServiceFailedCallback: function (errorMessage) {
        BWL.$.msgBox(errorMessage);
    },

    //////////////////////////////////////////
    // 2. Support Find functionality
    //////////////////////////////////////////

    hashTableKey: new Object(), // store indexes for parent-children keys - used in Internal Searching

    hashTableObj: new Object(), // store indexes for all Objects

    hashTableTxt: new Object(), // store indexes for General Searching in text only

    hashTableDic: new Object(), // store indexes for Advanced Searching in any property of any object

    generalTxtFields: { Name: "Name", Description: "Description" }, // general Text Fields used for General Searching in hashTableTxt

    compOperators: { // comparison operators
        Equal: "==", NotEqual: "!=",
        Less: "<", Greater: ">",
        LessEqual: "<=", GreaterEqual: ">=",
        Having: ".search"   // just used to find a sub-string
    },

    logicOperators: {
        And: "&",
        Or: "||"
    },

    expression: { Field: "", compOperator: "", Value: "", logicOperator: "" },

    // Internal Searching
    // This function finds an Object by key
    FindObject: function (key) {
        try {
            return this.hashTableObj[key];
        }
        catch (ex) {
            this.ServiceFailedCallback(DataAccessResources.Text_MsgFindError + ex);
        }
    },

    // Internal Searching
    // This function finds Parent's Objects by 1 child key
    // Input:   - object's key (required)
    //          - array of including type (optional)
    //          - array of excluding type (optional)
    // Output:  - array of Parent's Objects
    // Restriction: pull out the Store object in the result
    FindParent: function (key, includeType, excludeType) {
        try {
            if (this.hashTableKey[key] == undefined)
                return null;

            var result = new Array();

            var restrictObj = "Store"; // Don't include Store in the result

            if (includeType && excludeType) {
                for (var pos = 0; pos < this.hashTableKey[key].length; pos++) {
                    var obj = this.hashTableObj[this.hashTableKey[key][pos]];

                    if ((includeType.indexOf(obj.Type) > -1) && (excludeType.indexOf(obj.Type) == -1) &&
                        obj.Type != restrictObj) {
                        result.push(obj);
                    }
                }
            }
            else if (includeType) {
                for (var pos = 0; pos < this.hashTableKey[key].length; pos++) {
                    var obj = this.hashTableObj[this.hashTableKey[key][pos]];

                    if ((includeType.indexOf(obj.Type) > -1) && obj.Type != restrictObj) {
                        result.push(obj);
                    }
                }
            }
            else if (excludeType) {
                for (var pos = 0; pos < this.hashTableKey[key].length; pos++) {
                    var obj = this.hashTableObj[this.hashTableKey[key][pos]];

                    if ((excludeType.indexOf(obj.Type) == -1) && obj.Type != restrictObj) {
                        result.push(obj);
                    }
                }
            }
            else {
                for (var pos = 0; pos < this.hashTableKey[key].length; pos++) {
                    var obj = this.hashTableObj[this.hashTableKey[key][pos]];

                    if (obj.Type != restrictObj) {
                        result.push(obj);
                    }
                }
            }

            return result;
        }
        catch (ex) {
            this.ServiceFailedCallback(DataAccessResources.Text_MsgFindError + ex);
        }
    },

    // Internal Searching
    // This function finds Parent's Keys by 1 child key
    // Input:   - object's key (required)
    //          - array of including type (optional)
    //          - array of excluding type (optional)
    // Output:  - array of Parent's Keys
    // Restriction: pull out the Store object in the result
    FindParentKey: function (key, includeType, excludeType) {
        try {
            if (this.hashTableKey[key] == undefined)
                return null;

            var result = new Array();

            var restrictObj = "Store"; // Don't include Store in the result

            if (includeType && excludeType) {
                for (var pos = 0; pos < this.hashTableKey[key].length; pos++) {
                    var obj = this.hashTableObj[this.hashTableKey[key][pos]];

                    if ((includeType.indexOf(obj.Type) > -1) && (excludeType.indexOf(obj.Type) == -1) &&
                        obj.Type != restrictObj) {
                        result.push(obj.Key);
                    }
                }
            }
            else if (includeType) {
                for (var pos = 0; pos < this.hashTableKey[key].length; pos++) {
                    var obj = this.hashTableObj[this.hashTableKey[key][pos]];

                    if ((includeType.indexOf(obj.Type) > -1) && obj.Type != restrictObj) {
                        result.push(obj.Key);
                    }
                }
            }
            else if (excludeType) {
                for (var pos = 0; pos < this.hashTableKey[key].length; pos++) {
                    var obj = this.hashTableObj[this.hashTableKey[key][pos]];

                    if ((excludeType.indexOf(obj.Type) == -1) && obj.Type != restrictObj) {
                        result.push(obj.Key);
                    }
                }
            }
            else {
                for (var pos = 0; pos < this.hashTableKey[key].length; pos++) {
                    var obj = this.hashTableObj[this.hashTableKey[key][pos]];

                    if (obj.Type != restrictObj) {
                        result.push(obj.Key);
                    }
                }
            }

            return result;
        }
        catch (ex) {
            this.ServiceFailedCallback(DataAccessResources.Text_MsgFindError + ex);
        }
    },

    // General Searching by text only
    // we can modify how many text fields will include to find in "generalTxtFields"
    // Input:   - a text want to find (required)
    //          - a set of types want to find in (optional), i.e. {typeA:"typeA", typeB:"typeB"}
    // Output:  - array of Objects
    FindObjectByText: function (txt, typeSet) {
        try {
            var result = new Array();

            var restrictObj = "Store"; // Don't include Store in the result

            var arrTxt = txt.split(" ");

            for (var i = 0; i < arrTxt.length; i++) {
                var arrKey = new Array();

                if (typeSet == undefined) {
                    for (var pos = 0; pos < this.hashTableTxt[arrTxt[i]].length; pos++) {
                        var obj = this.hashTableTxt[arrTxt[i]][pos];

                        if (this.hashTableObj[obj].Type != restrictObj)
                            arrKey.push(obj);
                    }
                }
                else {
                    for (var pos = 0; pos < this.hashTableTxt[arrTxt[i]].length; pos++) {
                        if (this.hashTableObj[this.hashTableTxt[arrTxt[i]][pos]].Type in typeSet)
                            arrKey.push(this.hashTableTxt[arrTxt[i]][pos]);
                    }
                }

                result = result.concat(arrKey).unique();
            }

            for (var i = 0; i < result.length; i++) {
                result[i] = this.hashTableObj[result[i]];
            }

            return result;
        }
        catch (ex) {
            this.ServiceFailedCallback(DataAccessResources.Text_MsgFindError + ex);
        }
    },

    // General Searching by text only
    // we can modify how many text fields will include to find in "generalTxtFields"
    // Input:   - a text want to find (required)
    //          - a set of types want to find in (optional), i.e. {typeA:"typeA", typeB:"typeB"}
    // Output:  - array of Objects
    FindObjectByTextWithKey: function (txt, arrKey) {
        try {
            var parentKey = new Array();

            for (var i = 0; i < arrKey.length; i++) {
                var obj = this.FindParentKey(arrKey[i]);

                parentKey = parentKey.concat(obj).unique();
            }

            var result = new Array();

            // remove the noise character, i.e.: " cd hot   " =>  ["cd", "hot"]
            var arrTxt = BWL.$.map(txt.toLowerCase().split(" "), function (e, i) { return BWL.$.trim(e) });

            var restrictObj = "Store"; // Don't include Store in the result

            for (var i = 0; i < arrTxt.length; i++) {
                var arrKey_ = new Array();

                for (var item in this.hashTableTxt) {
                    if (arrTxt[i] == '') continue;

                    if (item.indexOf(arrTxt[i]) != -1) { // found txt in the dictionary
                        for (var pos = 0; pos < this.hashTableTxt[item].length; pos++) {
                            var obj = this.hashTableTxt[item][pos];

                            if (this.hashTableObj[obj].Type != restrictObj)
                                arrKey_.push(obj);
                        }

                        result = result.concat(arrKey_).unique();
                    }
                }
            }

            result = result.intersect(parentKey);

            for (var i = 0; i < result.length; i++) {
                result[i] = this.hashTableObj[result[i]];
            }

            return result;
        }
        catch (ex) {
            this.ServiceFailedCallback(DataAccessResources.Text_MsgFindError + ex);
        }
    },

    // Advanced Searching by expression
    //
    // Input: exp is an object to define comparison expression
    //          have to put params into expression 3 ones for every single adding time {"field", <compOperators>, "comparison value"}
    //
    // Example how to create exp:  field1 >= value1 and field2 <= value2
    //          var exps = new Object();
    //          var exp = new Array();
    //          exp.Field = field1;  exp.compOperator = BWL.Data.compOperators.GreaterEqual;  exp.Value = value1;
    //          exps.push(exp);
    //          exp = new Array();
    //          exp.Field = field2;  exp.compOperator = BWL.Data.compOperators.LessEqual;  exp.Value = value2;
    //          exps.push(exp);
    //
    FindObjectByExp: function (exps) {
        try {
            var result = new Array();
            var fields, exp;

            for (var pos = 0; pos < exps.length; pos += 2) {
                fields = this.hashTableDic[exps[pos].Field];
                var arrKey = new Array();
                var found = false;

                for (var val in fields) {
                    if (exps[pos].compOperator == this.compOperators.Having) { // find a sub-string
                        exp = "'" + val.toString() + "'" + exps[pos].compOperator + "(" + exps[pos].Value.toString() + ")";

                        found = eval(exp) >= 0 ? true : false;
                    }
                    else {
                        if (exps[pos].Value.toString().substr(0, 1) == "'") // is String type
                            exp = "'" + val.toString() + "'" + exps[pos].compOperator + exps[pos].Value.toString(); // string:  field + operator + compare value
                        else
                            exp = val.toString() + exps[pos].compOperator + exps[pos].Value.toString(); // string:  field + operator + compare value

                        found = eval(exp);
                    }

                    if (found) {
                        arrKey = arrKey.concat(fields[val]);
                    }
                }

                if (result.length == 0) {
                    result = arrKey;
                }
                else {
                    if (exps[pos - 1] != undefined) { // logical Operator
                        switch (exps[pos - 1]) {
                            case this.logicOperators.And:           // And
                                result = result.intersect(arrKey);
                                break;
                            case this.logicOperators.Or:            // Or
                                result = result.concat(arrKey).unique();
                                break;
                        }
                    }
                }
            }

            for (var i = 0; i < result.length; i++) {
                result[i] = this.hashTableObj[result[i]];
            }

            return result;
        }
        catch (ex) {
            this.ServiceFailedCallback(DataAccessResources.Text_MsgFindError + ex);
        }
    },

    //////////////////////////////////////////
    // 3. Support Cache reading
    //////////////////////////////////////////

    timer: 0,
    InitTimer: function () {
        // maximum signed integer on 32 bit systems is 2147483647
        // Timer interval for 1 second then it takes 68 years to stack-overflow BWL.Data.timer!
        // so it's no need to check the timer's limit here
        setInterval(function () { BWL.Data.timer++; }, 1000); // 1000 milisecond = 1 second
    },

    // Support Cache Reading for Model
    // Input: isForce (boolean) means force to Call Service directly and Do not use Cache
    Read: function (storeKey, type, key, levels, successCallback, errorCallback, isForce) {
        if (isForce == undefined || isForce == false) {
            if (this.hashTableObj[key] != undefined) {
                var t = this.timer - this.hashTableObj[key].__timer;

                if (t < this.hashTableObj[key].__cache) { // not timeout
                    successCallback(this.hashTableObj[key]);
                    return;
                }
            }
        }

        BWL.Services.ModelService.ReadAsync(storeKey, type, key, levels, function (data) {
            BWL.Data.hashTableObj[key] = data;
            successCallback(data);
        }, errorCallback);
    },

    //////////////////////////////////////////
    // 4. Support Sorting functionality
    //////////////////////////////////////////
    sortType: {
        ASC: 1,
        DESC: -1,
    },

    // QuickSort function: quickly sort by any field with parse value function
    // Input:
    //      - field: field to sort
    //      - type: BWL.Data.sortType
    //      - primer: function to parse value in sorting
    // Output:
    //      object after sorting
    // Sample:
    //      // Sort by price Desc
    //      lst.sort(BWL.Data.QuickSort('price', BWL.Data.sortType.ASC, parseInt));
    //
    //      // Sort by city, case-insensitive, A-Z
    //      lst.sort(BWL.Data.QuickSort('city', BWL.Data.sortType.DESC, function(a){return a.toUpperCase()}));
    //
    QuickSort: function (field, type, primer) {
        var key = function (x) { return primer ? primer(x[field]) : x[field] };

        return function (a, b) {
            var A = key(a), B = key(b);
            return BWL.Data.CompareToSort(A, B, type);
        }
    },

    CompareToSort: function (first, second, type) {
        return (first == second) ? 0 : ((first < second) ? (-1 * type) : (1 * type));
    },

    // Sort function: sort some special field in an object such as "DisplayOrder", "Price", "OnSaleDateTimeStart"
    // Input:
    //      obj has attributes:
    //      - field: field to sort
    //      - type: BWL.sortType.ASC / DESC
    // Output:
    //      object after sorting
    // Sample:
    //      lst.sort(BWL.Data.Sort({ field: "Price", type: BWL.Data.sortType.DESC }));
    //
    Sort: function (obj) {
        return function (a, b) {
            var a_compare = null;
            var b_compare = null;
            switch (obj.field) {
                case "totalAvailableItems":
                    a_compare = (("totalAvailableItems" in a.event) == true) ? a.event.totalAvailableItems : 0;
                    b_compare = (("totalAvailableItems" in b.event) == true) ? b.event.totalAvailableItems : 0;
                    break;
                case "property_startDateNotFormat":
                    var aItemObj = null;
                    var bItemObj = null;

                    var aOnSaleDateTimeStart_temp = a.get("startDateNotFormat");
                    var bOnSaleDateTimeStart_temp = b.get("startDateNotFormat");

                    a_compare = Date.parse(aOnSaleDateTimeStart_temp);
                    b_compare = Date.parse(bOnSaleDateTimeStart_temp);

                    break;
                case "property_endDateNotFormat":
                    var aItemObj = null;
                    var bItemObj = null;

                    var aOnSaleDateTimeStart_temp = a.get("endDateNotFormat");
                    var bOnSaleDateTimeStart_temp = b.get("endDateNotFormat");

                    a_compare = Date.parse(aOnSaleDateTimeStart_temp);
                    b_compare = Date.parse(bOnSaleDateTimeStart_temp);
                    break;

                case "property_getName":
                    a_compare = a.get("getName").toLowerCase();
                    b_compare = b.get("getName").toLowerCase();
                    break;
                case "property_ticketGetName":
                    a_compare = a.get("ticketGetName").toLowerCase();
                    b_compare = b.get("ticketGetName").toLowerCase();
                    break;
                case "property_Name":
                    a_compare = a.get("Name").toLowerCase();
                    b_compare = b.get("Name").toLowerCase();
                    break;
                case "property_getAddressVenue":
                    a_compare = a.get("getAddressVenue").toLowerCase();
                    b_compare = b.get("getAddressVenue").toLowerCase();
                    break;
                case "property_fullNameAddress":
                    a_compare = a.getPath("Address.road").toLowerCase();
                    b_compare = b.getPath("Address.road").toLowerCase();
                    break;

                case "PriceSub":
                    a_compare = a.get("PriceSub");
                    b_compare = b.get("PriceSub");
                    break;

                case "dateOrder":
                    var aItemObj = null;
                    var bItemObj = null;

                    var aOnSaleDateTimeStart_temp = a.orderDateNotFormat;
                    var bOnSaleDateTimeStart_temp = b.orderDateNotFormat;

                    a_compare = Date.parse(aOnSaleDateTimeStart_temp);
                    b_compare = Date.parse(bOnSaleDateTimeStart_temp);
                    break;

                case "Price":
                    var aItemObj = null;
                    var bItemObj = null;

                    //This i get the item Object
                    //If i can't find Items property i will get the Product(item) object to get price
                    //If i can find Items property i will get the first display order(That also the item object)
                    aItemObj = (a.Items != null ? a.Items.objectAt(0) : a);
                    bItemObj = (b.Items != null ? b.Items.objectAt(0) : b);

                    if (aItemObj.SalePrice != null) {
                        a_compare = aItemObj.SalePrice.ItemPrice;
                    }
                    else {
                        a_compare = aItemObj.Price.ItemPrice;
                    }

                    if (bItemObj.SalePrice != null) {
                        b_compare = bItemObj.SalePrice.ItemPrice;
                    }
                    else {
                        b_compare = bItemObj.Price.ItemPrice;
                    }

                    break;
                case "OnSaleDateTimeStart":
                    // convert to Datetime to compare.
                    var aItemObj = null;
                    var bItemObj = null;

                    //This i get the item Object
                    //If i can't find Items property i will get the Product(item) object to get price
                    //If i can find Items property i will get the first display order(That also the item object)
                    aItemObj = (a.Items != null ? a.Items.objectAt(0) : a);
                    bItemObj = (b.Items != null ? b.Items.objectAt(0) : b);

                    var aOnSaleDateTimeStart_temp = aItemObj.OnSaleDateTimeStart;
                    var bOnSaleDateTimeStart_temp = bItemObj.OnSaleDateTimeStart;

                    a_compare = Date.parse(aOnSaleDateTimeStart_temp);
                    b_compare = Date.parse(bOnSaleDateTimeStart_temp);
                    break;
                case "RankingScore":
                    // convert to Datetime to compare.
                    var aItemObj = null;
                    var bItemObj = null;

                    //This i get the item Object
                    //If i can't find Items property i will get the Product(item) object to get price
                    //If i can find Items property i will get the first display order(That also the item object)
                    aItemObj = (a.Items != null ? a.Items.objectAt(0) : a);
                    bItemObj = (b.Items != null ? b.Items.objectAt(0) : b);

                    a_compare = aItemObj.RankingScore;
                    b_compare = bItemObj.RankingScore;

                    break;
                case "property_PlacedDate":
                    var aPlacedDateTimeStart_temp = a.get('Placed');
                    var bPlacedDateTimeStart_temp = b.get('Placed');

                    a_compare = Date.parse(aPlacedDateTimeStart_temp);
                    b_compare = Date.parse(bPlacedDateTimeStart_temp);

                    break;
                case "property_TotalPrice":
                    a_compare = a.get('Total').ItemPrice;
                    b_compare = b.get('Total').ItemPrice;

                    break;
                case "property_OrderState":
                    a_compare = a.get("OrderState").toLowerCase();
                    b_compare = b.get("OrderState").toLowerCase();

                    break;
                default:
                    a_compare = a[obj.field];
                    b_compare = b[obj.field];

                    break;
            }

            return (BWL.Data.CompareToSort(a_compare, b_compare, obj.type));
        };
    },
};
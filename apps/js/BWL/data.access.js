//////////////////////////////////////////////////
// Copyright 2013 Black & White Logic Inc.
// All rights reserved
//////////////////////////////////////////////////

BWL.DataAccess = {
    parentKey: null,    // store temporary parent key for WalkObjectEmber function

    // Have to walk Object to parse a DOM object to Ember object
    // This function is recursive version
    WalkObjectEmber: function (baseObj) {
        try {
            if (baseObj != undefined && baseObj != null) {
                if (BWL.$.isArray(baseObj)) {
                    for (var pos in baseObj) {
                        baseObj[pos] = this.WalkObjectEmber(baseObj[pos]);
                    }
                }

                if (baseObj.Type != undefined) {
                    var type = baseObj.Type;

                    var metaModel = eval('BWL.ModelMeta.' + type);
                    if ((metaModel == undefined) || (metaModel == null)) {
                        return baseObj;
                    }

                    // create an empty Ember model
                    var realObj = Ember.Object.create({});

                    // Add fields from  MetaModel to empty Ember model
                    for (var propMeta in metaModel) {
                        // ignore any property that starts with __
                        // except '__cache'

                        if (propMeta.substr(0, 2) == '__') {
                            if (propMeta == '__cache') {
                                var __cache = eval('BWL.ModelMeta.' + type + '.' + propMeta);

                                eval("var tempObj = { " +
                                    propMeta + " : " + __cache.toString() + ", " +
                                    " __timer : " + BWL.Data.timer.toString() + " };");

                                realObj.reopen(tempObj);
                            }

                            // __perms
                        }
                        else {
                            var dataType = eval('BWL.ModelMeta.' + type + '.' + propMeta);

                            // Set default value for properties String, Int, Boolean......
                            // Boolean : false
                            // Int32, Int64, Double, ... numbers : 0
                            var defaultValue = 'null';

                            switch (dataType) {
                                case 'Boolean':
                                    defaultValue = 'false';
                                    break;
                                case 'String':
                                    defaultValue = "''";
                                    break;
                                case 'Double':
                                case 'Int32':
                                case 'Int64':
                                    defaultValue = '0';
                                    break;
                            }

                            eval("var tmpObj ={ " + propMeta + " : " + defaultValue + " };");
                            realObj.reopen(tmpObj);
                        }
                    }

                    // Save pair of {Key, Value}
                    if ((baseObj != undefined) && (baseObj != null)) {
                        if (baseObj.hasOwnProperty("Key")) {
                            if (BWL.Data.hashTableObj[baseObj.Key] == undefined) {
                                BWL.Data.hashTableObj[baseObj.Key] = realObj;
                            }
                        }
                    }

                    // cycle through the properties of baseObj
                    for (var prop in baseObj) {
                        if ((baseObj[prop] != undefined) && (baseObj[prop] != null)) {
                            if (typeof baseObj[prop] == "function") {
                                continue;
                            }

                            var propMeta = eval('BWL.ModelMeta.' + type + '.' + prop);

                            if (propMeta != undefined) {
                                if (typeof baseObj[prop] == 'object') {
                                    // if this is a list
                                    if (propMeta == 'List`1') {
                                        // cycle thru the list

                                        realObj[prop] = new Array();

                                        for (var pos in baseObj[prop]) {
                                            realObj[prop][pos] = this.WalkObjectEmber(baseObj[prop][pos]);
                                        }
                                    }
                                    else {
                                        // single object

                                        // Save pair of {child's Key, parent's Key}
                                        if (baseObj.Key != undefined) {
                                            if (baseObj[prop].Key != undefined) {
                                                if (BWL.Data.hashTableKey[baseObj[prop].Key] == undefined) {
                                                    BWL.Data.hashTableKey[baseObj[prop].Key] = new Array();
                                                }

                                                if (BWL.Data.hashTableKey[baseObj[prop].Key].indexOf(baseObj.Key) == -1)
                                                    BWL.Data.hashTableKey[baseObj[prop].Key].push(baseObj.Key);
                                            }
                                            else {
                                                if (BWL.$.isArray(baseObj[prop])) {
                                                    for (var i = 0; i < baseObj[prop].length; i++) {
                                                        if (BWL.Data.hashTableKey[(baseObj[prop])[i].Key] == undefined) {
                                                            BWL.Data.hashTableKey[(baseObj[prop])[i].Key] = new Array();
                                                        }

                                                        if (BWL.Data.hashTableKey[(baseObj[prop][i]).Key].indexOf(baseObj.Key) == -1)
                                                            BWL.Data.hashTableKey[(baseObj[prop][i]).Key].push(baseObj.Key);
                                                    }
                                                }
                                            }
                                        }

                                        this.parentKey = baseObj.Key;

                                        realObj[prop] = this.WalkObjectEmber(baseObj[prop]);
                                    }
                                }
                                else {
                                    realObj.set(prop, baseObj[prop]);

                                    this.HashTableDictionary(prop, baseObj[prop], (baseObj.Key != undefined) ? baseObj.Key : this.parentKey);

                                    this.HashTableText(prop, baseObj[prop], (baseObj.Key != undefined) ? baseObj.Key : this.parentKey);
                                }
                            }
                        }
                    }
                    return realObj;
                }
            }
            return baseObj;
        }
        catch (ex) {
            BWL.Data.ServiceFailedCallback(DataAccessResources.Text_MsgWalkObjectError + ex);
        }
    },

    // Create an Ember object and Set all properties of an object into it
    CreateEmberObj: function (properties) {
        var baseObjEmber = Ember.Object.create();

        for (var prop in properties) {
            baseObjEmber.set(prop, properties[prop]);
        }

        return baseObjEmber;
    },

    // Have to walk Object to parse a DOM object to Ember object
    // This function is non-recursive version
    WalkObject: function (baseObj) {
        if (BWL.Common.isNullOrUndefined(baseObj))
            return baseObj;

        try {
            var stack = new Array();
            stack.push(baseObj);

            do {
                var obj = stack.pop();

                if (obj == undefined)
                    break;

                if (BWL.$.isArray(obj)) {
                    for (var pos in obj) {
                        if (typeof obj[pos] == 'object') {
                            obj[pos] = this.CreateEmberObj(obj[pos]);

                            stack.push(obj[pos]);
                        }
                    }

                    continue;
                }

                if (obj.Type != undefined) {
                    var type = obj.Type;

                    var metaModel = eval('BWL.ModelMeta.' + type);
                    if (BWL.Common.isNullOrUndefined(metaModel)) {
                        continue;
                    }

                    for (var propMeta in metaModel) {
                        if (propMeta.substr(0, 2) == '__') {
                            if (propMeta == '__cache') {
                                var __cache = eval('BWL.ModelMeta.' + type + '.' + propMeta);

                                obj['__cache'] = __cache;
                                obj['__timer'] = BWL.Data.timer;
                            }
                        }
                    }

                    // Save pair of {Key, Value}
                    if (obj.hasOwnProperty("Key")) {
                        if (BWL.Data.hashTableObj[obj.Key] == undefined) {
                            BWL.Data.hashTableObj[obj.Key] = obj;
                        }
                    }

                    for (var prop in obj) {
                        if (!BWL.Common.isNullOrUndefined(obj[prop])) {
                            if (typeof obj[prop] == 'object') {
                                // Save pair of {child's Key, parent's Key}
                                if (obj.Key != undefined) {
                                    if (obj[prop].Key != undefined) {
                                        obj[prop] = this.CreateEmberObj(obj[prop]);

                                        if (BWL.Data.hashTableKey[obj[prop].Key] == undefined) {
                                            BWL.Data.hashTableKey[obj[prop].Key] = new Array();
                                        }

                                        if (BWL.Data.hashTableKey[obj[prop].Key].indexOf(obj.Key) == -1)
                                            BWL.Data.hashTableKey[obj[prop].Key].push(obj.Key);
                                    }
                                    else {
                                        if (BWL.$.isArray(obj[prop])) {
                                            for (var i = 0; i < obj[prop].length; i++) {
                                                if (BWL.Data.hashTableKey[(obj[prop])[i].Key] == undefined) {
                                                    BWL.Data.hashTableKey[(obj[prop])[i].Key] = new Array();
                                                }

                                                if (BWL.Data.hashTableKey[(obj[prop][i]).Key].indexOf(obj.Key) == -1)
                                                    BWL.Data.hashTableKey[(obj[prop][i]).Key].push(obj.Key);
                                            }
                                        }
                                        else {
                                            obj[prop] = this.CreateEmberObj(obj[prop]);
                                        }
                                    }

                                    this.parentKey = obj.Key;
                                }

                                stack.push(obj[prop]);
                            }
                            else if (typeof obj[prop] != "function") {
                                this.HashTableDictionary(prop, obj[prop], (obj.Key != undefined) ? obj.Key : this.parentKey);

                                this.HashTableText(prop, obj[prop], (obj.Key != undefined) ? obj.Key : this.parentKey);
                            }
                        }
                    }
                }
            } while (true);

            return baseObj;
        }
        catch (ex) {
            BWL.Data.ServiceFailedCallback(DataAccessResources.Text_MsgWalkObjectError + ex);
        }
    },

    // Function to parse JSON to Ember Object
    JSON2EmberObj: function (data) {
        var baseObjEmber = BWL.Plugins.json2.parse(data);

        if (baseObjEmber.Type)
            baseObjEmber = this.CreateEmberObj(baseObjEmber);

        baseObjEmber = this.WalkObject(baseObjEmber);

        return baseObjEmber;
    },

    // Function to parse JSON to DOM Object
    JSON2Obj: function (JSON) {
        return BWL.Plugins.json2.parse(JSON);
    },

    // Function to parse DOM Object to JSON
    Obj2JSON: function (obj) {
        return BWL.Plugins.json2.stringify(obj);
    },

    // Function to Create a Dictionary to
    // stores indexes for Advanced Searching in any property of any object
    HashTableDictionary: function (field, value, key) {
        if (field == "Key") return;

        if (BWL.Data.hashTableDic[field] == undefined)
            BWL.Data.hashTableDic[field] = new Object();

        if (BWL.Data.hashTableDic[field][value] == undefined)
            BWL.Data.hashTableDic[field][value] = new Array();

        if ((BWL.Data.hashTableDic[field][value]).indexOf(key) == -1)
            BWL.Data.hashTableDic[field][value].push(key);
    },

    // Function to Create a Hash Table to
    // stores indexes for General Searching in text only
    HashTableText: function (field, value, key) {
        // In General Searching, we just
        // stores indexes for text fields which defined on BWL.Data.generalTxtFields
        if (field in BWL.Data.generalTxtFields) {
            var arr = value.toLowerCase().split(" ");

            for (var pos = 0; pos < arr.length; pos++) {
                if (BWL.Data.hashTableTxt[arr[pos]] == undefined)
                    BWL.Data.hashTableTxt[arr[pos]] = new Array();

                if ((BWL.Data.hashTableTxt[arr[pos]]).indexOf(key) == -1)
                    BWL.Data.hashTableTxt[arr[pos]].push(key);
            }
        }
    },

    // For Testing: use to calculate run-time
    CalculateTime: function () {
        var d = new Date();
    }
};
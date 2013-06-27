//////////////////////////////////////////////////
// Copyright 2013 Black & White Logic Inc.
// All rights reserved
//////////////////////////////////////////////////
BWL.Common = {
    _loadedFiles: [],
    _loadedCollection: [],
    FORMAT_DATETIME: "mmm d, yyyy h:MMTT",
    FORMAT_DATE: "mmm d, yyyy",
    FORMAT_TIME: "h:MMTT",
    dateTimeFormatServer: "yyyy-mm-dd'T'HH:MM:ss",

    splitDateTime: function (newDate) {
        var delimiter = newDate.indexOf("M"), time = newDate.substring(0, delimiter + 1), date = newDate.substring(delimiter + 2);
        return date + "<br/>" + time;
    },

    //permision definition
    PERMS: {
        ADMIN: 20,
        CONSUMER: 10
    },

    //Note
    //Format time of Server : 2013-03-01T00:00:00.000Z
    //                        yyyy-mm-ddThh:mm:ss
    //Or this format        : 2011-01-28T19:30:00-05:00
    //                        yyyy-mm-ddThh:mm:ss-> we will ignore -05:00 following the converstaion of Toan and Jerek

    //output to show combobox will be string , and it's format is 7:00AM Mar 1, 2013
    //                                                            h:mm(AM/PM) m d yyyy
    // if (0 <= hour <= 11) AM
    // esle PM
    //so this format i don't care second.
    parseStringToDateTime: function (value, isTimeIncluded) {
        var self = this;
        //var x = "2011-01-28T19:30:00-05:00";
        //x = self.getPath("event.StartTime");

        x = value;

        if ((x != "") || (x != null)) {
            MM = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var year = "";
            var month = "";
            var day = "";

            var hour = "";
            var min = "";

            var amOrpm = "";

            var result = "";

            if (x != "") {
                var lstTime = x.split('T');
                if (BWL.$.isArray(lstTime)) {
                    var lst1 = [];
                    var lst2 = [];

                    var time1 = lstTime[0];
                    var time2 = lstTime[1];

                    //Get Year Month Day
                    lst1 = time1.split('-');
                    year = lst1[0];
                    month = lst1[1];
                    day = lst1[2];

                    //Get Hour Min and define AM or PM
                    lst2 = lstTime[1].split(':');
                    hour = lst2[0];
                    min = lst2[1];
                    var definedInfo = parseInt(hour, 10);

                    if ((definedInfo >= 0) && (definedInfo <= 11)) {
                        if (definedInfo == 0) {
                            hour = 12;
                        }
                        amOrpm = "AM";
                    }
                    else {
                        amOrpm = "PM";
                        hour = hour - 12;
                    }
                    if (isTimeIncluded == false) {
                        result = month + "/" + day + "/" + year;
                    }
                    else {
                        result = month + "/" + day + "/" + year + " " + hour + ":" + min + " " + amOrpm;
                    }
                }
            }
        }
        return result;
    },

    loadScript: function (sScriptSrc, callbackfunction) {
        //gets document head element
        var oHead = document.getElementsByTagName('head')[0];

        if (oHead) {
            //creates a new script tag
            var oScript = document.createElement('script');

            //adds src and type attribute to script tag
            oScript.setAttribute('src', sScriptSrc);
            oScript.setAttribute('type', 'text/javascript');

            //calling a function after the js is loaded (IE)
            var loadFunction = function () {
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    callbackfunction();
                }
            };
            oScript.onreadystatechange = loadFunction;

            //calling a function after the js is loaded (Firefox)
            oScript.onload = callbackfunction;

            //append the script tag to document head element
            oHead.appendChild(oScript);
        }
    },

    //model List of data in the grid.
    //scrollbar : #scrollbar1
    //name : #scrollbar1 .viewport
    //defaultHeight :
    //defaultWidth :
    //heightSink :
    //widthExpand :
    scrollBox: function (model, scrollbar, name, defaultHeight, defaultWidth, heightSink, widthExpand) {
        try {
            BWL.$(name).css('height', defaultHeight);
            BWL.$(name).css('width', defaultWidth);

            BWL.$(scrollbar).tinyscrollbar();

            if (model.length == 1) {
                BWL.$(name).css('height', heightSink);
                BWL.$(name).css('width', widthExpand);
            }

            if (model.length == 2) {
                BWL.$(name).css('width', widthExpand);
            }
        }
        catch (error) {
        }
    },

    getCachedScript: function (url, callback) {
        //http://api.jquery.com/jQuery.getScript/
        // allow user to set any option except for dataType, cache, and url
        var options = {
            dataType: "script",
            cache: true,
            url: url,
            success: callback
        };

        // Use $.ajax() since it is more flexible than $.getScript
        // Return the jqXHR object so we can chain callbacks
        return BWL.$.ajax(options);
    },
    getHost: function (url) {
        var a = document.createElement("a");
        a.href = url;

        if (a.port != "0" && a.port != "80" && a.port != "443") {
            return a.protocol + "//" + a.hostname + ":" + a.port;
        }
        else {
            return a.protocol + "//" + a.hostname;
        }
    },
    insertScriptOnce: function (url, callback) {
        if (this._loadedCollection[url] == undefined) {
            this._loadedCollection[url] = callback;

            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');

            script.setAttribute('src', url);

            script.onreadystatechange = function () {
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    if (BWL.Common._loadedCollection[url] != true) {
                        callback = BWL.Common._loadedCollection[url];
                        BWL.Common._loadedCollection[url] = true;
                        if (callback != undefined && callback != null) {
                            callback();
                        }
                    }
                }
            };

            script.onload = function () {
                if (BWL.Common._loadedCollection[url] != true) {
                    callback = BWL.Common._loadedCollection[url];
                    BWL.Common._loadedCollection[url] = true;
                    if (callback != undefined && callback != null) {
                        callback();
                    }
                }
            };

            head.appendChild(script);
        }
        else {
            // this file has been loaded already, just run the callback
            if (callback != undefined && callback != null) {
                callback();
                callback = null;
            }
        }
    },
    insertContentOnce: function (url, callback, errorCallback) {
        // change to not use a container
        if (this._loadedFiles[url] == undefined) {
            // this needs to be loaded, use the
            BWL.$.get(url, function (response, status, xhr) {
                if (status == "error" && errorCallback != undefined) {
                    errorCallback();
                } else {
                    BWL.Common._loadedFiles[url] = response;
                    // just run the callback
                    if (callback != undefined && callback != null) {
                        callback(response);
                        callback = null;
                    }
                }
            });
        } else {
            // this file has been loaded already
            // load the content to the container

            // just run the callback
            if (callback != undefined && callback != null) {
                callback(this._loadedFiles[url]);
                callback = null;
            }
        }
    },

    createCookie: function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        var cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
        document.cookie = cookie;
    },

    extendCookie: function (name, value, minutes) {
        if (minutes) {
            var date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        var cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
        document.cookie = cookie;
    },

    readCookie: function (name) {
        var nameEQ = escape(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                var value = unescape(c.substring(nameEQ.length, c.length));
                if (value == 'null')
                    value = null;
                return value;
            }
        }
        return null;
    },

    eraseCookie: function (name) {
        this.createCookie(escape(name), "", -1);
    },

    loadHandlebarsTemplate: function (templateName, callback) {
        // first, look in the DOM for the template, using the format BWL_ + templateName to find

        //sangcu@20120821 Because when template was loaded and set into Ember.TEMPLATES in Ember framework for entire of application. So,
        //I don't load again and also don't need add template to DOM because it's actually storage in Ember.TEMPLATES

        // jason@20120821 , I think you are misunderstanding me.  The original location of the template can exist in 3 different places
        // 1) in the current DOM object as a script element
        // 2) on the local webserver
        // 3) on the remote webserver
        // so far you have done #2 and #3.  What you are describing in your reply is once you have a template loaded, there is no reason
        // to reload it, this is correct, however the point here is this is about loading the template for the first time.
        // I will replace the test sample to index.html and please do not delete it this time, this is a test for #1 on the list

        //sangcu@20120821 implement #1 for check script in DOM

        //If we append templates into DOM, When init Ember view
        //Ember will read template from DOM if exist and compile this template and put into Ember.TEMPLATES then it also remove template from DOM.
        //So, if we are using BWL.$('BWL_' + templateName).html() it's always return null because this template removed from DOM by Ember.
        //reference to Ember source code at function Ember.Handlebars.bootstrap = function(ctx)  at http://cloud.github.com/downloads/emberjs/ember.js/ember-0.9.8.1.js

        //I also keep my code for check from DOM if you try to check. but it should be:
        //var template =  Ember.TEMPLATES[templateName]

        var template = Ember.TEMPLATES[templateName];

        //template is always return null if we have already init Ember.
        if (template && template != '') {
            if (callback)
                callback();
            return;
        } else {
            // if not found, look in the current website's bwl folder
            this.insertContentOnce("bwl/templates/{0}.tpl.htm".format(templateName), function (templateData) {
                BWL.Common.addTemplateToDOM(templateName, templateData, callback);
            }, function () {
                if (callback)
                    callback(false);
            });
        }
    },
    loadHandlebarsTemplates: function () {
        var callback = null;
        var templates = [];
        for (var i = 0; i < arguments.length; i++) {
            if (typeof (arguments[i]) == "function") {
                callback = arguments[i];
            } else if (typeof (arguments[i]) == "string") {
                templates.push(arguments[i]);
            }
        }
        var lopper = 0;
        BWL.Common.Waiting.Start();
        var loadTemplateLopper = function () {
            if (lopper >= templates.length) {
                if (callback) {
                    callback();
                }
                BWL.Common.Waiting.Stop();
            } else {
                BWL.Common.loadHandlebarsTemplate(templates[lopper], function () {
                    lopper++;
                    loadTemplateLopper();
                });
            }
        };
        loadTemplateLopper();
    },
    addTemplateToDOM: function (templateName, templateData, callback) {
        Ember.TEMPLATES[templateName] = Ember.Handlebars.compile(templateData);
        if (callback) {
            callback();
        }
    },

    getRootURL: function () {
        var url = document.location.toString(); //url
        var e_url = ''; //edited url
        var p = 0; //position
        var p2 = 0; //position 2
        p = url.indexOf("//");
        e_url = url.substring(p + 2);
        p2 = e_url.indexOf("/");
        var root_url = url.substring(0, p + p2 + 3);
        return root_url;
        //    alert(root_url);
    },

    getParamFromURL: function (paramNum) {
        var url = window.location.href.split(BWL.URIDELIMITER);

        if (url.length > 1) {
            var params = url[1].split("/");
            return (params.length > 1 + paramNum) ? params[1 + paramNum] : "";
        }
        else {
            return "";
        }
    },

    isNullOrEmpty: function (value) {
        if (undefined == value || null == value || '' == value)
            return true;
        return false;
    },

    subLine1Text: function (text) {
        var maxLength = 15;
        var result = text;
        if (this.isNullOrEmpty(text))
            return '';
        if (text.length > maxLength) {
            if (text.indexOf(" ") != -1)
                result = this.subLine1Text(text.substring(0, text.lastIndexOf(" ")));
            else
                result = text;
        }
        return result;
    },

    subText: function (text) {
        if (!text)
            return "";

        var maxLength = 15;
        var result = text;
        if (this.isNullOrEmpty(text))
            return '';
        if (text.length > maxLength) {
            if (text.indexOf(" ") != -1) {
                //split 2 line
                var line1 = this.subLine1Text(text.substring(0, text.lastIndexOf(" ")));
                var line2 = this.subLine1Text(text.substring(line1.length + 1, text.length));

                line1 = line1.length > maxLength ? line1.substring(0, maxLength) + "..." : line1;
                line2 = line2.length > maxLength ? line2.substring(0, maxLength) + "..." : line2;

                result = line1 + '<br/>' + line2;
            }
            else {
                result = this.subLine1Text(text);
                result = result.length > maxLength ? result.substring(0, maxLength) + "..." : result;
            }
        }

        return result;
    },

    calcDiffPrice: function (price, comparePrice) {
        // get currency symbol
        var smbCurrency = "$"; // default currency symbol
        if (BWL.Currency) {
            smbCurrency = String.fromCharCode(BWL.Currency.UnicodeCharacter);
        }

        var diffPrice = price - comparePrice;
        var customPrice = "";

        if (diffPrice != 0) {
            if (diffPrice < 0) {
                customPrice = " -{0}{1}";
            } else {
                customPrice = " +{0}{1}";
            }

            customPrice = customPrice.format(smbCurrency, Math.abs(diffPrice));
        }

        return customPrice;
    },

    getProductPrice: function (item) {
        // return sale price if product is on sale, otherwise return regular price
        if (item.SalePrice)
            return item.SalePrice;

        return item.Price;
    },

    //Format Price
    formatPrice: function (priceInfo) {
        if (BWL.Currency) {
            var data = BWL.$().number_format(priceInfo, { numberOfDecimals: BWL.Currency.DecimalPlaces, decimalSeparator: BWL.Currency.DecimalSeparator, thousandSeparator: BWL.Currency.ThousandsSeparator });

            if (BWL.Currency.PrefixCharacter)
                return BWL.Currency.ISO + String.fromCharCode(BWL.Currency.UnicodeCharacter) + ' ' + BWL.$().number_format(priceInfo, { numberOfDecimals: 2 });
            else
                return BWL.$().number_format(priceInfo, { numberOfDecimals: 2 }) + ' ' + String.fromCharCode(BWL.Currency.UnicodeCharacter) + BWL.Currency.ISO;
        }
        return BWL.$().number_format(priceInfo, { numberOfDecimals: 2 });
    },

    //Convert file size to general displaying
    fileSizeConverter: function (size) {
        if (size > 1024 * 1024)
            return Math.floor(size / (1024 * 1024)) + ' MB';
        else if (size > 1024)
            return Math.floor(size / 1024) + ' KB';
        else
            return '0.0 KB';
    },

    // Date.now() does not support for IE8 and earlier version.
    dateNow: function () {
        if (!Date.now) {
            return +(new Date());
        }
        else {
            return Date.now();
        }
    },

    dump: function (arr, eolchar, level, levelId) {
        var dumped_text = "";
        var paddding = "    ";
        if (!level) level = 0;
        if (!eolchar) eolchar = "\n";

        // Date.now() does not support for IE8 and earlier version - lam.nguyen
        // Have to use this
        if (!levelId) levelId = this.dateNow() + ".";

        if (eolchar != "\n") paddding = "&nbsp;&nbsp;&nbsp;&nbsp;";

        //The padding given at the beginning of the line.
        var level_padding = "";
        for (var j = 0; j < level + 1; j++) level_padding += paddding;

        if (typeof (arr) == 'object') { //Array/Hashes/Objects
            for (var item in arr) {
                var value = arr[item];

                if (typeof (value) == 'object') { //If it is an array,
                    levelId += item;
                    dumped_text += level_padding + item;
                    if (value != null && value != undefined) {
                        if (eolchar == "\n") {
                            dumped_text += BWL.Common.dump(value, eolchar, level + 1, levelId + ".");
                        }
                        else {
                            var label = "";

                            // add the type, key or both to the label if available
                            if (value.Key != undefined) label += value.Key;
                            if (label.length == 0) label += "=>";

                            dumped_text += " <a href=\"javascript:BWL.Common.toggle('" + levelId + "');\">" + label + "</a>";
                            dumped_text += eolchar;
                            dumped_text += "<div id='" + levelId + "' style='display: none'>";
                            dumped_text += BWL.Common.dump(value, eolchar, level + 1, levelId + ".");
                            dumped_text += "</div>";
                        }
                    } else {
                        dumped_text += " => null" + eolchar;
                    }
                } else if (typeof (value) == 'function') {
                    dumped_text += level_padding + item + " => \"" + eval(value) + "\"" + eolchar;
                } else if (typeof (value) == 'string') {
                    dumped_text += level_padding + item + " => \"" + value + "\"" + eolchar;
                } else {
                    dumped_text += level_padding + item + " => " + value + eolchar;
                }
            }
        } else { //Stings/Chars/Numbers etc.
            dumped_text = "(" + typeof (arr) + ")=>" + arr;
        }
        return dumped_text;
    },

    toggle: function (target) {
        var obj = document.getElementById(target);
        obj.style.display = (obj.style.display == "block") ? "none" : "block";
    },

    getStream: function (audio, type) {
        for (var pos = 0; pos < audio.Streams.length; pos++) {
            var stream = audio.Streams[pos];
            if (stream.MimeInfo.Extention == type) {
                return stream;
            }
        }
        return null;
    },

    getFirstDayPrevMonth: function (d) {
        if (d.getMonth() == 0) {
            return new Date(d.getFullYear() - 1, 11, 1);
        } else {
            return new Date(d.getFullYear(), d.getMonth() - 1, 1);
        }
    },

    IsHandleCustomURI: function (uri) {
        var ignoreURI = ['checkout', 'cart', 'logoff', 'Logon', 'cart', 'wishlist', 'account', 'orders', 'all'];
        for (var i = 0; i < ignoreURI.length; i++) {
            if (uri.toLowerCase() === ignoreURI[i].toLowerCase())
                return true;
        }
        return false;
    },

    CustomURIParser: function (customURI) {
        if (!customURI)
            return null;

        if (customURI.indexOf('?') > 0)
            customURI = customURI.substr(0, customURI.indexOf('?'));
        if (customURI.length > 0) {
            var uris = customURI.split('/');
            if (uris.length > 0)
                return uris;
        }
        return null;
    },

    getNextCustomURI: function (storeKey, customURI, index, callback) {
        var common = this;

        if (customURI.length < 3) {
            for (var i = 0; i <= 3 - customURI.length; i++) {
                customURI += "-";
            }
        }

        var temp = customURI;
        if (index > 0) {
            temp = customURI + '-' + index;
        }

        index = index + 1;
        if (storeKey) {
            BWL.Services.StoreService.FindCustomURIInfoFromURIAsync(storeKey, temp, function (customURIInfo) {
                if (customURIInfo && customURIInfo.URI) {
                    common.getNextCustomURI(storeKey, customURI, index, callback);
                } else {
                    callback(temp);
                }
            }, function () {
                callback("");
            });
        } else {
            BWL.Services.StoreService.FindStoreKeyFromCustomURIAsync(temp, function (customURIInfo) {
                if (customURIInfo) {
                    common.getNextCustomURI(null, customURI, index, callback);
                } else {
                    callback(temp);
                }
            }, function () {
                callback("");
            });
        }
    },

    isNullOrUndefined: function (obj) {
        if (obj == null || obj == undefined)
            return true;

        return false;
    },

    decodeHTML: function (encodedStr) {
        return BWL.$("<div/>").html(encodedStr).text();
    },

    formatAddress: function (address, EOLChar) {
        if (!address) return "";

        var strAddress = address.AddressLine1 + EOLChar;
        if (address.AddressLine2) strAddress += address.AddressLine2 + EOLChar;

        if (address.County) strAddress += address.County + EOLChar;
        if (address.District) strAddress += address.District + EOLChar;

        strAddress += address.City + ", " + address.Region + EOLChar;

        if (address.PostalCode) strAddress += address.PostalCode + " ";

        strAddress += address.Country;

        return strAddress;
    },

    formatAddressOneLine: function (address) {
        if (!address) return "";

        var strAddress = address.AddressLine1 + ", " + address.City + ", " + address.Region;

        return strAddress;
    },

    formatAddressTwoLines: function (address, EOLChar) {
        if (!address) return "";

        var strAddress = address.AddressLine1;
        if (address.AddressLine2) strAddress += ", " + address.AddressLine2;

        strAddress += EOLChar + address.City + ", " + address.Region;

        return strAddress;
    },

    formatPaymentType: function (paymentType) {
        paymentType = paymentType.replace("Payment", "");
        if (paymentType == "CheckCheque") {
            var store = Ember.getPath('BWL.Store');
            paymentType = (store.Address.Country == "Canada") ? "Cheque" : "Check";
        }
        return paymentType;
    },

    GetOrderState: function (state) {
        var stateName = "";

        switch (state) {
            case 0:
                stateName = CommonResources.Text_OrderStateNone;
                break;
            case 1:
                stateName = CommonResources.Text_OrderStateNew;
                break;
            case 2:
                stateName = CommonResources.Text_OrderStateProcessing;
                break;
            case 3:
                stateName = CommonResources.Text_OrderStateBackordered;
                break;
            case 4:
                stateName = CommonResources.Text_OrderStateOrdered;
                break;
            case 5:
                stateName = CommonResources.Text_OrderStateShipped;
                break;
            case 6:
                stateName = CommonResources.Text_OrderStateReturned;
                break;
            case 7:
                stateName = CommonResources.Text_OrderStateFullfiled;
                break;
            case 8:
                stateName = CommonResources.Text_OrderStateClosed;
                break;
        }

        return stateName;
    },

    Waiting: {
        Dlg: null,

        OnTop: function () {
            try {
                if (BWL.$("#bwl_divLoading").length == 0)
                    return false;

                BWL.$("#bwl_divLoading").remove();
                BWL.Common.Waiting.Dlg.dialog('close');

                this.Start();
            }
            catch (ex) {
            }
        },

        Start: function (msg) {
            if (!msg)
                msg = CommonResources.Text_Waiting;

            if (BWL.$("#bwl_divLoading").length > 0)
                return false;

            BWL.Common.Waiting.Dlg = BWL.$("<div id='bwl_divLoading' title='" + msg + "'> <img src='/images/ajax-loader.gif' alt='Loading...' style='position:absolute; top:50%; left:50%; margin-top:-22px; margin-left:-22px;'/> </div>").dialog({
                title: 'Please Wait',
                modal: true,
                disabled: true,
                closeOnEscape: false,
                resizable: false,
                open: function (event, ui) {
                    BWL.$(this).parent().children().children("a.ui-dialog-titlebar-close").hide();
                    BWL.$(this).css('z-index', '9999');
                }
            });
        },

        Stop: function () {
            try {
                BWL.$("#bwl_divLoading").remove();
                BWL.Common.Waiting.Dlg.dialog('close');
            }
            catch (ex) {
            }
        }
    },

    UpdateLocationHash: function (hashUrl) {
        window.location.href = '#!/' + hashUrl;
    },

    getSocialNetworkProviderAsync: function (strURL, callbackSuccess, callbackError) {
        var input = BWL.$.trim(strURL.toLowerCase());
        if (input.length > 0 && input.indexOf('<') == -1 && input.indexOf('>') == -1) {
            if (input.indexOf('facebook.com') != -1)
                this.getFacebookAsync(input, callbackSuccess, callbackError);
            else if (input.indexOf('twitter.com') != -1)
                this.getTwitterAsync(input, callbackSuccess, callbackError);
            else if (input.indexOf('youtube.com') != -1)
                this.getYoutubeAsync(input, callbackSuccess, callbackError);
            else if (input.indexOf('last.fm') != -1)
                this.getLastFMAsync(input, callbackSuccess, callbackError);
            else if (input.indexOf('flickr.com') != -1)
                this.getFlickrAsync(strURL, callbackSuccess, callbackError);
            else
                callbackError();
        } else
            callbackError();
    },

    getFlickr: function (input) {
        var extFlickr;
        var url = 'http://api.flickr.com/services/rest/?method=flickr.urls.lookupUser&api_key=53febc3ebb4bdaddbfbaa154fb4e8efb&url=' + encodeURIComponent(input) + '&format=json&jsoncallback=?';
        BWL.$.ajax({
            url: url,
            type: "GET",
            dataType: "jsonp",
            cache: false,
            async: false,
            data: {},
            success: function (data) {
                if (data.stat == 'ok') {
                    extFlickr = new BWL.Model.Flickr();
                    extFlickr.ProviderId = data.user.id;
                    extFlickr.Name = data.user.username._content;
                    extFlickr.Description = input;
                }
            },
            error: function (r, t) {
            }
        });

        return extFlickr;
    },

    getFlickrAsync: function (input, callbackSuccess, callbackError) {
        var url = 'http://api.flickr.com/services/rest/?method=flickr.urls.lookupUser&api_key=53febc3ebb4bdaddbfbaa154fb4e8efb&url=' + encodeURIComponent(input) + '&format=json&jsoncallback=?';
        $.ajax({
            url: url,
            type: "GET",
            dataType: "jsonp",
            success: function (data) {
                if (data.stat == 'ok') {
                    var extFlickr = BWL.Model.Flickr.create({
                        ProviderId: data.user.id,
                        Name: data.user.username._content,
                        Description: input
                    });
                    callbackSuccess(extFlickr);
                } else
                    if (!BWL.Common.isNullOrUndefined(callbackError))
                        callbackError();
            },
            error: function (r, t) {
                if (!BWL.Common.isNullOrUndefined(callbackError))
                    callbackError();
            }
        });
    },

    getFacebookAsync: function (input, callbackSuccess, callbackError) {
        var myRegExp = /(?:http:\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-\.]*)?/;
        var myArray = myRegExp.exec(input);
        if (myArray != null && myArray.length > 1) {
            var id = myArray[1];
            var url = "https://graph.facebook.com/" + id;
            BWL.$.ajax({
                url: url,
                type: "GET",
                dataType: "jsonp",
                success: function (data) {
                    if (!BWL.Common.isNullOrUndefined(data)) {
                        var id = data.id;
                        if (id != null && id != 'undefined') {
                            var extFacebookPage = BWL.Model.Facebook.create({
                                ProviderId: id,  // the page id
                                Name: data.name,
                                Description: input
                            });
                            if (!BWL.Common.isNullOrUndefined(callbackSuccess))
                                callbackSuccess(extFacebookPage);
                        } else {
                            if (!BWL.Common.isNullOrUndefined(callbackError))
                                callbackError();
                        }
                    } else {
                        if (!BWL.Common.isNullOrUndefined(callbackError))
                            callbackError();
                    }
                },
                error: function (r, t) {
                    if (!BWL.Common.isNullOrUndefined(callbackError))
                        callbackError();
                }
            });
        } else
            callbackError();
    },

    getLastFMAsync: function (input, callbackSuccess, callbackError) {
        var myRegExp = '';
        var type = ''
        if (input.indexOf('user') != -1) {
            myRegExp = /(?:http:\/\/)?(?:www.)?last.fm\/(?:(?:\w)*user\/)?([\w\-\+]*)?/;
            type = 'user';
        }
        else {
            myRegExp = /(?:http:\/\/)?(?:www.)?last.fm\/(?:(?:\w)*music\/)?([\w\-\+]*)?/;
            type = 'artist';
        }

        var myArray = myRegExp.exec(input);
        if (myArray != null && myArray.length > 1) {
            var id = myArray[1];
            var url = '';
            url = 'http://ws.audioscrobbler.com/2.0/?method=' + type + '.getinfo&' + type + '=' + id + '&api_key=cbc6614ab6483a80ddb12a15c6afeba7&format=json';
            BWL.$.ajax({
                url: url,
                type: "GET",
                dataType: "jsonp",
                success: function (data) {
                    if (!BWL.Common.isNullOrUndefined(data) && isNullOrEmpty(data.error)) {
                        var username = data[type].name;
                        if (username != null && username != 'undefined') {
                            var extLastFM = BWL.Model.LastFM.create({
                                ProviderId: username,
                                Name: username,
                                Description: input,
                                LastFMType: (type === 'user' ? Model.LastFMTypeEnum.User : Model.LastFMTypeEnum.Artist)
                            });
                            callbackSuccess(extLastFM);
                        }
                    } else {
                        if (!BWL.Common.isNullOrUndefined(callbackError))
                            callbackError();
                    }
                },
                error: function (r, t) {
                    if (!BWL.Common.isNullOrUndefined(callbackError))
                        callbackError();
                }
            });
        }
    },

    getTwitterAsync: function (input, callbackSuccess, callbackError) {
        var myRegExp = /(?:http:\/\/)?(?:www.)?twitter.com\/(?:(?:\w)*#!\/)?([\w\-]*)?/;
        var myArray = myRegExp.exec(input);
        if (myArray != null && myArray.length > 1) {
            var id = myArray[1];
            var url = "http://api.twitter.com/users/show/" + id + ".json";
            BWL.$.ajax({
                url: url,
                type: "GET",
                dataType: "jsonp",
                success: function (data) {
                    if (!BWL.Common.isNullOrUndefined(data)) {
                        var id = data.id_str;
                        var screen_name = data.screen_name;
                        if (id != null && id != 'undefined') {
                            var extTwitter = BWL.Model.Twitter.create({
                                ProviderId: screen_name,  // the page id
                                Name: data.name,
                                Description: input
                            });
                            callbackSuccess(extTwitter);
                        } else {
                            if (!BWL.Common.isNullOrUndefined(callbackError))
                                callbackError();
                        }
                    } else {
                        if (!BWL.Common.isNullOrUndefined(callbackError))
                            callbackError();
                    }
                },
                error: function (r, t) {
                    if (!BWL.Common.isNullOrUndefined(callbackError))
                        callbackError();
                }
            });
        }
    },

    getYoutubeAsync: function (input, callbackSuccess, callbackError) {
        var myRegExp = /(?:http:\/\/)?(?:www.)?youtube.com\/(?:(?:\w)*user\/)?([\w\-]*)?/;
        var myArray = myRegExp.exec(input);
        if (myArray != null && myArray.length > 1) {
            var id = myArray[1];
            var url = 'http://gdata.youtube.com/feeds/api/users/' + id + '?alt=json';
            BWL.$.ajax({
                url: url,
                type: "GET",
                dataType: "jsonp",
                success: function (data) {
                    if (!BWL.Common.isNullOrUndefined(data)) {
                        var username = data.entry.yt$username.$t;
                        if (username != null && username != 'undefined') {
                            var extYoutube = BWL.Model.YouTube.create({
                                ProviderId: username,  // the page id
                                Name: data.entry.author[0].name.$t,
                                Description: input
                            });
                            callbackSuccess(extYoutube);
                        } else {
                            if (!BWL.Common.isNullOrUndefined(callbackError))
                                callbackError();
                        }
                    } else {
                        if (!BWL.Common.isNullOrUndefined(callbackError))
                            callbackError();
                    }
                },
                error: function (r, t) {
                    if (!BWL.Common.isNullOrUndefined(callbackError))
                        callbackError();
                }
            });
        }
    },
};
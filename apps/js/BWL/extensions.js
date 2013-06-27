//////////////////////////////////////////////////
// Copyright 2013 Black & White Logic Inc.
// All rights reserved
//////////////////////////////////////////////////

// Extentions
String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

Date.prototype.getGMTOffset = function () {
    return (this.getTimezoneOffset() > 0 ? "-" : "+")
        + Math.abs(Math.floor(this.getTimezoneOffset() / 60)).toString().leftPad(2, '0')
        + (this.getTimezoneOffset() % 60).toString().leftPad(2, '0');
};

if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function () {
        function pad(n) { return n < 10 ? '0' + n : n }
        return this.getUTCFullYear() + '-'
            + pad(this.getUTCMonth() + 1) + '-'
            + pad(this.getUTCDate()) + 'T'
            + pad(this.getUTCHours()) + ':'
            + pad(this.getUTCMinutes()) + ':'
            + pad(this.getUTCSeconds()) + 'Z';
    };
}

String.prototype.leftPad = function (size, ch) {
    var result = new String(this);
    if (ch === null || ch === undefined || ch === '') {
        ch = " ";
    }
    while (result.length < size) {
        result = ch + result;
    }
    return result;
};

//count number of times a character occurs in a string
String.prototype.count = function (match) {
    var res = this.match(new RegExp(match, "g"));
    if (res == null) { return 0; }
    return res.length;
}

Array.prototype.unique = function () {
    var o = {}, i, l = this.length, r = [];
    for (i = 0; i < l; i += 1) o[this[i]] = this[i];
    for (i in o) r.push(o[i]);
    return r;
}

Array.prototype.contains = function (elem) {
    return (this.indexOf(elem) > -1);
};

Array.prototype.containsObject = function (property, searchTerm) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][property] == searchTerm) return true;
    }
    return false;
};

Array.prototype.intersect = function (array) {
    // this is native--could use some optimization
    var result = [];
    for (var i = 0; i < this.length; i++) {
        if (array.contains(this[i]) && !result.contains(this[i]))
            result.push(this[i]);
    }
    return result;
}

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
    };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) return new Date();

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
      d = date[_ + "Date"](),
      D = date[_ + "Day"](),
      m = date[_ + "Month"](),
      y = date[_ + "FullYear"](),
      H = date[_ + "Hours"](),
      M = date[_ + "Minutes"](),
      s = date[_ + "Seconds"](),
      L = date[_ + "Milliseconds"](),
      o = utc ? 0 : date.getTimezoneOffset(),
      flags = {
          d: d,
          dd: pad(d),
          ddd: dF.i18n.dayNames[D],
          dddd: dF.i18n.dayNames[D + 7],
          m: m + 1,
          mm: pad(m + 1),
          mmm: dF.i18n.monthNames[m],
          mmmm: dF.i18n.monthNames[m + 12],
          yy: String(y).slice(2),
          yyyy: y,
          h: H % 12 || 12,
          hh: pad(H % 12 || 12),
          H: H,
          HH: pad(H),
          M: M,
          MM: pad(M),
          s: s,
          ss: pad(s),
          l: pad(L, 3),
          L: pad(L > 99 ? Math.round(L / 10) : L),
          t: H < 12 ? "a" : "p",
          tt: H < 12 ? "am" : "pm",
          T: H < 12 ? "A" : "P",
          TT: H < 12 ? "AM" : "PM",
          Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
          o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
          S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
      };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

/** https://github.com/csnover/js-iso8601 */
(function (n, f) { var u = n.parse, c = [1, 4, 5, 6, 7, 10, 11]; n.parse = function (t) { var i, o, a = 0; if (o = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(t)) { for (var v = 0, r; r = c[v]; ++v) o[r] = +o[r] || 0; o[2] = (+o[2] || 1) - 1, o[3] = +o[3] || 1, o[8] !== "Z" && o[9] !== f && (a = o[10] * 60 + o[11], o[9] === "+" && (a = 0 - a)), i = n.UTC(o[1], o[2], o[3], o[4], o[5] + a, o[6], o[7]) } else i = u ? u(t) : NaN; return isNaN(i) ? i : new n(i) } })(Date)

BWL.$.validator.setDefaults({
    errorPlacement: function (error, placement) {
        if ('object' === typeof BWL.$(placement).data('qtip')) {
            BWL.$(placement).qtip("destroy");
        }

        BWL.$(placement).qtip({
            content: error.text(),
            show: { when: { event: 'none' }, ready: true },
            hide: { when: { event: 'keydown' } },
            position: {
                corner: {
                    target: 'rightMiddle',
                    tooltip: 'leftMiddle'
                }
            },
            style: {
                tip: true,
                name: 'red'
            },
            api: {
                beforeShow: function () {
                }
            },
            effect: { type: 'face', length: 0 }
        });
    }
});

/**
     * Parses the ISO 8601 formated date into a date object, ISO 8601 is YYYY-MM-DD
     *
     * @param {String} date the date as a string eg 1971-12-15
     * @returns {Date} Date object representing the date of the supplied string
     */
Date.prototype.parseISO8601 = function (date) {
    var matches = date.split("-");

    if (matches) {
        this.setFullYear(parseInt(matches[0]));
        this.setMonth(parseInt((matches[1].substr(0, 1) == "0") ? (matches[1].substr(1, 1)) : matches[1]) - 1);
        this.setDate(parseInt((matches[2].substr(0, 1) == "0") ? matches[2].substr(1, 1) : matches[2].substr(0, 2)));
    }

    return this;
};

BWL.$.validator.addMethod("non-negative", function (value, element) {
    return value > 0;
}, "Non-negative number required");
BWL.$.validator.addMethod("eduemail", function (value, element) {
    return value.indexOf('edu') > 0;
}, "*require .edu extension");

BWL.$('.non-negative').on('blur change keyup', function () {
    var valid = BWL.$(this).val();
    if (isNaN(valid)) {
        BWL.$(this).val('1');
        BWL.$(this).trigger('blur');
    }
    else if (valid < 0) {
        BWL.$(this).val(valid * (-1));
    }
});

BWL.$(function () {
    if (BWL.$.isFunction(BWL.$.fn.datepicker)) {
        BWL.$('.datepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            yearRange: '1900:c+2',
            showOn: 'both',
            buttonImage: '/images/calendar.png',
            buttonImageOnly: true
        });
    }
});

BWL.$(function () {
    if (BWL.$.isFunction(BWL.$.fn.datetimepicker)) {
        BWL.$('.datetimepicker').datetimepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '1900:c+2',
            showOn: 'both',
            buttonImage: '/images/calendar.png',
            buttonImageOnly: true,
            ampm: true
        });
    }
});

// BWL.$('.date').livequery(function () {
//     BWL.$(this).datepicker({
//         dateFormat: 'yy-mm-dd',
//         changeMonth: true,
//         changeYear: true,
//         yearRange: '1900:c+2',
//         showOn: 'both',
//         buttonImage: '/images/calendar.png',
//         buttonImageOnly: true,
//         beforeShow: function () {
//             BWL.$(".qtip").hide();
//         },
//         onClose: function () {
//             setTimeout(function () {
//                 BWL.$(".qtip").hide();
//             }, 500);
//         }
//     });
// });

// BWL.$('.datetime').livequery(function () {
//     BWL.$(this).datetimepicker({
//         changeMonth: true,
//         changeYear: true,
//         ampm: true,
//         yearRange: '1900:c+2',
//         showOn: 'both',
//         buttonImage: '/images/calendar.png',
//         buttonImageOnly: true,
//         beforeShow: function () {
//             BWL.$(".qtip").hide();
//         },
//         onClose: function () {
//             BWL.$(".qtip").hide();
//         }
//     });
//     if (BWL.$(this).val() != null && BWL.$(this).val() != '')
//         BWL.$(this).datetimepicker('setDate', (new Date(Date.parse(BWL.$(this).val()))));
// });
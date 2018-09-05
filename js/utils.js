/**
 * Highlights the JSON
 * @param {json} json - The transaction receipt in this case
 */
function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
} 

function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

function formatArrayToReadable(array) {
    let i = 0;
    let formattedArray = [];
    array.forEach(account => {
        formattedArray.push("<br>&nbsp;&nbsp;&nbsp;&nbsp;" + account);
    });
    formattedArray[formattedArray.length -1] = formattedArray[formattedArray.length -1] + "<br>";
    return formattedArray;
}

function json_stringify_data(data) {
    return JSON.stringify(data, null, 4);
}

function validateObjectKeyValues(objectToCheck, keysToCheck) {
    let faultyResults = [];
    let goodResults = [];
    for (let i = 0; i < keysToCheck.length; i++) {
        let key = keysToCheck[i].key;
        let type = keysToCheck[i].type;
        if (!objectToCheck.hasOwnProperty(key)) {
            faultyResults.push("- Missing key '" + key + "' <br>");
        } else {
            goodResults.push("- Has key '" + key + "' <br>");
        }
        if (keysToCheck[i].type === "array") {
            if (!Array.isArray(objectToCheck[key])) {
                faultyResults.push("- Value of key '" + key + "' is not type of " + type + " <br>");
            } else {
                goodResults.push("- Value of key '" + key + "' is type of " + type + " <br>");
            }
        } else {
            if (typeof(objectToCheck[key]) === type) {
                goodResults.push("- Value of key '" + key + "' is type of " + type + " <br>");
            } else {
                faultyResults.push("- Value of key '" + key + "' is not type of " + type + " <br>");
            }
        }
    }
    if (faultyResults.length > 0) {
        return {success: false, results: faultyResults};
    } else {
        return {success: true, results: goodResults};
    }
}

function incrementTotalCalls() {
    $('.totalcalls').text((i, oldval) => { return ++oldval });
}

function incrementSucceededCalls() {
    $('.succeededcalls').text((i, oldval) => { return ++oldval });
    calculatePercentageCoverage();
}

function incrementFailedCalls() {
    $('.failedcalls').text((i, oldval) => { return ++oldval });
    calculatePercentageCoverage();
}

function calculatePercentageCoverage() {
    let succeededCalls = parseInt($('.succeededcalls').text());
    let failedCalls = parseInt($('.failedcalls').text());
    let percentage = 100;
    if (failedCalls !== 0) {
        percentage = 100 - ((failedCalls / succeededCalls) * 100);
    } 
    $(".compat-percentage").text(percentage + "%");
}


//This takes a javascript object that is describing the find(...) in MongoDB, and the callback is a function that accepts a Javascript Array of Candidates
var getData = function (queryArg, projectionArg, callback) {

    var requestObject = {
        query: queryArg,
        projection: projectionArg
    };

    var jsonPayload = JSON.stringify(requestObject);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://10.80.80.99:15214/api/query", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var responseObject = JSON.parse(xhr.responseText);
                var resultArray = responseObject.results;
                callback(resultArray);
            }
        }
    };

    xhr.send(jsonPayload);
};

var getCount = function (queryArg, callback) {

    var requestObject = {
        query: queryArg
    };

    var jsonPayload = JSON.stringify(requestObject);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://10.80.80.42:15214/api/count", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var count = parseInt(xhr.responseText);
                callback(count);
            }
        }
    };

    xhr.send(jsonPayload);
};

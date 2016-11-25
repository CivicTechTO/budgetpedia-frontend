"use strict";
exports.getQuery = (uri) => {
    let queryString = {};
    uri.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) { queryString[$1] = $3; });
    return queryString;
};

let fs = require("fs"),
    http = require("http");
url = require("url");

function onRequest(request, response) {
    console.log("Request received.");

    response.writeHead(200, {
        "Content-Type": 'application/json; charset=UTF-8',
        "Access-Control-Allow-Headers": "X-Requested-With",
        'charset': 'utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
    });

    let data = handleReq(request);
    if (data !== null) {
        response.write(data);
    }

    response.end();

}

function handleReq(request) {
    if (request.url !== "/favicon.ico") {
        let reqUrl = url.parse(request.url),
            path = (url.format(reqUrl.path)).substr(1),
            jsonName = path.replace(/\.htm$/, ".json"),
            jsonPath = `./json/${jsonName}`,
            json = require('./json/error.json');

        if (path != "") {
            try {
                json = require(jsonPath);
            } catch (err) {
                jsonName=jsonName.replace(/\//g, "-");
                jsonPath = `./json/${jsonName}`;
                try{
                    json = require(jsonPath);
                }
                catch(errFinal)
                {
                 console.log(errFinal);
                }
            }

        }

        return JSON.stringify(json);
    }
    return null;

}

http.createServer(onRequest).listen(9000);

console.log("Server has started.port on 9000");
let fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path =require("path");

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
            urlpath = (url.format(reqUrl.path)).substr(1),
            jsonName = urlpath.replace(/\.htm$/, ".json"),
            jsonPath = path.resolve(__dirname,`./json/${jsonName}`),
            json = require('./json/error.json');

        if (jsonPath != "" ) 
           {   
               
               let isExists=fs.existsSync(jsonPath);
               
               if(!isExists)
               {
                   jsonName=jsonName.replace(/\//g,"-");
                   jsonPath= path.resolve(__dirname,`./json/${jsonName}`);
                   isExists=fs.existsSync(jsonPath);
               }
               if(isExists)
               {
                json = require(jsonPath);
               }
           }
          
        return JSON.stringify(json);
    }
    return null;

}

http.createServer(onRequest).listen(9000);

console.log("Server has started.port on 9000");
const https = require("https");

const TELEMETRY_HOST = process.env.TELEMETRY_HOST;
const API_KEY = process.env.API_KEY;

const fullUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

const _log = function (data, endpoint) {
    const body = JSON.stringify(data);

    console.log(JSON.stringify(data, null, 2));

    const options = {
        hostname: TELEMETRY_HOST,
        port: 443,
        path: endpoint,
        method: "POST",
        headers: {
            [`Content-Type`]: "application/json",
            [`Content-Length`]: body.length,
            [`x-api-key`]: API_KEY
        }
    };

    https.request(options, res => {
       // track meta??
    })
    .on("error", error => {
        // track meta??
        console.log(error);
    })
    .write("test");
} 

module.exports = {
    logLatency({req, elapsedMs, response}) {
        const data = {
            id: req.__telemetry__id,
            url: fullUrl(req), 
            duration: elapsedMs,
            statusCode: response.statusCode
        };

        _log(data, "/remote_perf_data");
    }
}
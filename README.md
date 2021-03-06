# express-latency-middleware
Express route latency middleware and error tracker

## Development

```
TELEMETRY_HOST=<Host> API_KEY=<API-KEY> node demo/index.js
```

## Usage

```js

const express = require("express");
const TelemetryMiddleware = require("express-latency-middleware");

const app = express();

const PORT = 3000;

app.use(TelemetryMiddleware.latencyTracker({
    trackLatency: true
}));


app.get("/hello", (req, res) => {
    res.send({
        msg: "Hello World!!"
    });
});


app.listen(PORT, () => {
    console.log(`Server is app @ https://localhost:${PORT}`);
});

```

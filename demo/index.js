const express = require("express");
const TelemetryMiddleware = require("../");

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


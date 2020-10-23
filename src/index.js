const EventEmitter = require("events").EventEmitter;
const uuid = require("uuid").v1;

const TelemetryApi = require("./http");

const emitter = new EventEmitter();

const EVENTS = {
   PRE_RESPONSE: "telemetry:pre-response"
};

emitter.on(EVENTS.PRE_RESPONSE, TelemetryApi.logLatency);

module.exports = {
    latencyTracker: function (options) {
        return function (request, response, next) {
            request.__telemetry__id = uuid();

            if (options.trackLatency) {
                const start = Date.now();

                response.once("finish", () => {
                    emitter.emit(EVENTS.PRE_RESPONSE, {
                        req: request,
                        elapsedMs: Date.now() - start,
                        response
                    });
                })
            }
            next();
        }
    }
};


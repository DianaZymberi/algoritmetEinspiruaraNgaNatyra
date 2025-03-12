class Endpoint {
    constructor(id, dataCenterLatency) {
        this.id = id;
        this.dataCenterLatency = dataCenterLatency;
        this.cacheConnections = {}; // { cacheId: latency }
    }

    addCacheConnection(cacheId, latency) {
        this.cacheConnections[cacheId] = latency;
    }
}

module.exports = Endpoint;
const Parser = require("./parser");
const OutputGenerator = require("../Services/outputGenerator");

class Solver {
    static solve(input) {
        const { videos, endpoints, requests, cacheServers } = Parser.parseInput(input);

        for (const request of requests) {
            const video = videos[request.videoId];
            const endpoint = endpoints[request.endpointId];
          
            const sortedCaches = Object.entries(endpoint.cacheConnections)
              .map(([cacheId, latency]) => [Number(cacheId), latency])
              .sort((a, b) => a[1] - b[1]);
          
            for (const [cacheId] of sortedCaches) {
              if (cacheServers[cacheId].addVideo(video)) {
                break;
              }
            }
          
          


        // for (const request of requests) {
        //     const video = videos[request.videoId];
        //     const endpoint = endpoints[request.endpointId];

        //     const sortedCaches = Object.entries(endpoint.cacheConnections)
        //         .map(([cacheId, latency]) => [Number(cacheId), latency]) // Ensure cacheId is a number
        //         .filter(([cacheId]) => cacheId >= 0 && cacheId < cacheServers.length) // Validate range
        //         .sort((a, b) => a[1] - b[1]); // Sort by latency

        //     for (const [cacheId] of sortedCaches) {
        //         if (cacheServers[cacheId].addVideo(video)) {
        //             break; // Stop adding if successfully placed
        //         }
        //     }
        }

        return OutputGenerator.generateOutput(cacheServers);
    }
}

module.exports = Solver;
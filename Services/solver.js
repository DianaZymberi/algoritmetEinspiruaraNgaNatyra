const Parser = require("./parser");
const OutputGenerator = require("../Services/outputGenerator");

class Solver {
    static solve(input) {
        const { videos, endpoints, requests, cacheServers } = Parser.parseInput(input);

        for (const request of requests) {
            const video = videos[request.videoId];
            const endpoint = endpoints[request.endpointId];

            const sortedCaches = Object.entries(endpoint.cacheConnections)
                .sort((a, b) => a[1] - b[1]);

            for (const [cacheId] of sortedCaches) {
                if (cacheServers[cacheId].addVideo(video)) {
                    break;
                }
            }
        }

        return OutputGenerator.generateOutput(cacheServers);
    }
}

module.exports = Solver;
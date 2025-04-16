const Parser = require("../Services/parser");
const OutputGenerator = require("../Services/outputGenerator");
//inclde parser dhe outputGenerator


class GreedyRequestSolver {
  static solve(input) {
    const { videos, endpoints, requests, cacheServers } = Parser.parseInput(input);

    const sortedRequests = requests.slice().sort((a, b) => b.count - a.count);

    for (const request of sortedRequests) {
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
    }

    return OutputGenerator.generateOutput(cacheServers);
  }
}

module.exports = GreedyRequestSolver;

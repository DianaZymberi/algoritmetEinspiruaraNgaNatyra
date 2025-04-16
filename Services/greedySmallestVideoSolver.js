const Parser = require("../Services/parser");
const OutputGenerator = require("../Services/outputGenerator");

class GreedySmallestVideoSolver {
  static solve(input) {
    const { videos, endpoints, requests, cacheServers } = Parser.parseInput(input);

    // Rendit videot sipas madhësisë
    const sortedVideos = videos.slice().sort((a, b) => a.size - b.size);

    for (const video of sortedVideos) {
      // Gjej cilët endpoint-a kërkojnë këtë video
      const relevantEndpoints = requests
        .filter(r => r.videoId === video.id)
        .map(r => endpoints[r.endpointId]);

      for (const endpoint of relevantEndpoints) {
        // Rendit cache-at sipas latencës më të vogël
        const sortedCaches = Object.entries(endpoint.cacheConnections)
          .map(([cacheId, latency]) => [Number(cacheId), latency])
          .sort((a, b) => a[1] - b[1]);

        for (const [cacheId] of sortedCaches) {
          if (cacheServers[cacheId].addVideo(video)) {
            break;
          }
        }
      }
    }

    return OutputGenerator.generateOutput(cacheServers);
  }
}

module.exports = GreedySmallestVideoSolver;

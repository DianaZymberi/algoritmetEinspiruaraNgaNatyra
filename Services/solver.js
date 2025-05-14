const Parser = require("./parser");
const OutputGenerator = require("../Services/outputGenerator");

class Solver {
  static solve(input) {
      const { videos, endpoints, requests, cacheServers } = Parser.parseInput(input);
      let totalScore = 0;

      // Debugging logs
      console.log('Total Requests:', requests.length);  // Log total number of requests
      console.log('Total Cache Servers:', cacheServers.length);  // Log total number of cache servers
      
      // Process each request
      for (const request of requests) {
          const video = videos[request.videoId];
          const endpoint = endpoints[request.endpointId];
          
          const sortedCaches = Object.entries(endpoint.cacheConnections)
            .map(([cacheId, latency]) => [Number(cacheId), latency])
            .sort((a, b) => a[1] - b[1]);

          for (const [cacheId, latency] of sortedCaches) {
            if (cacheServers[cacheId].addVideo(video)) {
              totalScore += request.count; // Increase score by the number of requests for this video
              break;
            }
          }
      }

      // Debugging log for current score
      console.log('Current Score:', totalScore);  // Log current score

      // Generate the output
      const output = OutputGenerator.generateOutput(cacheServers);

      // Return both output and the score
      return {
          output,
          score: totalScore
      };
  }
}

module.exports = Solver;


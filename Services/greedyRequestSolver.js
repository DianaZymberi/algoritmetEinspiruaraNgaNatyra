const Parser = require("../Services/parser");
const OutputGenerator = require("../Services/outputGenerator");

class GreedyRequestSolver {
  static solve(input) {
    const { videos, endpoints, requests, cacheServers } = Parser.parseInput(input);

    const sortedRequests = requests.slice().sort((a, b) => {
      const benefitA = a.count / videos[a.videoId].size;
      const benefitB = b.count / videos[b.videoId].size;
      return benefitB - benefitA;
    });

    for (const request of sortedRequests) {
      const video = videos[request.videoId];
      const endpoint = endpoints[request.endpointId];

      const sortedCaches = Object.entries(endpoint.cacheConnections)
        .map(([cacheId, latency]) => [Number(cacheId), latency])
        .sort((a, b) => a[1] - b[1]);

      const isAlreadyStored = sortedCaches.some(([cacheId]) =>
        cacheServers[cacheId].videos.has(video.id)
      );

      if (isAlreadyStored) {
        continue;
      }

      for (const [cacheId] of sortedCaches) {
        if (cacheServers[cacheId].addVideo(video)) {
          console.log(`Video ${video.id} successfully added to cache ${cacheId}`);
          break;
        }
      }
    }

    // Generate output after processing all requests
    const output = OutputGenerator.generateOutput(cacheServers);
    console.log('Generated Output:\n', output); // Log the generated output

    // Calculate the score for the solution
    const totalScore = calculateScore(endpoints, requests, cacheServers);

    return {
      output,
      score: totalScore
    };
  }
}

module.exports = GreedyRequestSolver;

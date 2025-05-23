// // const Parser = require("../Services/parser");
// // const OutputGenerator = require("../Services/outputGenerator");

// // class GreedySmallestVideoSolver {
// //   static solve(input) {
// //     const { videos, endpoints, requests, cacheServers } = Parser.parseInput(input);

// //     // Rendit videot sipas madhësisë
// //     const sortedVideos = videos.slice().sort((a, b) => a.size - b.size);

// //     for (const video of sortedVideos) {
// //       // Gjej cilët endpoint-a kërkojnë këtë video
// //       const relevantEndpoints = requests
// //         .filter(r => r.videoId === video.id)
// //         .map(r => endpoints[r.endpointId]);

// //       for (const endpoint of relevantEndpoints) {
// //         // Rendit cache-at sipas latencës më të vogël
// //         const sortedCaches = Object.entries(endpoint.cacheConnections)
// //           .map(([cacheId, latency]) => [Number(cacheId), latency])
// //           .sort((a, b) => a[1] - b[1]);

// //         for (const [cacheId] of sortedCaches) {
// //           if (cacheServers[cacheId].addVideo(video)) {
// //             break;
// //           }
// //         }
// //       }
// //     }

// //     return OutputGenerator.generateOutput(cacheServers);
// //   }
// // }

// // module.exports = GreedySmallestVideoSolver;


// const Parser = require("../Services/parser");
// const OutputGenerator = require("../Services/outputGenerator");

// class GreedySmallestVideoSolver {
//   static solve(input) {
//     const { videos, endpoints, requests, cacheServers } = Parser.parseInput(input);

//     // Gjej videot që kanë kërkesa
//     const requestedVideoIds = new Set(requests.map(r => r.videoId));

//     // Rendit videot nga më e vogla te më e madhja, por vetëm ato që janë kërkuar
//     const sortedVideos = videos
//       .filter(video => requestedVideoIds.has(video.id))
//       .sort((a, b) => a.size - b.size);

//     for (const video of sortedVideos) {
//       for (const endpoint of endpoints) {
//         if (!endpoint.cacheConnections || Object.keys(endpoint.cacheConnections).length === 0) continue;

//         // Gjej cache-at e lidhur me endpoint-in, të renditur nga latency më i vogël
//         const sortedCaches = Object.entries(endpoint.cacheConnections)
//           .map(([id, latency]) => [parseInt(id), latency])
//           .sort((a, b) => a[1] - b[1]);

//         for (const [cacheId] of sortedCaches) {
//           const cache = cacheServers[cacheId];
//           if (!cache.videos.has(video.id) && cache.addVideo(video)) {
//             break; // sapo e ruajmë videon në një cache të afërt, kalojmë te videoja tjetër
//           }
//         }
//       }
//     }

//     const output = OutputGenerator.generateOutput(cacheServers);
//     return {
//       output,
//       endpoints,
//       requests,
//       cacheServers
//     };
//   }
// }

// module.exports = GreedySmallestVideoSolver;


const Parser = require("../Services/parser");
const OutputGenerator = require("../Services/outputGenerator");

class GreedySmallestVideoSolver {
  static solve(input) {
    const { videos, endpoints, requests, cacheServers } = Parser.parseInput(input);

    // Gjej videot që kanë kërkesa
    const requestedVideoIds = new Set(requests.map(r => r.videoId));

    // Rendit videot nga më e vogla te më e madhja, por vetëm ato që janë kërkuar
    const sortedVideos = videos
      .filter(video => requestedVideoIds.has(video.id))
      .sort((a, b) => a.size - b.size);

    for (const video of sortedVideos) {
      for (const endpoint of endpoints) {
        if (!endpoint.cacheConnections || Object.keys(endpoint.cacheConnections).length === 0) continue;

        // Gjej cache-at e lidhur me endpoint-in, të renditur nga latency më i vogël
        const sortedCaches = Object.entries(endpoint.cacheConnections)
          .map(([id, latency]) => [parseInt(id), latency])
          .sort((a, b) => a[1] - b[1]);

        for (const [cacheId] of sortedCaches) {
          const cache = cacheServers[cacheId];
          if (!cache.videos.has(video.id) && cache.addVideo(video)) {
            break; // sapo e ruajmë videon në një cache të afërt, kalojmë te videoja tjetër
          }
        }
      }
    }

    const output = OutputGenerator.generateOutput(cacheServers);
    return {
      output,
      endpoints,
      requests,
      cacheServers
    };
  }
}

module.exports = GreedySmallestVideoSolver;

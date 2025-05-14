function calculateScore(endpoints, requests, cacheServers) {
  let totalTimeSaved = 0;
  let totalRequests = 0;

  for (const request of requests) {
    const endpoint = endpoints[request.endpointId];
    const videoId = request.videoId;

    let bestLatency = endpoint.dataCenterLatency;

    for (const [cacheId, latency] of Object.entries(endpoint.cacheConnections)) {
      const cache = cacheServers[cacheId];
      if (cache.videos.has(videoId)) {
        if (latency < bestLatency) {
          bestLatency = latency;
        }
      }
    }

    const timeSaved = (endpoint.dataCenterLatency - bestLatency) * request.count;
    totalTimeSaved += timeSaved;
    totalRequests += request.count;
  }

  const averageTimeSaved = Math.floor((totalTimeSaved * 1000) / totalRequests);
  return averageTimeSaved;
}

module.exports = calculateScore;

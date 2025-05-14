// Services/validateSolution.js

function validateSolution(output, data) {
  // Implement validation logic based on your problem's rules
  // Example: Ensure the solution doesn't exceed the number of cache servers or violates any constraints
  
  // Assuming output has information about the cache allocation and video assignments
  const { cacheServers } = output;

  // Validation rule example: Ensure no cache server exceeds the allowed video count
  for (const server of cacheServers) {
    if (server.videos.length > data.maxVideosPerCache) {
      console.error(`❌ Cache server ${server.id} exceeds the allowed video count.`);
      return false;
    }
  }

  return true;
}

module.exports = validateSolution;

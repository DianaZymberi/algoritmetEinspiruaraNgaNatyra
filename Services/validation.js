const fs = require("fs");

function validateOutput(filePath, maxCacheId, maxVideoId, videoSizes = {}, cacheCapacity = null) {
    const data = fs.readFileSync(filePath, "utf8").trim().split("\n");

    if (data.length === 0) {
        return { valid: false, error: "Empty file" };
    }

    const cacheServerCount = parseInt(data[0].trim(), 10);
    if (isNaN(cacheServerCount)) {
        return { valid: false, error: "First line must be an integer representing the number of cache servers described." };
    }

    let cacheServers = new Set();
    for (let i = 1; i < data.length; i++) {
        let parts = data[i].trim().split(/\s+/).map(Number);

        if (parts.length < 1) {
            return { valid: false, error: `Invalid format on line ${i + 1}: missing cache server ID` };
        }

        let cacheId = parts[0];
        let videoIds = parts.slice(1);

        if (cacheId < 0 || cacheId >= maxCacheId) {
            return { valid: false, error: `Invalid cache ID ${cacheId} on line ${i + 1}` };
        }

        if (cacheServers.has(cacheId)) {
            return { valid: false, error: `Duplicate entry for cache server ${cacheId} on line ${i + 1}` };
        }
        cacheServers.add(cacheId);

        let uniqueVideos = new Set(videoIds);
        if (uniqueVideos.size !== videoIds.length) {
            return { valid: false, error: `Duplicate video IDs in cache server ${cacheId} on line ${i + 1}` };
        }

        for (let videoId of videoIds) {
            if (videoId < 0 || videoId >= maxVideoId) {
                return { valid: false, error: `Invalid video ID ${videoId} in cache server ${cacheId} on line ${i + 1}` };
            }
        }

        // Check cache capacity if sizes are provided
        if (cacheCapacity !== null && videoSizes) {
            let totalSize = videoIds.reduce((sum, vid) => sum + (videoSizes[vid] || 0), 0);
            if (totalSize > cacheCapacity) {
                return { valid: false, error: `Cache server ${cacheId} exceeds capacity limit on line ${i + 1}` };
            }
        }
    }

    return { valid: true, message: "Output format is valid" };
}

// Export the function for use in other files
module.exports = validateOutput;
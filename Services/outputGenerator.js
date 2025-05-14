class OutputGenerator {
    static generateOutput(cacheServers) {
        const result = [];

        // For each cache server, if there are videos assigned, print the video IDs
        cacheServers.forEach(cache => {
            if (cache.videos.size > 0) {
                const videoIds = [...cache.videos].join(" ");
                result.push(`${cache.id} ${videoIds}`);
            }
        });

        // Return the number of cache servers with videos and their respective assignments
        return `${result.length}\n${result.join("\n")}`;
    }
}


module.exports = OutputGenerator;

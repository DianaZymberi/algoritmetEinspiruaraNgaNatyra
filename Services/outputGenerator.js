class OutputGenerator {
    static generateOutput(cacheServers) {
        const result = [];

        for (const cache of cacheServers) {
            if (cache.videos.size > 0) {
                const videoIds = [...cache.videos].map(video => video.id).join(" ");
                result.push(`${cache.id} ${videoIds}`);
            }
        }

        return `${result.length}\n${result.join("\n")}`;
    }
}

module.exports = OutputGenerator;

class OutputGenerator {
    static generateOutput(cacheServers) {
        const result = [];
        for (const cache of cacheServers) {
            if (cache.videos.size > 0) {
                result.push(`${cache.id} ${[...cache.videos].join(" ")}`);
            }
        }
        return `${result.length}\n${result.join("\n")}`;
    }
}

module.exports = OutputGenerator;
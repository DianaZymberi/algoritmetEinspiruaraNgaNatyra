class CacheServer {
    constructor(id, capacity) {
        this.id = id;
        this.capacity = capacity;
        this.videos = new Set();
        this.usedSpace = 0;
    }

    addVideo(video) {
        if (!this.videos.has(video) && this.usedSpace + video.size <= this.capacity) {
            this.videos.add(video);
            this.usedSpace += video.size;
            return true;
        }
        return false;
    }
}

module.exports = CacheServer;
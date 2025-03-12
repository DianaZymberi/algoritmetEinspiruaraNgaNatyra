class CacheServer {
    constructor(id, capacity) {
        this.id = id;
        this.capacity = capacity;
        this.videos = new Set();
    }

    addVideo(video) {
        if (this.getUsedSpace() + video.size <= this.capacity) {
            this.videos.add(video.id);
            return true;
        }
        return false;
    }

    getUsedSpace() {
        return [...this.videos].reduce((sum, videoId) => sum + videoId.size, 0);
    }
}

module.exports = CacheServer;
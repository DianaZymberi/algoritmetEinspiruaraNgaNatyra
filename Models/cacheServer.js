class CacheServer {
    constructor(id, capacity) {
        this.id = id;
        this.capacity = capacity;
        this.videos = new Set(); // ruajmë vetëm video.id
        this.usedSpace = 0;
    }

    addVideo(video) {
        if (!this.videos.has(video.id) && this.usedSpace + video.size <= this.capacity) {
            this.videos.add(video.id); // ruaj vetëm ID-në
            this.usedSpace += video.size;
            return true;
        }
        return false;
    }

    hasVideo(videoId) {
        return this.videos.has(videoId);
    }

    getRemainingSpace() {
        return this.capacity - this.usedSpace;
    }
}

module.exports = CacheServer;

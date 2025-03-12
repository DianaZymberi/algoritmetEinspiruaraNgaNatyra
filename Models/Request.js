class Request {
    constructor(videoId, endpointId, count) {
        this.videoId = videoId;
        this.endpointId = endpointId;
        this.count = count;
    }
}

module.exports = Request;
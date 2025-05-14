const Video = require("../Models/video");
const Endpoint = require("../Models/endpoint");
const Request = require("../Models/Request");
const CacheServer = require("../Models/cacheServer");

class Parser {
    static parseInput(input) {
        const lines = input.trim().split("\n");
        let index = 0;

        const [V, E, R, C, X] = lines[index++].split(" ").map(Number);

        const videoSizes = lines[index++].trim().split(/\s+/).map(num => Number(num));
        const videos = videoSizes.map((size, id) => new Video(id, size));

        const endpoints = [];
        for (let i = 0; i < E; i++) {
            const [LD, K] = lines[index++].split(" ").map(Number);
            const endpoint = new Endpoint(i, LD);

            for (let j = 0; j < K; j++) {
                const [cacheId, latency] = lines[index++].split(" ").map(Number);
                endpoint.addCacheConnection(cacheId, latency);
            }

            endpoints.push(endpoint);
        }

        const requests = [];
        for (let i = 0; i < R; i++) {
            const [videoId, endpointId, count] = lines[index++].split(" ").map(Number);
            requests.push(new Request(videoId, endpointId, count));
        }

        // Debugging request parsing
        console.log("Parsed requests:", requests);  // This will print the parsed requests to check if it's correct.

        const cacheServers = Array.from({ length: C }, (_, id) => new CacheServer(id, X));

        return { videos, endpoints, requests, cacheServers };
    }
}

module.exports = Parser;

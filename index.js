const fs = require("fs");
const Solver = require("./Services/solver");

const inputFilePath = "kittens.in.txt";

fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading input file:", err);
        return;
    }

    const output = Solver.solve(data);
    console.log(output);
});
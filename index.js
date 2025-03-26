const fs = require("fs");
const Solver = require("./Services/solver");

const inputFilePath = "kittens.in.txt";
const outputFilePath = "output.txt";

fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading input file:", err);
        return;
    }

    // Solve the problem and generate the output
    const output = Solver.solve(data);

    // Write to output file
    fs.writeFile(outputFilePath, output, "utf8", (err) => {
        if (err) {
            console.error("Error writing output file:", err);
        } else {
            console.log(`Output successfully written to ${outputFilePath}`);
        }
    });
});

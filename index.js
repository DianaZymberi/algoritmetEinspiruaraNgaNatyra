// // const fs = require("fs");
// // const Solver = require("./Services/solver");

// // const inputFilePath = "kittens.in.txt";
// // const outputFilePath = "output.txt";

// // fs.readFile(inputFilePath, "utf8", (err, data) => {
// //     if (err) {
// //         console.error("Error reading input file:", err);
// //         return;
// //     }

// //     // Solve the problem and generate the output
// //     const output = Solver.solve(data);

// //     // Write to output file
// //     fs.writeFile(outputFilePath, output, "utf8", (err) => {
// //         if (err) {
// //             console.error("Error writing output file:", err);
// //         } else {
// //             console.log(`Output successfully written to ${outputFilePath}`);
// //         }
// //     });
// // });


// const fs = require("fs");
// const Solver = require("./Services/solver");
// const GreedyRequestSolver = require("./Services/greedyRequestSolver");
// const GreedySmallestVideoSolver = require("./Services/greedySmallestVideoSolver");
// const Parser = require("./Services/parser");
// const calculateScore = require("./Services/solverScore");

// const inputFilePath = "kittens.in.txt";

// fs.readFile(inputFilePath, "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading input file:", err);
//     return;
//   }

//   // Fillon me Solver-in origjinal
//   const output1 = Solver.solve(data);
//   const { endpoints: e1, requests: r1, cacheServers: c1 } = Parser.parseInput(data);
//   const score1 = calculateScore(e1, r1, c1);

//   fs.writeFileSync("output_solver.txt", output1, "utf8");
//   console.log(`✅ Solver score: ${score1}`);

//   // Greedy Request First
//   const output2 = GreedyRequestSolver.solve(data);
//   const { endpoints: e2, requests: r2, cacheServers: c2 } = Parser.parseInput(data);
//   const score2 = calculateScore(e2, r2, c2);

//   fs.writeFileSync("output_greedyRequest.txt", output2, "utf8");
//   console.log(`✅ GreedyRequestSolver score: ${score2}`);

//   // Greedy Smallest Video First
//   const output3 = GreedySmallestVideoSolver.solve(data);
//   const { endpoints: e3, requests: r3, cacheServers: c3 } = Parser.parseInput(data);
//   const score3 = calculateScore(e3, r3, c3);

//   fs.writeFileSync("output_greedySmallest.txt", output3, "utf8");
//   console.log(`✅ GreedySmallestVideoSolver score: ${score3}`);
// });

// const fs = require("fs");
// const Solver = require("./Services/solver");
// const GreedyRequestSolver = require("./Services/greedyRequestSolver");
// const GreedySmallestVideoSolver = require("./Services/greedySmallestVideoSolver");
// const Parser = require("./Services/parser");
// const calculateScore = require("./Services/solverScore");

// const inputFilePath = "kittens.in.txt";

// fs.readFile(inputFilePath, "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading input file:", err);
//     return;
//   }

//   // Solver standard
//   const output1 = Solver.solve(data);
//   const { endpoints: e1, requests: r1, cacheServers: c1 } = Parser.parseInput(data);
//   const score1 = calculateScore(e1, r1, c1);
//   fs.writeFileSync("output_solver.txt", output1, "utf8");
//   console.log(`✅ Solver score: ${score1}`);

//   // Greedy Request Solver (me përmirësim)
//   const result2 = GreedyRequestSolver.solve(data);
//   const score2 = calculateScore(result2.endpoints, result2.requests, result2.cacheServers);
//   fs.writeFileSync("output_greedyRequest.txt", result2.output, "utf8");
//   console.log(`✅ GreedyRequestSolver score: ${score2}`);

//   // Greedy Smallest Video Solver
//   const output3 = GreedySmallestVideoSolver.solve(data);
//   const { endpoints: e3, requests: r3, cacheServers: c3 } = Parser.parseInput(data);
//   const score3 = calculateScore(e3, r3, c3);
//   fs.writeFileSync("output_greedySmallest.txt", output3, "utf8");
//   console.log(`✅ GreedySmallestVideoSolver score: ${score3}`);
// });

const fs = require("fs");
const Solver = require("./Services/solver");
const GreedyRequestSolver = require("./Services/greedyRequestSolver");
const GreedySmallestVideoSolver = require("./Services/greedySmallestVideoSolver");
const Parser = require("./Services/parser");
const calculateScore = require("./Services/solverScore");

const inputFilePath = "kittens.in.txt";

fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading input file:", err);
    return;
  }

  // Solver standard
  const output1 = Solver.solve(data);
  const { endpoints: e1, requests: r1, cacheServers: c1 } = Parser.parseInput(data);
  const score1 = calculateScore(e1, r1, c1);
  fs.writeFileSync("output_solver.txt", output1, "utf8");
  console.log(`✅ Solver score: ${score1}`);

  // Greedy Request Solver
  const result2 = GreedyRequestSolver.solve(data);
  const score2 = calculateScore(result2.endpoints, result2.requests, result2.cacheServers);
  fs.writeFileSync("output_greedyRequest.txt", result2.output, "utf8");
  console.log(`✅ GreedyRequestSolver score: ${score2}`);

  // Greedy Smallest Video Solver (i përmirësuar)
  const result3 = GreedySmallestVideoSolver.solve(data);
  const score3 = calculateScore(result3.endpoints, result3.requests, result3.cacheServers);
  fs.writeFileSync("output_greedySmallest.txt", result3.output, "utf8");
  console.log(`✅ GreedySmallestVideoSolver score: ${score3}`);
});

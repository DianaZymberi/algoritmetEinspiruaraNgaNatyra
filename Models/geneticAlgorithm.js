const fs = require('fs');

// Leximi i inputit nga fajlli
const inputFile = 'kittens.in.txt';
let rawData = fs.readFileSync(inputFile, 'utf-8');

// Parsimi i të dhënave (në varësi të strukturës do e rregullojmë më poshtë)
const data = rawData.trim().split('\n').map(line => line.split(' '));

// Parametrat e Algoritmit Gjenetik
const POPULATION_SIZE = 100;
const MAX_GENERATIONS = 1000;
const MUTATION_RATE = 0.01;

// Funksioni për të krijuar një individ të ri (një zgjidhje)
const createIndividual = () => {
    // Krijimi i një individi me të dhënat nga inputi (për shembull, vlera random)
    return data.map(() => Math.random() > 0.5 ? 1 : 0);
};

// Krijimi i popullatës fillestare
let population = Array.from({ length: POPULATION_SIZE }, createIndividual);

// Funksioni i përshtatshmërisë (fitness function)
const fitness = (individual) => {
    // Llogaritja e përshtatshmërisë së individit
    return individual.reduce((acc, gene) => acc + gene, 0);
};

// Vlerësimi i popullatës
const evaluatePopulation = (population) => {
    return population.map(individual => ({
        individual,
        fitness: fitness(individual)
    })).sort((a, b) => b.fitness - a.fitness);
};

// Funksioni i selektimit (Roulette Wheel Selection)
const selectParents = (population) => {
    const totalFitness = population.reduce((acc, ind) => acc + ind.fitness, 0);
    const pick = Math.random() * totalFitness;
    let current = 0;

    for (const ind of population) {
        current += ind.fitness;
        if (current > pick) {
            return ind.individual;
        }
    }
    return population[0].individual;
};

// Funksioni i crossover
const crossover = (parent1, parent2) => {
    const crossoverPoint = Math.floor(Math.random() * parent1.length);
    const child1 = [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)];
    const child2 = [...parent2.slice(0, crossoverPoint), ...parent1.slice(crossoverPoint)];
    return [child1, child2];
};

// Funksioni i mutacionit
const mutate = (individual) => {
    return individual.map(gene => (Math.random() < MUTATION_RATE ? 1 - gene : gene));
};

// Evolucioni i popullatës
const evolve = () => {
    for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
        const evaluated = evaluatePopulation(population);
        const newPopulation = [];

        while (newPopulation.length < POPULATION_SIZE) {
            const parent1 = selectParents(evaluated);
            const parent2 = selectParents(evaluated);
            const [child1, child2] = crossover(parent1, parent2);

            newPopulation.push(mutate(child1), mutate(child2));
        }

        population = newPopulation.slice(0, POPULATION_SIZE);
        console.log(`Gjenerata ${generation + 1} - Më i miri:`, evaluatePopulation(population)[0]);
    }
};

evolve();

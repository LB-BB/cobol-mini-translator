const fs = require('fs');

// Read input file
const lines = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

// Convert each line to JSON
const output = lines.map(line => ({
  id: parseInt(line.slice(0, 4)),
  name: line.slice(4, 14).trim(),
  salary: parseFloat(line.slice(14))
}));

console.log(JSON.stringify(output, null, 2));

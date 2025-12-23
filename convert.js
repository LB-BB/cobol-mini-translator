const fs = require('fs');

// Organize info from specified file OR input.txt file
const inputFile = process.argv[2] || 'input.txt';
const lines = fs
  .readFileSync(inputFile, 'utf-8')
  .trim()
  .split('\n');

// Fixed-width schema (mirrors COBOL record layout)
const schema = [
  { name: 'id', start: 0, end: 4, type: 'int' },
  { name: 'name', start: 4, end: 14, type: 'string' },
  { name: 'salary', start: 14, end: 21, type: 'float' }
];

// Convert each line to JSON
const output = lines.map(line => ({
  id: parseInt(line.slice(0, 4)),
  name: line.slice(4, 14).trim(),
  salary: parseFloat(line.slice(14))
}));

console.log(JSON.stringify(output, null, 2));

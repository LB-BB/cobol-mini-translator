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

// Helper to convert lines to JSON
function parseLine(line, schema) {
  const record = {};

  schema.forEach(field => {
    let value = line.slice(field.start, field.end);

    if (field.type === 'int') {
      value = parseInt(value, 10);
    } else if (field.type === 'float') {
      value = parseFloat(value);
    } else {
      value = value.trim();
    }

    record[field.name] = value;
  });

  return record;
}

// Convert each line to JSON
const output = lines.map(line => parseLine(line, schema));

console.log(JSON.stringify(output, null, 2));

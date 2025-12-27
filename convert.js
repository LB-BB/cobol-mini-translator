const fs = require('fs');

// Organize info from specified file OR input.txt file
const inputFile = process.argv[2] || 'input.txt';
const lines = fs
  .readFileSync(inputFile, 'utf-8')
  .split('\n')
  .filter(line => line.length > 0);

// Fixed-width schema (mirrors COBOL record layout)
const schema = [
  { name: 'id', start: 0, end: 4, type: 'int' },
  { name: 'name', start: 4, end: 14, type: 'string' },
  { name: 'salary', start: 14, end: 21, type: 'float' }
];

const RECORD_LENGTH = Math.max(...schema.map(f => f.end));

// Validate the expected length of the data
function validateLine(rawLine) {
  const warnings = [];

  if (rawLine.length > RECORD_LENGTH) {
    warnings.push(
      `Record truncated from ${rawLine.length} to ${RECORD_LENGTH} chars`
    );
  }
  if (rawLine.length < RECORD_LENGTH) {
    warnings.push(
      `Record shorter than expected: ${rawLine.length} vs ${RECORD_LENGTH}`
    );
  }

  return warnings;
}

// Helper to convert lines to JSON
function parseLine(line, schema, warnings = []) {
  const record = {};

  schema.forEach(field => {
    let value = line.slice(field.start, field.end);
    value = value.trim();

    if (field.type === 'int') {
      const parsed = parseInt(value, 10);
      if (isNaN(parsed)) {
        warnings.push(`Invalid int for field "${field.name}"`);
        value = null;
      } else {
        value = parsed;
      }
    } else if (field.type === 'float') {
      const parsed = parseFloat(value);
      if (isNaN(parsed)) {
        warnings.push(`Invalid float for field "${field.name}"`);
        value = null;
      } else {
        value = parsed;
      }
    }

    record[field.name] = value;
  });

  return record;
}

// Convert each line to JSON with warnings
const output = lines.map(rawLine => {
  const warnings = validateLine(rawLine); 
  const record = parseLine(rawLine, schema, warnings);

  if (warnings.length > 0) {
    record._warnings = warnings;
  }
  return record;
});

console.log(JSON.stringify(output, null, 2));

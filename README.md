# COBOL Mini Translator

This is an early project demonstrating reading a COBOL-style fixed-width input
file and converting it into JSON.

## How to run

1. Ensure Node.js is installed
2. Run in terminal: `node convert.js`
3. Output will be printed to the console

---

## Testing Warnings and Edge Cases

You can test different types of input lines to see how the parser handles errors and normalization. For example:

0001John      2500.50      # Correct line
0002Alice     3200.00EXTRA # Truncated warning
0003Eve       2700         # Padded warning
ABCDJane      2800.00       # Invalid int for ID
0005Mike      XYZ          # Invalid float for salary

Each line triggers specific warnings without breaking the rest of the data:

- Truncated lines  
- Padded lines  
- Invalid integers  
- Invalid floats  

The output will include these warnings under `_warnings` in the JSON.
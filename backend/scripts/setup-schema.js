const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../prisma/schema.prisma');

// Read the current schema
let schema = fs.readFileSync(schemaPath, 'utf-8');

// Get database provider from environment variable
const provider = process.env.DATABASE_PROVIDER || 'sqlite';

// Replace the provider
if (provider === 'postgresql') {
  schema = schema.replace(
    'provider = "sqlite"',
    'provider = "postgresql"'
  );
}

// Write the updated schema back
fs.writeFileSync(schemaPath, schema);

console.log(`Schema updated for ${provider} provider`); 
// Load environment variables FIRST before importing db
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local from the web-app root directory
dotenv.config({ path: join(__dirname, '..', '..', '.env.local') });

// Now import db after environment is configured
const { initDatabase } = await import('../lib/db.js');

initDatabase()
    .then(() => {
        console.log('Database initialized successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Database initialization failed', error);
        process.exit(1);
    });
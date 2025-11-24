import { initDatabase } from '../lib/db/index.js';

initDatabase()
    .then(() => {
        console.log('Database initialized successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Database initialization failed', error);
        process.exit(1);
    });
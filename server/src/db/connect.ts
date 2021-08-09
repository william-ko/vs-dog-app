import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export default new Pool({
    max: 20,
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    idleTimeoutMillis: 30000
});
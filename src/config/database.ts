// src/config/database.ts
import { Pool } from 'pg';

const pool = new Pool({
  host: 'aws-0-sa-east-1.pooler.supabase.com', // 
  user: 'postgres.pvagqcbkdpysuwnzxwwi',
  password: 'Cadu97754?@',
  database: 'postgres',
  port: 6543, // geralmente é 5432 para PostgreSQL
});

export default pool;

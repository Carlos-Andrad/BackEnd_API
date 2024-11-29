// src/config/database.ts
import { Pool } from 'pg';

const pool = new Pool({
  host: 'postgresql://postgres.pvagqcbkdpysuwnzxwwi:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres', // 
  user: 'postgres.pvagqcbkdpysuwnzxwwi',
  password: 'Cadu97754?@',
  database: 'postgres',
  port: 6543, // geralmente é 5432 para PostgreSQL
});

export default pool;

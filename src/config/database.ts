// src/config/database.ts
import { Pool } from 'pg';

const pool = new Pool({
  host: 'aws-0-us-west-1.pooler.supabase.com', // 
  user: 'postgres.yuifmpwitqkgtxkyeuvc',
  password: '960550076Wag$',
  database: 'postgres',
  port: 6543, // geralmente é 5432 para PostgreSQL
});

export default pool;

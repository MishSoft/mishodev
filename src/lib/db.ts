import 'server-only'; // ეს ხაზი დაბლოკავს ფაილის კლიენტზე მოხვედრას
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing in environment variables');
}

const sql = neon(process.env.DATABASE_URL);

export default sql;

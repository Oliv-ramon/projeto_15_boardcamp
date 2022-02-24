import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connection = new Pool(process.env.DATABASE_URL);
export default connection;
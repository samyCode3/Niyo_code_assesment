import knex, { Knex } from "knex";

import { config } from "dotenv";
import logger from "./index";

config();

// Define the configuration object
const configuration: Knex = knex({
  client: "mysql",
  connection: { 
    host: "localhost", 
    user: process.env.MYSQL_USER,   
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,  
    port: Number(process.env.MYSQL_PORT)
  }, 
  migrations: { 
    directory: "./database/migrations", 
  },
}); 


const query = configuration.raw("SELECT 1+1 as result"); 
query
  .then((result: any) => {
    console.log("Database connection successful:");
  })
  .catch((error: any) => {
    console.error(`Unable to connect to database` +  error); 
  }) 


export default configuration;

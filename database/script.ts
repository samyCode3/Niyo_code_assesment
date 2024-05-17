import fs from "fs";
import mysql, { Connection as MySqlConnection } from 'mysql';
import { config } from 'dotenv';

config();

export class Connection {
    private db: MySqlConnection;

    constructor() {
        this.db = mysql.createConnection({ 
            host: "localhost", 
            user: process.env.MYSQL_USER,   
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: process.env.MYSQL_DATABASE,  
            port: Number(process.env.MYSQL_PORT)
        });
    }
    public  connect(): MySqlConnection {
        const connection = new Connection();
        connection.db.connect((err) => {
            if (err) {
                console.error("Error connecting to MySQL:", err);
                return;
            }
            console.log("Connected to MySQL successfully");
        });
        return connection.db;
    }
 
    public async runLatestMigration() {
        const migrationFiles = fs.readdirSync('./database/migrations').sort();

        for (const fileName of migrationFiles) {
            const migrationSql = fs.readFileSync(`./database/migrations/${fileName}`, 'utf8');
            try {
                await this.queryAsync(migrationSql);
                console.log(`Migration ${fileName} executed successfully.`);
            } catch (error) {
                console.error(`Error executing migration ${fileName}: ${error}`);
            }
        }
    }

    private queryAsync(sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.query(sql, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

const connectDb = new Connection();
connectDb.runLatestMigration();
connectDb.connect()

 
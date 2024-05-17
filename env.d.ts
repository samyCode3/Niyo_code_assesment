declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_Env: string;
      MYSQL_ROOT_PASSWORD: string;
      MYSQL_DATABASE: string;
    }
  }
}

export {}

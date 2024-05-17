
import {injectable } from "inversify";
import { createClient } from "redis";

const client = createClient({
   url : process.env.REDIS_URL
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect().then(async (client) => {
  let pingPong = await client.PING();
  console.log(
    `connected redis client.... and return a message ${pingPong}` 
  );
});



@injectable()
export class RedisProperties {
  public async setKey(keys: string, property: any) {
    const key = client.set(keys, property)
    return key;
  }

  public async getkey(keys: string) {
     const key = client.get(keys)
     return key
  }
}


export default client
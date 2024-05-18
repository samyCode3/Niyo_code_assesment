import { inject, injectable } from 'inversify';
import { Knex } from 'knex';
import  {MODULE_TOKENS} from '../../core/ioc/token'
import { ulid } from 'ulid';
import configuration from "../../core/config/mysql";

@injectable()
export class Repository<T = Record<string, any>> {
  constructor(@inject(MODULE_TOKENS.KnexClient) public readonly kx: typeof configuration) {}

  public id() {  
    return ulid();
  }  
 
  /**
   * creates a knex query object for a specified table
   * @param table table name
   * @param excluded fields which should be excluded from the query result to be returned
   * @returns
   */


  public queryBuilder(table: string, excluded?: string[]) {
    return this.kx<T>(table).queryContext({ excluded });
  }

  public raw(sql: string, bindings?: Record<string, any> | any[]) {
    return this.kx.raw(sql, bindings);
  }

  public createBuilder(table: string, excluded?: string[]) {
    return () => this.queryBuilder(table, excluded);
  }
}




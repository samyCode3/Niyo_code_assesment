import { MODULE_TOKENS, SERVICE_MODULE } from "../../core/ioc/token";
import { inject, injectable } from "inversify";
import { User } from "../auth/entity/auth.entity";
import { Repository } from "../../data/repository/repository";

@injectable()
export class UserService {
  private readonly db = this.repo.createBuilder("users");
  constructor(
    @inject(MODULE_TOKENS.Repository) private readonly repo: Repository<User>
  ) {}


  public async userById(id: string): Promise<User | any> {
    const user = await this.db().where({ id }).first("*");
    return user;
  }

  public async getByUsername(username: string) {
    const user = await this.db().where({ username }).first("*");
    return user;
  }
  public async getByEmail(email: string) {
    const user = await this.db().where({ email }).first("*");
    return user;
  }
  public async getByPhone(phone_number: string) {
    const user = await this.db().where({ phone_number }).first("*");
    return user;
  }

  public async update(data: any, id: string) {
    return await this.db()
      .update({ ...data })
      .where({ id });
  }

  
}

import { inject, injectable } from "inversify";
import { GENERAL_FUNCTIONS, MODULE_TOKENS, SERVICE_MODULE } from "../../core/ioc/token";
import { RedisProperties } from "../../core/config/redis.config";
import { GeneralFunctions } from "../../core/utils/functions";
import { Repository } from "../../data/repository/repository";
import { Login, User } from "./entity/auth.entity";
import { UserService } from "../user/user.service";
import { ApplicationError } from "../../core/module/internal/error/error";
import { StatusCodes } from "http-status-codes";
import { AccessToken } from "../../core/module/jwt-util";
import { verifyHashToken } from "../../core/module/bcyptjs-util";



@injectable()
export class AuthService {
  private readonly db = this.repo.createBuilder("users");
  constructor(
    @inject(MODULE_TOKENS.redis) private readonly cache: RedisProperties,
    @inject(GENERAL_FUNCTIONS.Gen) private readonly gen: GeneralFunctions,
    @inject(MODULE_TOKENS.Repository) private readonly repo: Repository<User>,
    @inject(SERVICE_MODULE.User_Service) private readonly user: UserService
  ) {}

  public async users(): Promise<User[]> {
    return this.db().select("*");
  }

  public async createUser(input: User): Promise<User | any> {
    let { email, phone_number, username,password } = input;

    let emailUsers = await this.user.getByEmail(email);
    if (emailUsers) {
      throw new ApplicationError(StatusCodes.CONFLICT, "Email has been used");
    }

    // Check if phone number exists
    let phoneUsers = await this.user.getByPhone(phone_number);
    if (phoneUsers) {
      throw new ApplicationError(
        StatusCodes.CONFLICT,
        "Phone number has been used"
      );
    }

    // Check if username exists
    let usernameUsers = await this.user.getByUsername(username);
    if (usernameUsers) {
      throw new ApplicationError(
        StatusCodes.CONFLICT,
        "Username has been used"
      );
    }
    let otp = await this.gen.otpGen(4);
    let insertedUser = await this.db()
      .insert({ ...input })
      .then(async (result) => {
        const insertedId = result[0];
        let newUser = await this.db()
          .select("*")
          .where("id", insertedId)
          .first();
        let metadata = { id: newUser.id, otp };
        await this.cache.setKey(
          "user_registration",
          JSON.stringify({
            metadata,
            EX: 300,
          })
        );
        return newUser;
      });

    return { insertedUser, otp };
  }

  public async verifyOtp(input: any): Promise<any> {
    let user;
    const user_code = await this.cache.getkey("user_registration");
    let token;
    let existing_user = JSON.parse(user_code);
    if (existing_user) {
      let id = existing_user.metadata.id;
      user = await this.db().first("*").where({ id });
      if (user.email_verified == true) {
        throw new ApplicationError(
          StatusCodes.BAD_REQUEST,
          "Email has already been verified"
        );
      }

      if (existing_user.metadata.otp !== Number(input.code)) {
        throw new ApplicationError(StatusCodes.BAD_REQUEST, "invalid otp");
      } else {
        if (user) {
          await this.user.update({ email_verified: true }, user.id);
        }
      }
    } else {
      throw new ApplicationError(
        StatusCodes.FORBIDDEN,
        "Unable to process this request"
      );
    }
    let user_info = {
      id: user.id,
      phone_number: user.phone_number,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    return { user_info };
  }

  public async login(data: Login) {
    let { email, password } = data;
    let user = await this.user.getByEmail(email);

    if (!user) {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        "Email or password is not valid"
      );
    }
    let isValid = await verifyHashToken(password, user.password);
    if (!isValid) {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        "Email or password is not valid"
      );
    }
    let user_info = {
      id: user.id,
      phone_number: user.phone_number,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    let token = AccessToken(user.id);
    //  console.log(token)
    return { user_info, token };
  }
}


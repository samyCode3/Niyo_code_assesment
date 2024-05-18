import {
  controller,
  httpGet,
  request,
  response,
  requestParam,
  httpPost,
} from "inversify-express-utils";
import { AuthService } from "../../../logic/auth/auth.service";
import { inject } from "inversify";
import { SERVICE_MODULE } from "../../../core/ioc/token";
import { Request } from "express";
import {
  validateLoginField,
  validateOtpField,
  validateRegisterField,
} from "../../../core/utils/validation/auth-validate";
import { hashing } from "../../../core/module/bcyptjs-util";
@controller("/auth")
export default class AuthController {
  constructor(
    @inject(SERVICE_MODULE.Auth_Service) private readonly service: AuthService
  ) {}
  @httpPost("/register")
  public async createUser(@request() req: Request, @response() res) {
    let user_input = await validateRegisterField(req.body);
    user_input.password =  hashing(user_input.password)
    return await this.service.createUser(user_input);
  }
  @httpPost("/verify")
  public async verifyUser(@request() req: Request, @response() res) {
    let input = await validateOtpField(req.body);
    return await this.service.verifyOtp(input);
  }

  @httpPost('/login')
  public async login(@request() req: Request, @response() res) {
       let input = await validateLoginField(req.body)
       return await this.service.login(input)
   }
  // @httpGet("/")
  // public async getUser() {
  //   return this.service.users();
  // }
  // @httpGet("/:id")
  // public async getUserbyId(
  //   @requestParam("id") id: string,
  //   @response() res: Response
  // ) {
  //   return await this.service.userById(id);
  // }
}

import { MODULE_TOKENS, SERVICE_MODULE } from "@core/ioc/token";
import { deserializeUser } from "@core/middleware/auth.middleware";
import { UserService } from "@logic/user/user.service";
import { inject } from "inversify";
import { controller, httpGet, request } from "inversify-express-utils";


@controller('/user') 
export class  UserController {
    constructor(@inject(SERVICE_MODULE.User_Service) private readonly user: UserService) {}

    @httpGet('/', deserializeUser)
    public async getUser(@request() req: Request) {
    const claim = <Record<string, any>>(req as any).user;
    const user = await this.user.userById(claim.id)
    return user
    }

    

}
import { MODULE_TOKENS, SERVICE_MODULE } from "@core/ioc/token";
import { deserializeUser } from "@core/middleware/auth.middleware";
import { validateUpdate } from "@core/utils/validation/auth-validate";
import { UserService } from "@logic/user/user.service";
import { StatusCodes } from "http-status-codes";

import { inject } from "inversify";
import { controller, httpGet, httpPatch, httpPost, httpPut, request, response } from "inversify-express-utils";


@controller('/user') 
export class  UserController {
    constructor(@inject(SERVICE_MODULE.User_Service) private readonly user: UserService) {}

    @httpGet('/', deserializeUser)
    public async getUser(@request() req: Request) {
    const claim = <Record<string, any>>(req as any).user;
    const user = await this.user.userById(claim.id)
    return user
    }

    @httpPut('/update-user', deserializeUser)
    public async updateuser(@request() req: Request, @response() res) {
        const claim = <Record<string, any>>(req as any).user;
        const update = <Record<string, any>>(req as any).body;
        const update_user = await validateUpdate( update)
         await this.user.update(update_user, claim.id)
        return res.status(StatusCodes.OK).json({ message : "Update was successfull"})
    }

    
}
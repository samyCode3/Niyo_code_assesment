import { Container } from "inversify";
import { Repository } from "../../data/repository/repository";
import { AuthService } from "../../logic/auth/auth.service";
import "../../web/controllers"
import {
  GENERAL_FUNCTIONS,
  MODULE_TOKENS,
  SERVICE_MODULE,
} from "../../core/ioc/token";
import { Knex } from "knex";
import configuration from "./mysql";
import { RedisProperties } from "./redis.config";
import { GeneralFunctions } from "../../core/utils/functions";
import { UserService } from "../../logic/user/user.service";
import { TaskService } from "../../logic/task_manager/task.service";


const container = new Container();
container.bind<GeneralFunctions>(GENERAL_FUNCTIONS.Gen).to(GeneralFunctions);
container.bind<Knex>(MODULE_TOKENS.KnexClient).toConstantValue(configuration);
container.bind<RedisProperties>(MODULE_TOKENS.redis).to(RedisProperties);
container.bind<Repository>(MODULE_TOKENS.Repository).to(Repository);
container.bind<AuthService>(SERVICE_MODULE.Auth_Service).to(AuthService);
container.bind<UserService>(SERVICE_MODULE.User_Service).to(UserService)
container.bind<TaskService>(SERVICE_MODULE.Task_Manager).to(TaskService)
export default container;

import { SERVICE_MODULE } from "@core/ioc/token";
import { deserializeUser } from "@core/middleware/auth.middleware";
import { ApplicationError } from "@core/module/internal/error/error";
import {
  validateParamsId,
  validateTaskField,
  validateUpdateTaskField,
} from "@core/utils/validation/task-validate";
import { TaskService } from "@logic/task_manager/task.service";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  httpPut,
  request,
  requestParam,
  response,
} from "inversify-express-utils";

@controller("/task")
export class TaskManagerController {
  constructor(
    @inject(SERVICE_MODULE.Task_Manager) private readonly task_: TaskService
  ) {}

  @httpPost("/create-task", deserializeUser)
  public async createTask(@request() req: Request, @response() res) {
    const claim = <Record<string, any>>(req as any).user;
    let input = <Record<string, any>>(req as any).body;
    let task = await validateTaskField(input);
    return await this.task_.create_task({ ...task, user_id: claim.id });
  }

  @httpGet("/user-task", deserializeUser)
  public async getUserTasks(@request() req: Request, @response() res) {
    const claim = <Record<string, any>>(req as any).user;
    return await this.task_.getByUserId(claim.id);
  }

  @httpGet("/:id", deserializeUser)
  public async getUserTaskById(@requestParam("id") id: string) {
    const input = await validateParamsId({ id });
    const task = await this.task_.taskById(input.id);
    if (!task) {
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        "The task you are trying to get is unavailable"
      );
    }
    return task;
  }

  @httpPut("/update-task", deserializeUser)
  public async updateTask(
    @request() req: Request,
    @response() res: Response | any
  ) {
    const claim = <Record<string, any>>(req as any).user;
    let input = <Record<string, any>>(req as any).body;
    let update = await validateUpdateTaskField(input);

    let {
      id,
      task_name,
      task_description,
      priority,
      start_date,
      end_date,
      status,
    } = input;

    if (
      !(
        task_name ||
        task_description ||
        priority ||
        status ||
        start_date ||
        end_date
      )
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No update made on task" });
    }

    if (task_name) {
      let checkTaskName = await this.task_.getByTaskName(task_name);
      if (checkTaskName) {
        throw new ApplicationError(
          StatusCodes.CONFLICT,
          "Task name already existed. Please try another name"
        );
      }
    }

    let updatedTask = await this.task_.update(
      { task_name, task_description, priority, status },
      id
    );

    if (start_date || end_date) {
      let tracking = await this.task_.updateTracker(
        { start_date, end_date },
        id
      );
      return res
        .status(StatusCodes.OK)
        .json({ message: "Update was made", updatedTask, tracking });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Task updated successfully", updatedTask });
  }

  @httpDelete("/delete-task/:id", deserializeUser)
  public async deleteTask(
    @request() req: Request,
    @response() res: Response | any,
    @requestParam("id") id: string
  ) {
    const claim = <Record<string, any>>(req as any).user;
    const input = await validateParamsId({ id });
    
    const task = await this.task_.taskById(input.id);
    if (!task) {
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        "Unable to perform this task"
      );
    }

    if (claim.id !== task.user_id) {
      throw new ApplicationError(
        StatusCodes.UNAUTHORIZED,
        "You are not permitted to perform this request"
      );
    }

    await this.task_.deleteTask(input.id);
    return res.status(StatusCodes.OK).json({ message: "This task was deleted"});
  }
}

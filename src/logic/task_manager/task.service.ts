import { MODULE_TOKENS, SERVICE_MODULE } from "@core/ioc/token";
import { inject, injectable } from "inversify";
import { User } from "../auth/entity/auth.entity";
import { Repository } from "@data/repository/repository";
import { TaskManager } from "./entity/task_manager.entity";
import { SubTaskManager } from "./entity/sub_task.entity";
import { ApplicationError } from "@core/module/internal/error/error";
import { StatusCodes } from "http-status-codes";
import { validateEndDate, validateStartDate } from "@core/utils/data-validation";

@injectable()
export class TaskService {
  private readonly db = this.repo.createBuilder("TaskManager");
  private readonly sub_tasks = this.sub_task.createBuilder("task_tracker")
  constructor(
    @inject(MODULE_TOKENS.Repository)
    private readonly repo: Repository<TaskManager>,
    @inject(MODULE_TOKENS.Repository) 
    private readonly sub_task: Repository<SubTaskManager>
  ) {}

  public async create_task(data: TaskManager): Promise<TaskManager> {

    let {user_id, task_description, task_name, priority, start_date, end_date} = data
    let existing_taskName = await this.getByTaskName(task_name)
    if(existing_taskName) {
        throw new ApplicationError(StatusCodes.BAD_REQUEST, 'Task name already exist')
    } 
    if (!validateStartDate(start_date)) {
      throw new ApplicationError(StatusCodes.BAD_REQUEST, 'Start date should not be more than the current date')
  }
  
  if (!validateEndDate(end_date)) {
      throw new ApplicationError(StatusCodes.BAD_REQUEST, 'End date should not be less than the current date and not exceed two years from the current date')
  }
    let check_title = await this.db()
      .insert({ user_id, task_description, task_name, priority })
      .then(async (result) => {
        const insertedId = result[0];
        let task = await this.db().where("id", insertedId).first("*");
        console.log(task)
         await this.sub_tasks().insert({end_date: data.end_date, start_date: data.start_date, task_manager_id: task.id})
        return task;
      });


      return check_title
  }

  public async taskById(id: string): Promise<TaskManager> {
    return await this.db().where({ id }).first("*");
  }
  

  public async getByTaskName(task_name: string) {
    return await this.db().where({ task_name }).first("*");
  }
  public async getByUserId(user_id: string) {
    return await this.db()
    .where({ user_id })
    .leftJoin('task_tracker', 'TaskManager.id', '=', 'task_tracker.task_manager_id')
    .select(
      'TaskManager.id as task_id',
      'TaskManager.task_name',
      'TaskManager.task_description',
      'TaskManager.status as task_status',
      'TaskManager.priority',
      'TaskManager.createdAt as task_created_at',
      'TaskManager.updatedAt as task_updated_at',
      'task_tracker.id as tracker_id',
      'task_tracker.start_date',
      'task_tracker.end_date',
      'task_tracker.createdAt as tracker_created_at',
      'task_tracker.updatedAt as tracker_updated_at'
    );
    
  }
  public async getByStatus(status: string) {
    return await this.db().where({ status }).first("*");
    
  }

//   public async search(data: TaskManager): Promise<TaskManager> {
   
//   }
  public async update(data: any, id: string) {
    return await this.db()
      .update({ ...data })
      .where({ id });
  }
  public async updateTracker(data: any, task_manager_id : string) {
    return await this.sub_tasks()
      .update({ ...data })
      .where({ task_manager_id  });
  }
  public async deleteTask (id: string) {
    return await this.db().delete().where({id})
  }
}

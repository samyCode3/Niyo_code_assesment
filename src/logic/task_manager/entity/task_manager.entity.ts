import PartialInstantiable from "../../../core/utils/partial-instant";


export class BaseEntity<T> extends PartialInstantiable<T> {
    id: string;
    created_at: Date;
    updated_at: Date;
  }
  
export class TaskManager extends BaseEntity<TaskManager> {
     task_name: string;
     user_id: string;
     task_description: string;
     priority: string;
     status?: string
     task_manager_id: string;
     start_date: Date
     end_date: Date 
}
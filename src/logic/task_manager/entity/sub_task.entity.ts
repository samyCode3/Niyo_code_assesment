import PartialInstantiable from "@core/utils/partial-instant";

export class BaseEntity<T> extends PartialInstantiable<T> {
    id: string;
    created_at: Date;
    updated_at: Date;
  }
  
export class SubTaskManager extends BaseEntity<SubTaskManager> {
    task_manager_id: string;
    start_date: Date
    end_date: Date 
}
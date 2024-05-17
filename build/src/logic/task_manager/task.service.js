"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const token_1 = require("../../core/ioc/token");
const inversify_1 = require("inversify");
const repository_1 = require("../../data/repository/repository");
const error_1 = require("../../core/module/internal/error/error");
const http_status_codes_1 = require("http-status-codes");
const date_validation_1 = require("../../core/utils/date-validation");
let TaskService = class TaskService {
    constructor(repo, sub_task) {
        this.repo = repo;
        this.sub_task = sub_task;
        this.db = this.repo.createBuilder("TaskManager");
        this.sub_tasks = this.sub_task.createBuilder("task_tracker");
    }
    create_task(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { user_id, task_description, task_name, priority, start_date, end_date } = data;
            let existing_taskName = yield this.getByTaskName(task_name);
            if (existing_taskName) {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Task name already exist');
            }
            if (!(0, date_validation_1.validateStartDate)(start_date)) {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Start date should not be more than the current date');
            }
            if (!(0, date_validation_1.validateEndDate)(end_date)) {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'End date should not be less than the current date and not exceed two years from the current date');
            }
            let check_title = yield this.db()
                .insert({ user_id, task_description, task_name, priority })
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                const insertedId = result[0];
                let task = yield this.db().where("id", insertedId).first("*");
                console.log(task);
                yield this.sub_tasks().insert({ end_date: data.end_date, start_date: data.start_date, task_manager_id: task.id });
                return task;
            }));
            return check_title;
        });
    }
    taskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db().where({ id }).first("*");
        });
    }
    getByTaskName(task_name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db().where({ task_name }).first("*");
        });
    }
    getByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db()
                .where({ user_id })
                .leftJoin('task_tracker', 'TaskManager.id', '=', 'task_tracker.task_manager_id')
                .select('TaskManager.id as task_id', 'TaskManager.task_name', 'TaskManager.task_description', 'TaskManager.status as task_status', 'TaskManager.priority', 'TaskManager.createdAt as task_created_at', 'TaskManager.updatedAt as task_updated_at', 'task_tracker.id as tracker_id', 'task_tracker.start_date', 'task_tracker.end_date', 'task_tracker.createdAt as tracker_created_at', 'task_tracker.updatedAt as tracker_updated_at');
        });
    }
    getByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db().where({ status }).first("*");
        });
    }
    //   public async search(data: TaskManager): Promise<TaskManager> {
    //   }
    update(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db()
                .update(Object.assign({}, data))
                .where({ id });
        });
    }
    updateTracker(data, task_manager_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sub_tasks()
                .update(Object.assign({}, data))
                .where({ task_manager_id });
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db().delete().where({ id });
        });
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(token_1.MODULE_TOKENS.Repository)),
    __param(1, (0, inversify_1.inject)(token_1.MODULE_TOKENS.Repository)),
    __metadata("design:paramtypes", [repository_1.Repository,
        repository_1.Repository])
], TaskService);

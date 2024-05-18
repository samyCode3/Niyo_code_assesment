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
exports.TaskManagerController = void 0;
const token_1 = require("../../../core/ioc/token");
const auth_middleware_1 = require("../../../core/middleware/auth.middleware");
const error_1 = require("../../../core/module/internal/error/error");
const task_validate_1 = require("../../../core/utils/validation/task-validate");
const task_service_1 = require("../../../logic/task_manager/task.service");
const http_status_codes_1 = require("http-status-codes");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
let TaskManagerController = class TaskManagerController {
    constructor(task_) {
        this.task_ = task_;
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const claim = req.user;
            let input = req.body;
            let task = yield (0, task_validate_1.validateTaskField)(input);
            return yield this.task_.create_task(Object.assign(Object.assign({}, task), { user_id: claim.id }));
        });
    }
    getUserTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const claim = req.user;
            return yield this.task_.getByUserId(claim.id);
        });
    }
    getUserTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = yield (0, task_validate_1.validateParamsId)({ id });
            const task = yield this.task_.taskById(input.id);
            if (!task) {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.NOT_FOUND, "The task you are trying to get is unavailable");
            }
            return task;
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const claim = req.user;
            let input = req.body;
            let update = yield (0, task_validate_1.validateUpdateTaskField)(input);
            let { id, task_name, task_description, priority, start_date, end_date, status, } = input;
            if (!(task_name ||
                task_description ||
                priority ||
                status ||
                start_date ||
                end_date)) {
                return res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json({ message: "No update made on task" });
            }
            if (task_name) {
                let checkTaskName = yield this.task_.getByTaskName(task_name);
                if (checkTaskName) {
                    throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.CONFLICT, "Task name already existed. Please try another name");
                }
            }
            let updatedTask = yield this.task_.update({ task_name, task_description, priority, status }, id);
            if (start_date || end_date) {
                let tracking = yield this.task_.updateTracker({ start_date, end_date }, id);
                return res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .json({ message: "Update was made", updatedTask, tracking });
            }
            return res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: "Task updated successfully", updatedTask });
        });
    }
    deleteTask(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const claim = req.user;
            const input = yield (0, task_validate_1.validateParamsId)({ id });
            const task = yield this.task_.taskById(input.id);
            if (!task) {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Unable to perform this task");
            }
            if (claim.id !== task.user_id) {
                throw new error_1.ApplicationError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not permitted to perform this request");
            }
            yield this.task_.deleteTask(input.id);
            return res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: "This task was deleted" });
        });
    }
    markAsCompleted(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const claim = req.body;
            const input = yield (0, task_validate_1.validateParamsId)({ id });
            const status = yield (0, task_validate_1.validateMarkAsCompleted)(claim);
            yield this.task_.update(status, input.id);
            return res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: "Update was successfull" });
        });
    }
};
exports.TaskManagerController = TaskManagerController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/create-task", auth_middleware_1.deserializeUser),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], TaskManagerController.prototype, "createTask", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/user-task", auth_middleware_1.deserializeUser),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], TaskManagerController.prototype, "getUserTasks", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id", auth_middleware_1.deserializeUser),
    __param(0, (0, inversify_express_utils_1.requestParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskManagerController.prototype, "getUserTaskById", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/update-task", auth_middleware_1.deserializeUser),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], TaskManagerController.prototype, "updateTask", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/delete-task/:id", auth_middleware_1.deserializeUser),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __param(2, (0, inversify_express_utils_1.requestParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object, String]),
    __metadata("design:returntype", Promise)
], TaskManagerController.prototype, "deleteTask", null);
__decorate([
    (0, inversify_express_utils_1.httpPatch)("/completed-task/:id", auth_middleware_1.deserializeUser),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __param(2, (0, inversify_express_utils_1.requestParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object, String]),
    __metadata("design:returntype", Promise)
], TaskManagerController.prototype, "markAsCompleted", null);
exports.TaskManagerController = TaskManagerController = __decorate([
    (0, inversify_express_utils_1.controller)("/task"),
    __param(0, (0, inversify_1.inject)(token_1.SERVICE_MODULE.Task_Manager)),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskManagerController);

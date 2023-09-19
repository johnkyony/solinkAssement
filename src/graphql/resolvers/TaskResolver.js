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
exports.TaskResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Task_1 = require("../../entities/Task");
const User_1 = require("../../entities/User");
const typeorm_1 = require("typeorm");
let TaskResolver = class TaskResolver {
    getTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskRespository = (0, typeorm_1.getRepository)(Task_1.Task);
                const task = taskRespository.findOne(id);
                if (!task) {
                    throw new Error(`Task with ID ${id} not found`);
                }
                return task;
            }
            catch (error) {
                throw new Error(`Error retrieving task: ${error.message}`);
            }
        });
    }
    createTask(title, description, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the user by ID to associate the task with
                const userRepository = (0, typeorm_1.getRepository)(User_1.User);
                const user = yield userRepository.findOne(userId);
                if (!user) {
                    throw new Error(`User with ID ${userId} not found.`);
                }
                // Create a new task using TypeORM
                const taskRespository = (0, typeorm_1.getRepository)(Task_1.Task);
                const task = taskRespository.create({
                    title,
                    description,
                    user,
                });
                yield taskRespository.save(task);
                return task;
            }
            catch (error) {
                throw new Error(`Error creating task: ${error.message}`);
            }
        });
    }
};
exports.TaskResolver = TaskResolver;
__decorate([
    (0, type_graphql_1.Query)(() => Task_1.Task),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.Task),
    __param(0, (0, type_graphql_1.Arg)('title')),
    __param(1, (0, type_graphql_1.Arg)('description')),
    __param(2, (0, type_graphql_1.Arg)('userId', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
exports.TaskResolver = TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TaskResolver);

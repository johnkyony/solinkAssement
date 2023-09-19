"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./graphql/resolvers/UserResolver");
const TaskResolver_1 = require("./graphql/resolvers/TaskResolver");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [UserResolver_1.UserResolver, TaskResolver_1.TaskResolver]
        });
        const server = new apollo_server_express_1.ApolloServer({ schema });
        server.applyMiddleware({ app });
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}/graphql`);
        });
    });
}
bootstrap().catch((error) => {
    console.error(error);
});

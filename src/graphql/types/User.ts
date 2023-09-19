import { ObjectType  , Field , Int} from "type-graphql";
import {Task} from '../../entities/Task';

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field(() => [Task])
    tasks: Task[]
}
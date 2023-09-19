import { ObjectType , Field , Int } from "type-graphql";
import {User} from '../../entities/User';


@ObjectType()
export class Task {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field(() => User)
    user: User;
}
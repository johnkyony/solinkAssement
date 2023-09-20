import {Resolver , Query , Mutation , Arg , Int} from 'type-graphql'
import {Task} from '../../entities/Task'
import {User} from '../../entities/User';
import { getRepository  } from 'typeorm';

@Resolver()
export class TaskResolver {
    @Query(()=> Task)
    async getTask(@Arg('id' , () => Int) id){
        try {
            const taskRespository = getRepository(Task)
            const task = taskRespository.findOne(id);

            if(!task){
                throw new Error(`Task with ID ${id} not found`)
            }

            return task 
            
        } catch (error) {
            throw new Error(`Error retrieving task: ${error.message}`)
            
        }

      
       
    }
    @Query (() => [Task])
    async fetchTasks() : Promise <Task[]>{
      const taskRespository = getRepository(Task)
      return await taskRespository.find()
    }

    @Mutation (() => Task)
    async updateTask(
      @Arg('id') id ,
      @Arg('title' , {nullable: true}) title: string | null ,
      @Arg('description', {nullable: true}) description:string | null
    ): Promise<Task | null >{
      
      const taskRespository = getRepository(Task)
      const task = await taskRespository.findOne(id)

      if(!task){
        return null ;
      }

      if(title !== null){
        task.title = title
      }
      if(description !== null){
        task.description = description
      }
      await taskRespository.save(task)
      return task
    }

    @Mutation(() => Boolean)
    async deleteTask(@Arg('id') id) : Promise<boolean>{
      const taskRespository = getRepository(Task)
      try {
        const task = await taskRespository.findOne(id)
        if(!task){
          return false 
        }
        await taskRespository.remove(task)
        
      } catch (error) {
        console.error('Error deleting task:' , error)
        return false
      }
    }

    @Mutation(() => Task)
    async markTaskAsComplete(@Arg('id') id): Promise<Task | null>{
      const taskRespository = getRepository(Task)

      try {
        const task = await taskRespository.findOne(id)
        if(!task){
          return null 
        }
        task.completed = true
        await taskRespository.save(task)
        return task
      } catch (error) {
        console.error('Error marking task as complete:' , error)
      }
    }

    @Mutation(() => Task)
    async createTask(
      @Arg('title') title: string,
      @Arg('description') description: string,
      @Arg('userId', () => Int) userId
    ) {
      try {
        // Find the user by ID to associate the task with
        const userRepository = getRepository(User)
        const user = await userRepository.findOne(userId);
  
        if (!user) {
          throw new Error(`User with ID ${userId} not found.`);
        }
  
        // Create a new task using TypeORM
        const taskRespository = getRepository(Task)
        const task = taskRespository.create({
          title,
          description,
          user,
        });
  
        await taskRespository.save(task);
  
        return task;
      } catch (error) {
        throw new Error(`Error creating task: ${error.message}`);
      }
    }
}

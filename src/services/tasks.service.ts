import TaskDao from "@/dao/tasks.dao";
import { Task } from "@/interfaces/tasks.interface";

class TaskService{
    private TaskDao = new TaskDao();

    /**
     * Create new task service
     * @param {String} name 
     * @param {String} description 
     * @param {String[]} taskPoints 
     * @returns {Promise<Task>}
     */
    public async createTask(name:string, description:string, taskPoints:string[]):Promise<Task>{
        return await this.TaskDao.createTask(name,description,taskPoints);
    }

    /**
     * Create tasks service
     * @param {Object[]} data 
     * @returns {Promise<Task[]>}
     */
    public async createTasks(data:Object[]):Promise<Task[]>{
        return await this.TaskDao.createTasksBulk(data);
    }

    /**
     * Get tasks service
     * @param {number} page_no 
     * @param {number} page_size 
     * @returns {Promise<Task[]>}
     */
    public async findTasks(page_no:number, page_size:number):Promise<Task[]>{
       return await this.TaskDao.getTasks(page_no,page_size);
    }

    /**
     * Get task service
     * @param {String} id 
     * @param {String[]} fields 
     * @returns {Promise<Task>}
     */
    public async findTask(id:string,fields:string):Promise<Task>{
        return await this.TaskDao.getTaskById(id,fields);
    }


    /**
     * Update task service
     * @param {String} id 
     * @param {String} description 
     * @param {String[]} taskPoints 
     * @param {String} status 
     * @returns {Promise<Task>}
     */
    public async updateTask(id:string, description:string, taskPoints:string[], status:string):Promise<Task>{
        return await this.TaskDao.findTaskAndUpdate(id,description,taskPoints,status);
    }


    /**
     * Delete task service
     * @param {String} id
     * @returns {Promise<Task>} 
     */
    public async deleteTask(id:string):Promise<Task>{
        return await this.TaskDao.findTaskAndDelete(id);
    }
}


export default TaskService;
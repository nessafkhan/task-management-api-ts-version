import { TaskModel } from "@/models/tasks.model";
import { Task } from "@/interfaces/tasks.interface";


class TaskDao{
    public Task = TaskModel;


     /**
     * Create new task dao
     * @param {String} name 
     * @param {String} description 
     * @param {String[]} task_points 
     * @returns {Promise<Task>}
     */
      public async createTask(name:string, description:string, taskPoints:string[]):Promise<Task> {
        return await TaskModel.create({
            name,
            description,
            taskPoints,
        });
    };


     /**
     * Create tasks dao
     * @param {Object[]} data 
     * @returns {Promise<Task[]>}
     */
      public async createTasksBulk(data:Object[]):Promise<Task[]> {
        return await TaskModel.create(data);
    };


    /**
     * Get tasks dao
     * @param {Number} page_no 
     * @param {Number} page_size 
     * @returns {Promise<Task[]>}
     */
    public async getTasks(page_no:number, page_size:number):Promise<Task[]> {
        return await TaskModel.find({ isActive: true })
            .skip((page_no - 1) * page_size)
            .limit(page_size)
            .lean();
    };


    /**
     * Get task dao   
     * @param {String} id 
     * @param {Array} fields 
     * @returns {Promise<Task>}
     */
    public async getTaskById(id:string, fields:string):Promise<Task> {
        return await TaskModel.findOne({ _id: id, isActive: true })
            .select(fields)
            .lean();
    };


    /**
     * Get task by search name - dao
     * @param {String} qSearch
     * @returns {Promise<Task>}
     */
    public async getTaskByName (qSearch:string):Promise<Task[]> {
        return await TaskModel.find({ name: qSearch }).lean();
    };


    /**
     * Update task dao
     * @param {String} id 
     * @param {String} description 
     * @param {String[]} task_points 
     * @param {String} status 
     * @returns {Promise<Task>}
     */
    public async findTaskAndUpdate (id:string, description:string, taskPoints:string[], status:string):Promise<Task> {
        // await TaskModel.findByIdAndUpdate(id, {
        //     description,
        //     $push: { taskPoints: { $each: taskPoints } },
        //     status,
        // });/
        await TaskModel.updateOne( {_id: id}, {
            $set :{ description, status, taskPoints}
        })
        //TODO:update.save() method
        return await TaskModel.findById(id).lean();
    };


    /**
     * Delete task dao
     * @param {String} id 
     * @returns {Promise<Task>}
     */
    public async findTaskAndDelete (id:string):Promise<Task> {
        return await TaskModel.findByIdAndUpdate(id, { isActive: false }).lean();
    };

}

export default TaskDao;
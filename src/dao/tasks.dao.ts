import { TaskModel } from "@/models/tasks.model";
import { Task } from "@/interfaces/tasks.interface";


class TaskDao{
    public Task = TaskModel;
    /**
     * Get tasks
     * @param {Number} page_no 
     * @param {Number} page_size 
     * @returns {Promise<Task[]>}
     */
    public async getTasks(page_no:number, page_size:number):Promise<Task[]> {
        return await TaskModel.find({ isActive: true })
            .sort({ createdAt: -1 })
            .skip((page_no - 1) * page_size)
            .limit(page_size)
            .lean();
    };


    /**
     * Get task by id
     * @param {String} id 
     * @param {Array} fields 
     * @returns {Promise<Task>}
     */
    public async getTaskById(id:string, fields = ['_id', 'sr_no']):Promise<Task> {
        return await TaskModel.findOne({ _id: id, isDeleted: false })
            .select(fields)
            .lean();
    };


    /**
     * Get task by search name
     * @param {String} qSearch
     * @returns {Promise<Task>}
     */
    public async getTaskByName (qSearch:string):Promise<Task[]> {
        return await TaskModel.find({ name: qSearch });
    };

    /**
     * Create new task
     * @param {String} name 
     * @param {String} description 
     * @param {String[]} task_points 
     * @returns {Promise<Task>}
     */
    public async createTask(name:string, description:string, task_points:string[]):Promise<Task> {
        return await TaskModel.create({
            name,
            description,
            task_points,
        });
    };


    /**
     * Create tasks from CSV file
     * @param {Object[]} data 
     * @returns {Promise<Task[]>}
     */
    public async createTasksBulk(data:[]):Promise<Task[]> {
        return await TaskModel.create(data);
    };


    /**
     * Update task by id
     * @param {String} id 
     * @param {String} description 
     * @param {String[]} task_points 
     * @param {String} status 
     * @returns {Promise<Task>}
     */
    public async findTaskAndUpdate (id:string, description:string, task_points:string[], status:string):Promise<Task> {
        await TaskModel.findByIdAndUpdate(id, {
            description,
            $push: { task_points: { $each: task_points } },
            status,
        });
        return await TaskModel.findById(id).lean();
    };

    /**
     * Delete task by id
     * @param {String} id 
     * @returns {Promise<Task>}
     */
    public async findTaskAndDelete (id:string):Promise<Task> {
        return await TaskModel.findByIdAndUpdate(id, { isActive: false }).lean();
    };

}
import { MulterRequest } from "@/interfaces/multer.interface";
import { Task } from "@/interfaces/tasks.interface";
import { TaskModel } from "@/models/tasks.model";
import TaskService from "@/services/tasks.service";
import { NextFunction, Request, Response } from "express";

class TasksControlller {
	private taskService = new TaskService();


	/**
	 * Create task controller
	 * @param {Request} req includes Name, description, taskPoints
	 * @param {Response} res wil be an type of Task
	 * @param {NextFunction} next will pass erro into errorhandler
	 */


	public addTask = async (req: Request, res: Response, next: NextFunction):Promise<Response> => {
		try {
			const TaskPayload: Task = req.body;
			const { name, description, taskPoints } = TaskPayload;
			const createdTask: Task = await this.taskService.createTask(name, description, taskPoints);
			return res.status(201).json(createdTask);
		} catch (error) {
			next(error)
		}
	}


/**
 * Adding tasks from CSV
 * @param {MulterRequest} req includes stuctruedTasks which is validated and structured to json
 * @param {Response} res wil be an object of type Task
 * @param {NextFunction} next will pass error into errorhandler
 * @returns {Promise<any>}
 */
	public addTasks = async (req: MulterRequest, res: Response, next: NextFunction):Promise<Response> => {
		try {
			const stucturedTasks: Object[] = req.stuctruedTasks;
			const createdTasks: Object[] = await this.taskService.createTasks(stucturedTasks);
			return res.status(201).json(createdTasks);
		} catch (error) {
			next(error)
		}
	}

	/**
	 * Get tasks controller pagenated data
	 * @param {Request} req include page_no and page_size
	 * @param {Response} res will be an Object of type Task
	 * @param {NextFunction} next will pass error into errorhandler
	 */
	public getTasks = async (req: any, res: Response, next: NextFunction):Promise<Response> => {
		try {
			const page_no: number = parseInt(req.query.page_no);
			const page_size: number = parseInt(req.query.page_size);
			/**use Promise.all */
			const allTasks: Task[] = await this.taskService.findTasks(page_no, page_size);
			const totalTasks: number = await TaskModel.countDocuments({});
			return res.status(200).json({
				allTasks,
				meta: {
					total_items: totalTasks,
					next_page: page_no + 1,
					page_size: allTasks.length,
					has_more: (page_size*page_no) <= totalTasks - 1,
				},
			});
		} catch (error) {
			next(error)
		}
	};


	/**
	 * Get task controller 
	 * @param {Request} req includes fields as query params and an id
	 * @param {Response} res will be an Object of type Task
	 * @param {NextFunction} next will pass error into errorhandler
	 */
	public getTask = async (req: any, res: Response, next: NextFunction):Promise<Response> => {
		try {
			let fields: string = ' ';
			if (req.query.fields) {
				fields = req.query.fields.split(',').join(' ');
			}
			const id: string = req.params.id;
			/** TODO: Store to redis */
			const queriedTask: Task = await this.taskService.findTask(id, fields);
			return res.status(200).json(queriedTask);
		} catch (error) {
			next(error)
		}
	}


	/**
	 * Update task controller
	 * @param {Request} req includes Name, description, taskPoints
	 * @param {Response} res will be an Object of type Task
	 * @param {NextFunction} next will pass error into errorhandler
	 */
	public updateTask = async (req: Request, res: Response, next: NextFunction):Promise<Response> => {
		try {
			const id: string = req.params.id;
			const updatePayload: Task = req.body;
			const { description, taskPoints, status }:Task = updatePayload;
			/** TODO: Invalidate cache */
			const updatedTask: Task = await this.taskService.updateTask(id, description, taskPoints, status);
			return res.status(200).json(updatedTask);
		} catch (error) {
			next(error)
		}
	}


	/**
	 * Delete task controller
	 * @param req includes id param
	 * @param res will be an json with message
	 * @param next will pass error into errorhandler
	 */
	public deleteTask = async (req: Request, res: Response, next: NextFunction):Promise<Response> => {
		try {
			const id: string = req.params.id;
			await this.taskService.deleteTask(id);
			return res.status(200).json({ message: 'Task deleted succesfully' });
		} catch (error) {
			next(error)
		}
	}
}

export default TasksControlller;
import { checkRequiredFields,checkNameLength,checkSpecialChars, checkTaskPointsEmpty } from "@/helpers/validations.helpers";
import { Task } from "@/interfaces/tasks.interface";
import { NextFunction, Request, Response } from "express";

const validateTask = (req:Request, res:Response, next:NextFunction):any => {
	const taskPayload = req.body;
	const { name, description, taskPoints }:Task = taskPayload;
	if (checkRequiredFields(name, description, taskPoints)) {
		return res.status(401).json({ message: 'All fields are required' });
	}
	if (checkNameLength(name)) {
		return res
			.status(401)
			.json({ message: 'Name should not exceeds 20 letters' });
	}
	if (checkSpecialChars(name)) {
		return res
			.status(401)
			.json({ message: 'Name should not include any special chars' });
	}

	// if(checkTaskPointsEmpty(taskPoints)){
	// 	return res.status(401).json({ message : 'Task points '})
	// }
	return next();
};

export default validateTask;
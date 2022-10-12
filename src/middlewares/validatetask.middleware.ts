import { checkRequiredFields,checkNameLength,checkSpecialChars } from "@/helpers/validations.helpers";
import { NextFunction, Request, Response } from "express";

const validateTask = (req:Request, res:Response, next:NextFunction) => {
	const { name, description, taskPoints } = req.body;
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
	return next();
};

export default validateTask;
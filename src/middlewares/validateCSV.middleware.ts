import { checkNameLength, checkRequiredFields, checkSpecialChars } from "@/helpers/validations.helpers";
import { NextFunction, Request, Response } from "express";
import csv from 'csvtojson'
import { MulterRequest } from "@/interfaces/multer.interface";
import { JsonData } from "@/interfaces/jsonCSV.interface";



/**
 * CSV file validtions
 * 1.Converting to json
 * 2.Structuring data
 * 3.Sending for validations
 * 4.Pushing each object into the array
 * 5.Passing into the next middleware 
 * @param {Request} req
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const validateCSVFile = async (req:MulterRequest, res:Response, next:NextFunction) => {
	try {
		const jsonData:JsonData[] = await csv().fromFile(req.file.path);
		let allTasks:Object[] = [];
		jsonData.forEach((element) => {
			/** Structuring the data for further operations */
			let name:string = element.name.trim();
			let description:string = element.description.trim();
			let taskPoints:string[] = [
				element['taskPoint 1'],
				element['taskPoint 2'],
				element['taskPoint 3'],
			].filter((element) => {
				return element.trim().length > 1;
			});

			/** Checking different validations */
			if (checkRequiredFields(name, description, taskPoints)) {
				return res
					.status(401)
					.json({ message: 'All fields are required' });
			}

			if (checkNameLength(name)) {
				return res.status(401).json({
					message: 'Name should not exceeds 20 letters',
				});
			}
			if (checkSpecialChars(name)) {
				return res.status(401).json({
					message: 'Name should not include any special chars',
				});
			}
			const extractedTask:Object = {
				name,
				description,
				taskPoints,
			};
			allTasks.push(extractedTask);
		});
		req.stuctruedTasks = allTasks;
		next();
	} catch (error) {
		next(error)
	}
};

export default validateCSVFile;
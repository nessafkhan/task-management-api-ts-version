import { model, Schema, Document } from "mongoose";
import { Task } from "@/interfaces/tasks.interface";

const SrNoSchema: Schema = new Schema({
	_id: { type: String, required: true },
	seq: { type: Number, default: 0 },
});

const SrNo = model('SrNo', SrNoSchema);

const TaskSchema: Schema = new Schema(
	{
		sr_no: { type: String },
		name: {
			type: String,
			required: true,
			maxLength: 20,
		},
		description: {
			type: String,
			required: true,
		},
		taskPoints: {
			type: Array,
			required: true,
		},
		status: {
			type: String,
			enum: ['Started', 'in Progress', 'Completed'],
			default: 'Started',
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

TaskSchema.pre('save', function (next) {
	const doc = this;
	SrNo.findByIdAndUpdate(
		{ _id: 'taskNo' },
		{ $inc: { seq: 1 } },
		{ new: true, upsert: true }
	)
		.then(function (count) {
			doc.sr_no = count;
			next();
		})
		.catch(function (error) {
			console.error(error);
			throw error;
		});
});


export const TaskModel = model<Task & Document>('Task', TaskSchema);
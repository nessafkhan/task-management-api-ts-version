export interface Task {
    _id: string;
    name: string;
    description: string;
    taskPoints: string[];
    status: 'Started' |'in Progress'| 'Completed';
    isActive: boolean;
}
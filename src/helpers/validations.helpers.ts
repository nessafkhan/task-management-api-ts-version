const checkRequiredFields = (name:string, description:string, taskPoints:string[]) => {
	if (
		!name ||
		!description ||
		taskPoints.includes(undefined) ||
		taskPoints.length < 1
	) {
		return true;
	}
	return false;
};


const checkSpecialChars = (str:string) => {
	const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
	const name = specialChars.split('').some((specialChars) => {
		if (str.includes(specialChars)) {
			return true;
		}
		return false;
	});
	return name;
};

const checkNameLength = (name:string) => {
	if (name.length > 20) {
		return true;
	}
	return false;
};


const checkTaskPointsEmpty = (taskPoints: []) => {
	taskPoints.map(item => {
		console.log(item);
		
	})
}
 export {checkRequiredFields, checkSpecialChars, checkNameLength, checkTaskPointsEmpty};
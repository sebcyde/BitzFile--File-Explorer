const testpath = 'C:\\Users\\SebCy\\Documents\\';
const path = require('path');
const fs = require('fs');

export const GetDirectoryContents = (Directory: string = testpath) => {
	const absolutePath = path.resolve(Directory);
	const directoryContents = fs.readdirSync(absolutePath);
	return directoryContents;
};

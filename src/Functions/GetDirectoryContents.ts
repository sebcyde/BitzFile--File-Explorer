import { GetDirectoryData } from './GetDirectoryData';

const path = require('path');

export const GetDirectoryContents = async (Directory: string) => {
	if (Directory.split('')[Directory.split('').length - 1] == '\\') {
		Directory = Directory.slice(0, -1);
	}

	const absolutePath = path.resolve(Directory);
	// console.log('GDC - absolutePath:', absolutePath);

	const directoryContents = await GetDirectoryData(absolutePath);
	// console.log('GDC - directoryContents:', directoryContents);

	return { Directory: absolutePath, Contents: directoryContents };
};

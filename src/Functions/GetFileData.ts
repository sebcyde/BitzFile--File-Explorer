import * as FileMethods from './FileMethods';
import { PathChecker } from './PathChecker';
import { ipcRenderer } from 'electron';
import { FileObject } from '../Types';
import path from 'path';
import fs from 'fs';

export const GetFileData = async (FilePath: string): Promise<FileObject> => {
	console.log = (...args) => {
		ipcRenderer.send('console-log', 'log', ...args);
	};

	const Type = await PathChecker(FilePath);
	const FileName = path.basename(FilePath);

	console.log('GFD - File Path:', FilePath);
	console.log('GFD - File Name:', FileName);

	let FileData: FileObject = {
		name: FileName,
		FileType: FileMethods.getFileType(FilePath),
		SymLink: FileMethods.isSymLink(FilePath),
		AccessTime: FileMethods.getFileLastAccessTime(FilePath),
		CreationTime: FileMethods.getFileCreationTime(FilePath),
		ModifiedTime: FileMethods.getFileModifiedTime(FilePath),
		Permissions: FileMethods.getFilePermissions(FilePath),
		AccessPermissions: FileMethods.getFileAccessPermissions(FilePath),
		Size: FileMethods.getFileSize(FilePath),
		Type,
		Location: FilePath,
	};

	// console.log('GFD - Data:', fileDetails);

	return FileData;
};

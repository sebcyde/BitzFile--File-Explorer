import { execSync } from 'child_process';
import isImage from 'is-image';
import path from 'path';
import fs from 'fs';

export const getFileType = (filePath: string): string => {
	const extension = path.extname(filePath);
	return extension;
};

export const isSymLink = (filePath: string): boolean => {
	const stats = fs.lstatSync(filePath);
	return stats.isSymbolicLink();
};

export const getFileLastAccessTime = (filePath: string): Date => {
	const stats = fs.statSync(filePath);
	const lastAccessTime = stats.atime;
	return lastAccessTime;
};

export const getFileCreationTime = (filePath: string): Date => {
	const stats = fs.statSync(filePath);
	const creationTime = stats.birthtime;
	return creationTime;
};

export const getFileModifiedTime = (filePath: string): Date => {
	const stats = fs.statSync(filePath);
	const modifiedTime = stats.mtime;
	return modifiedTime;
};

// Doesnt Work
export const getFileOwnerAndGroup = (
	filePath: string
): { owner: string; group: string } => {
	const stats = fs.statSync(filePath);
	const ownerId = stats.uid;
	const groupId = stats.gid;

	const owner = execSync(`id -u -n ${ownerId}`).toString().trim();
	const group = execSync(`id -g -n ${groupId}`).toString().trim();

	return {
		owner,
		group,
	};
};

export const getFilePermissions = (filePath: string): {} => {
	const stats = fs.statSync(filePath);
	const permissions = {
		owner: {
			read: Boolean(stats.mode & fs.constants.S_IRUSR),
			write: Boolean(stats.mode & fs.constants.S_IWUSR),
			execute: Boolean(stats.mode & fs.constants.S_IXUSR),
		},
		group: {
			read: Boolean(stats.mode & fs.constants.S_IRGRP),
			write: Boolean(stats.mode & fs.constants.S_IWGRP),
			execute: Boolean(stats.mode & fs.constants.S_IXGRP),
		},
		others: {
			read: Boolean(stats.mode & fs.constants.S_IROTH),
			write: Boolean(stats.mode & fs.constants.S_IWOTH),
			execute: Boolean(stats.mode & fs.constants.S_IXOTH),
		},
	};
	return permissions;
};

export const getFileAccessPermissions = (filePath: string): {} => {
	const stats = fs.statSync(filePath);
	const permissions = {
		read: Boolean(stats.mode & fs.constants.S_IRUSR),
		write: Boolean(stats.mode & fs.constants.S_IWUSR),
		execute: Boolean(stats.mode & fs.constants.S_IXUSR),
	};
	return permissions;
};

export const getFileSize = (filePath: string): number => {
	const stats = fs.statSync(filePath);
	return stats.size;
};

export const isImageFile = (FilePath: string): boolean => {
	return isImage(FilePath);
};

export interface FileObject {
	name: string;
	FileType: string;
	SymLink: boolean;
	AccessTime: Date;
	CreationTime: Date;
	ModifiedTime: Date;
	Permissions: {};
	AccessPermissions: {};
	Size: number;
	Type: string | boolean;
	Location: string;
}

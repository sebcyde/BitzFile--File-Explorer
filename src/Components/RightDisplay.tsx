import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import LoadingScreen from './LoadingScreen';
import {
	GetDirectoryData,
	countDirectories,
	countFiles,
} from '../Functions/GetDirectoryData';
import { FileObject } from '../Types';
import { GetFileData } from '../Functions/GetFileData';
import { PathChecker } from '../Functions/PathChecker';
import { isImageFile } from '../Functions/FileMethods';
import Overlay from '../Assets/OverlayOne.png';

type Props = {};

const ImageDisplayComponent = (File: FileObject) => {
	console.log('RD-IDC - Image Location:', File.Location);
	return (
		<div className="ImageDisplayComponent">
			<img src={File.Location} />
		</div>
	);
};

const RightDisplay = (props: Props) => {
	const [Display, setDisplay] = useState<JSX.Element>();
	const [Loading, setLoading] = useState(true);
	const FuturePath = useSelector(
		(state: RootState) => state.PathState.futurePath
	);

	const CheckPath = async () => {
		setLoading(true);
		console.log('RD - Future Path:', FuturePath);
		const PathType = await PathChecker(FuturePath);
		if (PathType == 'file') {
			const FileData = await GetFileData(FuturePath);
			const ImageFile = await isImageFile(FuturePath);
			console.log(`RD - Image File: ${ImageFile}`);
			console.log('RD - Single File Data:', FileData);
			if (ImageFile) setDisplay(ImageDisplayComponent(FileData));
		} else if (PathType == 'directory') {
			const Data = await GetDirectoryData(FuturePath);
			// console.log('RD - Directory Data:', Data.length);
			const DirectoryCount = countDirectories(Data);
			const FileCount = countFiles(Data);
			console.log('RD - Directories:', DirectoryCount);
			console.log('RD - Files:', FileCount);

			// console.log('RD - Data:', Data);
		}

		console.log(' ');
	};

	useEffect(() => {
		CheckPath().then(() => setLoading(false));
	}, [FuturePath]);

	return (
		<div className="RightDisplayContainer">
			<img src={Overlay} className="Overlay" />
			{Loading ? (
				<LoadingScreen />
			) : (
				<div className="container">
					<div className="HeaderContainer">
						<h2 className="Header">{FuturePath.split('\\').reverse()[0]}</h2>
					</div>
					<div className="ComponentContainer">{Display}</div>
				</div>
			)}
		</div>
	);
};

export default RightDisplay;

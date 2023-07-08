import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import LoadingScreen from './LoadingScreen';
import {
	GetDirectoryData,
	countDirectories,
} from '../Functions/GetDirectoryData';

type Props = {};

const RightDisplay = (props: Props) => {
	const [Loading, setLoading] = useState(true);
	const FuturePath = useSelector(
		(state: RootState) => state.PathState.futurePath
	);

	const CheckPath = async () => {
		console.log('RD - Future Path:', FuturePath);
		const Data = await GetDirectoryData(FuturePath);
		// console.log('RD - Directory Data:', Data);
		const DirectoryCount = countDirectories(Data);
		console.log('RD - Directories:', DirectoryCount);
		console.log(' ');
	};

	useEffect(() => {
		CheckPath().then(() => setLoading(false));
	}, [FuturePath]);

	return (
		<div className="RightDisplayContainer">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<div className="HeaderContainer">
						<h2 className="Header">{FuturePath.split('\\').reverse()[0]}</h2>
					</div>
				</>
			)}
		</div>
	);
};

export default RightDisplay;

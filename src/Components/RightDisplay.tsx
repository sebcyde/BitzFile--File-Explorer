import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { PathChecker } from '../Functions/PathChecker';
import LoadingScreen from './LoadingScreen';
import { GetDirectoryData } from '../Functions/GetDirectoryData';

type Props = {};

const RightDisplay = (props: Props) => {
	const [Loading, setLoading] = useState(true);
	const FuturePath = useSelector(
		(state: RootState) => state.PathState.futurePath
	);

	const CheckPath = async () => {
		// console.log('Future Path:', FuturePath);
		let Data = await GetDirectoryData(FuturePath);
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

import { GetDirectoryContents } from './Functions/GetDirectoryContents';
import { AppendFuturePath, AppendPath } from './Functions/AppendPath';
import { useDispatch, useSelector } from 'react-redux';
import BottomToolbar from './Components/BottomToolbar';
import RightDisplay from './Components/RightDisplay';
import { setCurrentPath } from './Store/Path';
import { useState, useEffect } from 'react';
import Toolbar from './Components/Toolbar';
import { RootState } from './Store/store';
import './Styles/All.scss';

function App() {
	const CurrentPath = useSelector((state: RootState) => state.PathState.path);
	const [FileNames, setFileNames] = useState<string[]>(['test']);
	const dispatch = useDispatch();

	const InitialLoad = async () => {
		let res = GetDirectoryContents();
		res.Directory;
		setFileNames(res.Contents);
	};

	const UpdateDisplay = () => {
		let res = GetDirectoryContents(CurrentPath);
		setFileNames(res.Contents);
	};

	const testRedux = () => {
		dispatch(setCurrentPath('redux test'));
	};

	useEffect(() => {
		InitialLoad().then(() => setLoading(false));
	}, []);

	useEffect(() => {
		UpdateDisplay();
	}, [CurrentPath]);

	return (
		<div className="AppContainer">
			<Toolbar />
			{/* <hr /> */}
			<div className="Display">
				<div className="CurrentDirectoryDisplay">
					<ul>
						{FileNames.map((File) => (
							<li
								className="FileText"
								onClick={() => {
									AppendPath(File);
								}}
								onMouseOver={() => {
									AppendFuturePath(File);
								}}
							>
								{File}
							</li>
						))}
					</ul>
				</div>
				<RightDisplay />
			</div>
			<BottomToolbar />
		</div>
	);
}

export default App;

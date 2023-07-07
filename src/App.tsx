import { GetDirectoryContents } from './Functions/GetDirectoryContents';
import { useState, useEffect } from 'react';
import Toolbar from './Components/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPath } from './Store/Path';
import { AppendPath } from './Functions/AppendPath';
import { RootState } from './Store/store';
import './Styles/All.scss';
import LoadingScreen from './Components/LoadingScreen';

function App() {
	const [FileNames, setFileNames] = useState<string[]>(['test']);
	const [Loading, setLoading] = useState<boolean>(true);
	const CurrentPath = useSelector((state: RootState) => state.PathState.path);
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
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
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
									>
										{File}
									</li>
								))}
							</ul>
						</div>
						<div className="UserBottomToolbar">
							<div className="UserBox">Current User: SEBASTIAN</div>
						</div>
					</div>

					{/* <button onClick={testRedux} /> */}
				</>
			)}
		</div>
	);
}

export default App;

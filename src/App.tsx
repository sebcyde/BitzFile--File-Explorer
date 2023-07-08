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
import { FileObject } from './Types';
import LoadingScreen from './Components/LoadingScreen';
import EmptyDirectory from './Components/EmptyDirectory';

function App() {
	const CurrentPath = useSelector((state: RootState) => state.PathState.path);
	const [CurrentFile, setCurrentFile] = useState<string>('');
	const [Loading, setLoading] = useState<boolean>(true);
	const [Files, setFiles] = useState<FileObject[]>([]);

	const UpdateDisplay = async () => {
		setLoading(true);
		console.log(' ');
		console.log('App - Updating Display');

		console.log('App - Current Directory:', CurrentPath);
		try {
			let res = await GetDirectoryContents(CurrentPath);
			// console.log('App - GDC', res);
			const Files = res.Contents.filter((file) => !file.SymLink);
			const SymLinks = res.Contents.filter((file) => file.SymLink);

			console.log('App - Files', Files.length);
			console.log('App - Sym Links', SymLinks.length);
			console.log(' ');

			Files.length > 0 ? AppendFuturePath(Files[0].name) : '';
			// setCurrentFile(Files[0].name);
			setFiles(Files);
			setLoading(false);
		} catch (error) {
			console.error('App - Error updating display:', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		UpdateDisplay();
	}, []);

	useEffect(() => {
		UpdateDisplay();
	}, [CurrentPath]);

	return (
		<div className="AppContainer">
			<Toolbar />
			{Loading ? (
				<LoadingScreen />
			) : Files.length == 0 ? (
				<EmptyDirectory />
			) : (
				<>
					<div className="Display">
						<div className="CurrentDirectoryDisplay">
							<ul>
								{Files.map((File) => (
									<li
										className={`FileText ${
											CurrentFile == File.name ? 'active' : ''
										}`}
										onClick={() => {
											console.log('App - Appending File:', File.name);
											AppendPath(File.name);
										}}
										onMouseOver={() => {
											setCurrentFile(File.name);
											AppendFuturePath(File.name);
										}}
									>
										{File.name}
									</li>
								))}
							</ul>
						</div>
						<RightDisplay />
					</div>
				</>
			)}
			<BottomToolbar />
		</div>
	);
}

export default App;

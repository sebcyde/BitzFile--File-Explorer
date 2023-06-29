import { GetDirectoryContents } from './Functions/GetDirectoryContents';
import { useState, useEffect } from 'react';
import Toolbar from './Components/Toolbar';
import { useDispatch } from 'react-redux';
import { setCurrentPath } from './Store/Path';

function App() {
	const [FileNames, setFileNames] = useState<string[]>(['test']);
	const dispatch = useDispatch();

	const InitialLoad = async () => {
		let res = GetDirectoryContents();
		setFileNames(res.Contents);
	};

	const testRedux = () => {
		dispatch(setCurrentPath('redux test'));
	};

	useEffect(() => {
		InitialLoad();
	}, []);

	return (
		<>
			<Toolbar />
			<ul>
				Files:
				{FileNames.map((File) => (
					<li className="black">{File}</li>
				))}
			</ul>
			<hr />
			<button onClick={testRedux} />
		</>
	);
}

export default App;

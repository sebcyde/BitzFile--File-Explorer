import { useState } from 'react';
import axios from 'axios';
import { GetDirectoryContents } from './Functions/GetDirectoryContents';

function App() {
	const [count, setCount] = useState(0);
	const [FileNames, setFileNames] = useState<string[]>(['test']);

	const GetFiles = async () => {
		let res = GetDirectoryContents();
		console.log(res);
		setFileNames(res);
	};

	return (
		<>
			<button onClick={GetFiles}>count is {count}</button>
			<ul>
				Files:
				{FileNames.map((File) => (
					<li className="black">{File}</li>
				))}
			</ul>
		</>
	);
}

export default App;

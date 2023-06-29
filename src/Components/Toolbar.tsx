import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';

type Props = {};

const Toolbar = (props: Props) => {
	const CurrentPath = useSelector((state: RootState) => state.PathState.path);

	return (
		<div>
			<p>Current Location: {CurrentPath}</p>
		</div>
	);
};

export default Toolbar;

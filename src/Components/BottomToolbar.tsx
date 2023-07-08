import React from 'react';
import { GoBack } from '../Functions/GoBack';

type Props = {};

const BottomToolbar = (props: Props) => {
	return (
		<div className="UserBottomToolbar">
			<div className="BackButton" onClick={GoBack}>
				BACK
			</div>

			<div className="UserBox">Current User: SEBASTIAN</div>
		</div>
	);
};

export default BottomToolbar;

import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { GoBack } from '../Functions/GoBack';

const Toolbar = () => {
	const CurrentPath = useSelector((state: RootState) => state.PathState.path);

	return (
		<div className="Toolbar">
			<div className="ArrowContainer">
				<img src="/Arrow.png" className="PrevArrow" onClick={GoBack} />
				{/* <img src='../../public/Arrow.png' className='NextArrow' /> */}
			</div>
			<div className="PathContainer">
				<p className="PathText">Current Location: {CurrentPath}</p>
			</div>
			<div className="IconContainer">
				<img src="/SettingsIcon.png" />
			</div>
		</div>
	);
};

export default Toolbar;

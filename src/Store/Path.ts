import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface iPathState {
	path: string;
	futurePath: string;
}

const initialState: iPathState = {
	path: 'C:\\Users\\SebCy\\Documents\\',
	futurePath: 'C:\\Users\\SebCy\\Documents\\',
};

export const currentPathSlice = createSlice({
	name: 'path',

	initialState,
	reducers: {
		setCurrentPath: (state, action) => {
			state.path = action.payload;
		},
		setFuturePath: (state, action) => {
			state.futurePath = action.payload;
		},
	},
});

// Setter
export const { setFuturePath, setCurrentPath } = currentPathSlice.actions;

// Getter
export const getCurrentStoreStock = (state: RootState) => state.PathState.path;

export default currentPathSlice.reducer;

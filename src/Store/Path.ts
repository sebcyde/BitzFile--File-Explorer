import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface iPathState {
	path: string;
}

const initialState: iPathState = {
	path: 'C:\\Users\\SebCy\\Documents\\',
};

export const currentPathSlice = createSlice({
	name: 'path',

	initialState,
	reducers: {
		setCurrentPath: (state, action) => {
			state.path = action.payload;
		},
	},
});

// Setter
export const { setCurrentPath } = currentPathSlice.actions;

// Getter
export const getCurrentStoreStock = (state: RootState) => state.PathState.path;

export default currentPathSlice.reducer;

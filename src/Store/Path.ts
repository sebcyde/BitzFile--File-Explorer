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
			console.log('Store Path Payload:', action.payload);
			state.path = action.payload;
			console.log('Updated Store Path Payload:', state.path);
		},
	},
});

// Setter
export const { setCurrentPath } = currentPathSlice.actions;

// Getter
export const getCurrentStoreStock = (state: RootState) => state.PathState.path;

export default currentPathSlice.reducer;

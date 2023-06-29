import { configureStore } from '@reduxjs/toolkit';
import { currentPathSlice } from './Path';

export const store = configureStore({
	reducer: {
		PathState: currentPathSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

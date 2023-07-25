/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice } from '@reduxjs/toolkit';

interface IBook {
  searchTerm: string;
}

const initialState: IBook = {
  searchTerm: '',
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = bookSlice.actions;

export default bookSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type sortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface filterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: sortType;
}

const initialState: filterState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action: PayloadAction<sortType>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFiltres: (state, action: PayloadAction<filterState>) => {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const sortSelector = (state: RootState) => state.filter.sort;
export const filterSelector = (state: RootState) => state.filter;

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFiltres,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;

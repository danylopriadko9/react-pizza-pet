import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItems } from './cartSlice';
import { sortType } from './filterSlice';

type fetchPizzasParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
};

type Pizza = {
  id: number;
  title: string;
  count: number;
  imageUrl: string;
  price: number;
  types: number[];
  sizes: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export type SearchPizzasParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzasParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62b46568a36f3a973d3314f5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data;
  }
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
  },

  // extraReducers: {
  //   [fetchPizzas.fulfilled]: (state, action: PayloadAction<CartItems[]>) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const pizzaSelector = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

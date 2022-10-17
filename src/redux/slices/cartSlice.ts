import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItems = {
  id: number;
  title: string;
  count: number;
  imageUrl: string;
  price: number;
  type: string;
  size: string;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItems[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItems>) => {
      const findItem = state.items.find(
        (value) =>
          value.title === action.payload.title &&
          value.size === action.payload.size &&
          value.type === action.payload.type
      );

      console.log('Обязательно вернуться и перепроверить типы', action.payload);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce(
        (acc, val) => (acc += val.price * val.count),
        0
      );
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (element) => element.id !== action.payload
      );

      state.totalPrice = state.items.reduce(
        (acc, val) => (acc += val.price * val.count),
        0
      );
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    plusCounter: (state, action: PayloadAction<{ id: number }>) => {
      const findItem = state.items.find(
        (value) => value.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.items.reduce(
        (acc, val) => (acc += val.price * val.count),
        0
      );
    },
    minusCounter: (state, action: PayloadAction<{ id: number }>) => {
      const findItem = state.items.find(
        (value) => value.id === action.payload.id
      );

      if (findItem!.count > 1) {
        findItem!.count--;
      }

      state.totalPrice = state.items.reduce(
        (acc, val) => (acc += val.price * val.count),
        0
      );
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const cartItemByTitleSelector = (title: string) => (state: RootState) =>
  state.cart.items
    .filter((value: { title: string }) => value.title === title)
    .reduce((acc: number, item: CartItems) => (acc += item.count), 0);

export const { addItem, removeItem, clearItems, plusCounter, minusCounter } =
  cartSlice.actions;
export default cartSlice.reducer;

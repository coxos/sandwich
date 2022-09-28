import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export const sandwichListSlice = createSlice({
  name: "sandwichList",
  initialState: {
    page: null,
    sandwiches: null,
    pageSize: 25,
    isLoading: false,
    totalItemCount: null,
  } as SandwichListState,
  reducers: {
    sandwichListLoaded: (
      state,
      action: PayloadAction<{ list: readonly Sandwich[]; totalCount: number }>
    ) => {
      return {
        ...state,
        sandwiches: action.payload.list,
        isLoading: false,
        totalItemCount: action.payload.totalCount,
      };
    },
  },
});

export type Sandwich = {
  id: string;
  name: string;
  image: string;
  isvegan: boolean;
  price: number;
};

export type SandwichListState = {
  page: number | null;
  sandwiches: readonly Sandwich[] | null;
  pageSize: 10 | 15 | 25 | 100;
  isLoading: boolean;
  totalItemCount: number | null;
};

export type State = {
  sandwichList: SandwichListState;
};

export const store = configureStore({
  reducer: { [sandwichListSlice.name]: sandwichListSlice.reducer },
  devTools: true,
});

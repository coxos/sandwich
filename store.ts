import {
  configureStore,
  createAction,
  createAsyncThunk,
  createReducer,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import {
  getSandwichApi,
  sandwichGenerator,
} from "./assets/data/sandwichGenerator";

export const getSandwiches = createAsyncThunk(
  "sandwichList/getSandwiches",
  async (page: number) => {
    //const { pageSize } = thunkApi.getState().sandwichList as SandwichListState;
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(getSandwichApi(page, 20));
      }, 250);
    });

    return {
      ...(data as { list: readonly Sandwich[]; totalCount: number }),
      page: page,
    } as { list: readonly Sandwich[]; totalCount: number; page: number };
  }
);

export const sandwichListSlice = createSlice({
  name: "sandwichList",
  initialState: {
    page: null, // melyik oldalon állunk
    sandwiches: null, // az adott oldalon megjenelített sandwich objektum (page size befolyásolja)
    pageSize: 20, // az összes szedvicsből mennyit jelenítünk meg az adott oldalon
    isLoading: true, // betöltés
    totalItemCount: null, // összes sandwich db
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
  extraReducers: (builder) => {
    builder.addCase(getSandwiches.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      getSandwiches.fulfilled,
      (
        state,
        action: PayloadAction<{
          list: readonly Sandwich[];
          totalCount: number;
          page: number;
        }>
      ) => {
        return {
          ...state,
          page: action.payload.page,
          sandwiches: action.payload.list,
          isLoading: false,
          totalItemCount: action.payload.totalCount,
        };
      }
    );
    builder.addCase(getSandwiches.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
      };
    });
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
  pageSize: 10 | 15 | 20 | 100;
  isLoading: boolean;
  totalItemCount: number | null;
};

export type State = {
  sandwichList: SandwichListState;
};

export const { sandwichListLoaded } = sandwichListSlice.actions;

export const store = configureStore({
  reducer: { [sandwichListSlice.name]: sandwichListSlice.reducer },
  devTools: true,
});

/// ts project setup

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
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

export const getSandwiches = createAsyncThunk<
  {
    sandwiches: readonly Sandwich[];
    totalItemCount: number;
    page: number;
    SanwichesMaxPrice: number;
  },
  number,
  {
    dispatch: AppDispatch;
    state: State;
  }
>("sandwichList/getSandwiches", async (page, thunkApi) => {
  const { pageSize, filters } = thunkApi.getState().sandwichList;
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(getSandwichApi(page, pageSize, filters));
    }, 250);
  });

  return {
    ...(data as {
      sandwiches: readonly Sandwich[];
      totalItemCount: number;
      SanwichesMaxPrice: number;
    }),
    page: page,
  };
});

export const sandwichListSlice = createSlice({
  name: "sandwichList",
  initialState: {
    page: null, // melyik oldalon állunk
    sandwiches: null, // az adott oldalon megjenelített sandwich objektum (page size befolyásolja)
    pageSize: 20, // az összes szedvicsből mennyit jelenítünk meg az adott oldalon
    isLoading: true, // betöltés
    totalItemCount: null, // összes sandwich db
    SanwichesMaxPrice: null,
    filters: null, // egy olyan objektum ami tartalmazza a szűrési feltételeket
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
    setFIlters: (state, action: PayloadAction<SandwichFilters | null>) => {
      console.log(action.payload);

      let sName = action.payload?.searchSandwichName
        ? action.payload?.searchSandwichName
        : null;
      let sPrice = action.payload?.price ? action.payload?.price : null;

      if (sPrice === null && sName === null) {
        return {
          ...state,
          filters: null,
        };
      }

      return {
        ...state,
        filters: {
          searchSandwichName: sName,
          price: sPrice,
        },
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
          sandwiches: readonly Sandwich[];
          totalItemCount: number;
          page: number;
          SanwichesMaxPrice: number;
        }>
      ) => {
        return {
          ...state,
          page: action.payload.page,
          sandwiches: action.payload.sandwiches,
          isLoading: false,
          totalItemCount: action.payload.totalItemCount,
          SanwichesMaxPrice: action.payload.SanwichesMaxPrice,
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

export type SandwichFilters = {
  searchSandwichName: string | null;
  price: [number, number] | null;
};

export type SandwichListState = {
  page: number | null;
  sandwiches: readonly Sandwich[] | null;
  pageSize: 10 | 15 | 20 | 100;
  isLoading: boolean;
  totalItemCount: number | null;
  filters: SandwichFilters | null;
  SanwichesMaxPrice: number | null;
};

export type State = {
  sandwichList: SandwichListState;
};

export const { sandwichListLoaded, setFIlters } = sandwichListSlice.actions;

export const store = configureStore({
  reducer: { [sandwichListSlice.name]: sandwichListSlice.reducer },
  devTools: true,
});

/// ts project setup

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

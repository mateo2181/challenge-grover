import { Article } from "../types/article";
// import { ActionStore, IStore } from "../types/store";
// import { FETCH_ARTICLES, LOADING_ARTICLES } from "./actions";
import { createAsyncThunk, createSlice  } from '@reduxjs/toolkit';
import { RootState } from ".";
import { API_ENDPOINT, ARTICLES_PATH } from "../api";
import axios from "axios";

interface ListParameters {
    page: number;
    search: string;
}

export const fetchArticles = createAsyncThunk<Article[], ListParameters>('articles', async (parameters: ListParameters) => {
  const response = await axios.get(`${API_ENDPOINT}/${ARTICLES_PATH}&page=${parameters.page}&q=${parameters.search}&api-key=${process.env.REACT_APP_API_KEY_NEWYORKTIMES}`);
  return response.data.response.docs as Article[];
})

interface ArticleStoreI {
    data: Article[];
    loading: boolean;
    error: string | null
}

export const initialState: ArticleStoreI = {
    data: [],
    loading: false,
    error: null
}

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArticles.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        builder.addCase(fetchArticles.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchArticles.rejected, (state, action) => {
          if (action.payload) {
            state.error = action.error.message || '';
          }
        })
      },
});


// export const { loadingArticles } = articlesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectArticles = (state: RootState) => state.articles.data;

// export default articlesSlice.reducer;

export default articlesSlice;
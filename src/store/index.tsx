import articlesSlice from "./articlesSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        articles: articlesSlice.reducer
    },
    devTools: true
});

export default store

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
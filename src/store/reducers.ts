import { Article } from "../types/article";
import { ActionStore, IStore } from "../types/store";
import { FETCH_ARTICLES, LOADING_ARTICLES } from "./actions";

export const reducer = (state: IStore, action: ActionStore): IStore => {
    switch (action.type) {
        case LOADING_ARTICLES:
            return {
                ...state,
                loadingArticles: true
            };
        case FETCH_ARTICLES:
            return {
                ...state,
                loadingArticles: false,
                articles: action.value as Article[]
            };
        default:
            return state;
    }
}
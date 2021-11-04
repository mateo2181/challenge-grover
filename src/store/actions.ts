import { Article } from "../types/article";

export const LOADING_ARTICLES = 'articles/loadingArticles';
export const FETCH_ARTICLES = 'articles/fetchArticles';

export const actions = {
    loadingArticles: () => ({type: LOADING_ARTICLES}),
    fetchArticles: (data: Article[]) => ({type: FETCH_ARTICLES, payload: data}),
}
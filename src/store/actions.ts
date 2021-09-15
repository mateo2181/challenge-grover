import { Article } from "../types/article";

export const LOADING_ARTICLES = 'LOADING_ARTICLES';
export const FETCH_ARTICLES = 'FETCH_ARTICLES';

export const actions = {
    loadingArticles: () => ({type: LOADING_ARTICLES}),
    fetchArticles: (data: Article[]) => ({type: FETCH_ARTICLES, value: data}),
}
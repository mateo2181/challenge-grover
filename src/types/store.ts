import { Article } from "./article";

export interface ActionStore {
    type: string;
    value?: Array<any> | string | number
}

export interface IStore {
    articles: Article[];
    loadingArticles: boolean
}

export interface IContextModel {
    state: IStore;
    dispatch: React.Dispatch<ActionStore>;
}

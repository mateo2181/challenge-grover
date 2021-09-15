import React, { createContext, useContext, useReducer } from "react";
import { IContextModel, IStore } from "../types/store";
import { reducer } from "./reducers";

const initialState: IStore = {
    articles: [],
    loadingArticles: false
}

export const Store = createContext({} as IContextModel);

export const useStore = () => useContext(Store);

interface Props {
    children?: any
}

export const StoreProvider: React.FC = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
};

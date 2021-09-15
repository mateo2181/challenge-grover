import axios from "axios";
import { Article } from "../types/article";

const API_ENDPOINT = 'https://api.nytimes.com';
const ARTICLES_PATH = 'svc/search/v2/articlesearch.json?fl=_id,headline,lead_paragraph,document_type,web_url,pub_date';

interface ListParameters {
    page: number;
    search: string;
}

export default {
    articles: {
        list: (parameters: ListParameters): Promise<Article[]> => {
            return axios.get(`${API_ENDPOINT}/${ARTICLES_PATH}&page=${parameters.page}&q=${parameters.search}&api-key=${process.env.REACT_APP_API_KEY_NEWYORKTIMES}`)
            .then((res: any) => res.data.response.docs as Article[])
            .catch(err => err);
        } 
    }
}
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import api from '../../api';
import InputSearch from '../../components/InputSearch';
import { useStore } from '../../store';
import { actions } from '../../store/actions';
import { Article } from '../../types/article';
import { paramsArticle } from '../../types/paramsArticle';
import debounce from 'lodash.debounce';

const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    gap: 28px;
`;
const H2 = styled.h2`
    font-weight: 700;
    font-size: 20px;
    margin: 0;
`;
const List = styled.section`
    margin-top: 20px;
    display: flex;
    flex-direction:column;
`;
const ArticleItem = styled.article`
    padding: 20px 12px;
    border: 1px solid #cacaca;
    cursor: pointer;
    &:hover {
        background-color: #e8e8e8;
    }
`;
const Pager = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        background-color: transparent;
        color: #2d2dcf;
        border: none;
        font-size: 16px;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;



export default function Posts() {

    const query = new URLSearchParams(useLocation().search);
    const history = useHistory();

    const {state, dispatch} = useStore();
    
    const [params, setParams] = useState<paramsArticle>({
        page: Number(query.get('page')) || 1,
        search: query.get('search') || ''
    });

    useEffect(() => {
        dispatch(actions.loadingArticles());
        api.articles.list({page: params.page, search: params.search}).then(articles => {
            dispatch(actions.fetchArticles(articles));
        });
    }, [api, params])

    useEffect(() => {
        history.push(`?page=${params.page}&search=${params.search}`);
    }, [params])

    const handlerSearch = useCallback(debounce((e) => setParams(() => ({page: 1, search: e.target.value})), 1200), []);
    
    function searchArticles(e: React.ChangeEvent<HTMLInputElement>) {
        handlerSearch(e);
    }

    function goToDetail(webUrlArticle: string) {
        history.push(`/detail?page=${params.page}&search=${params.search}&web_url=${webUrlArticle}`);
    }
    
    return (
        <Wrapper>
            <InputSearch value={params.search || ''} onChange={e => searchArticles(e)}/>
            {state.loadingArticles ? 
                <div>Loading...</div>
            : state.articles.length > 0 ?
                <div>
                    <H2>Results:</H2>
                    <List data-testid="list-articles">
                        {state.articles.map((article: Article, index) => 
                            <ArticleItem onClick={() => goToDetail(article.web_url)} key={index}>
                                {article.headline.main}
                            </ArticleItem>
                        )}   
                    </List>
                </div>
                : 
                <div>Articles not found</div>
            }
            {!state.loadingArticles && 
             <Pager>
                <div>{params.page !== 1 && <button onClick={() => setParams(prevState => ({...prevState, page: prevState.page-1}))}> {"< Prev Page"} </button>}</div>
                <div>{<button onClick={() => setParams(prevState => ({...prevState, page: prevState.page+1}))}> {"Next Page >"} </button>}</div>
             </Pager>
            }   
        </Wrapper>
    )
}

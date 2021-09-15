import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api';
import { useStore } from '../../store';
import { actions } from '../../store/actions';
import { Article } from '../../types/article';
import { paramsArticle } from '../../types/paramsArticle';
import { formatDateFromString } from '../../utils/date';

const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    gap: 28px;
`;
const ArticleContent = styled.div`
    display: flex;
    flex-direction:column;
    gap: 28px;
`;
const H2 = styled.h2`
    font-size: 32px;
    font-weight: 700;
    margin: 0;
`;
const StyledLink = styled(Link)`
    color: #3b70c6;
    font-size: 18px;
    font-weight: 700;
`;

const CustomLink = styled.a`
    color: #3b70c6;
    font-size: 18px;
    font-weight: 700;
    text-decoration:underline;
    cursor: pointer;
`;

export default function PostDetail() {

    const query = new URLSearchParams(useLocation().search);

    const webUrlArticle = query.get('web_url');

    const {state, dispatch} = useStore();

    const [article, setArticle] = useState<Article | null>(null);

    const [params,] = useState<paramsArticle>({
        page: Number(query.get('page')) || 1,
        search: query.get('search') || ''
    });

    useEffect(() => {
        if(state.articles.length) {
            getArticle(state.articles);
            return;
        }
        dispatch(actions.loadingArticles());
        api.articles.list({page: params.page, search: params.search}).then(articles => {
            dispatch(actions.fetchArticles(articles));
            getArticle(articles);
        });
    }, [api, params])

    function getArticle(articles: Article[]) {
        const article = articles.find(article => article.web_url === webUrlArticle);
        setArticle(article ? article : null);
    }

    return (
        <Wrapper>
            <StyledLink to={`/?page=${params.page}&search=${params.search}`}> {"< Go to results page"} </StyledLink>
                {state.loadingArticles ?
                <div>Loading...</div>
                :  
                article ? 
                <ArticleContent data-testid="article-content">
                    <H2>{article.headline.main}</H2>
                    <div>{formatDateFromString(article.pub_date, 'en-US')}</div>
                    <div>{article.lead_paragraph}</div>
                    <CustomLink href={article.web_url} target="_blank"> Read the full article </CustomLink>
                </ArticleContent>
                :
                <div>Article not found</div>}
        </Wrapper>
    )
}

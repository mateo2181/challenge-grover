import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { StoreProvider } from '../../store';
import PostDetail from '.';
import { articles, mockArticles } from '../../__mocks__/api';

const historyDefault = createBrowserHistory();

const customRender = (ui: JSX.Element, renderOptions: any, history: any = historyDefault) => {
    return render(
        <Router history={history}>
            <StoreProvider>{ui}</StoreProvider>
        </Router>,
        renderOptions,
    )
}

jest.mock("axios");

test('Render article getting web_url from URL', async () => {
    mockArticles();

    const history = createBrowserHistory();
    const article = articles[0];
    history.push(`?web_url=${article.web_url}`);
    const { getByTestId } = await waitFor(() => customRender(<PostDetail />, {}, history));
    const articleContent = getByTestId('article-content');
    expect(articleContent).toHaveTextContent(article.headline.main);
    expect(articleContent).toHaveTextContent(article.lead_paragraph);
})

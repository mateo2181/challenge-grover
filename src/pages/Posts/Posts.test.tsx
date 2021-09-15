import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Posts from '.';
import { StoreProvider } from '../../store';
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

test('Render articles from Context', async () => {
  mockArticles();

  const { getByTestId } = customRender(<Posts />, {});
  await waitFor(() => expect(screen.getByText("Results:")).toBeInTheDocument());
  await waitFor(() => expect(getByTestId('list-articles').children).toHaveLength(articles.length));
})

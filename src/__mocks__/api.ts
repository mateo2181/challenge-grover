import axios from 'axios';
import { Article } from "../types/article";

export const articles: Article[] = [
    {
        document_type: "article",
        headline: { main: "Tonight, a Night at the Theater" },
        lead_paragraph: "It’s Tuesday. The costumes, the scenery, the makeup.",
        pub_date: "2021-09-14T09:12:49+0000",
        web_url: "https://www.nytimes.com/2021/09/14/nyregion/tonight-a-night-at-the-theater.html"
    },
    {
        document_type: "article",
        headline: { main: "Tonight, a Night at the Theater 2" },
        lead_paragraph: "It’s Tuesday. Tomorrow is Wednesday.",
        pub_date: "2021-09-15T09:12:49+0000",
        web_url: "https://www.nytimes.com/2021/09/14/nyregion/tonight-a-night-at-the-theater-2.html"
    }
];

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


export const mockArticles = () => { 
mockedAxios.get.mockResolvedValueOnce({
    data: {
      response: {
        docs: articles
      }
    }
  });
}
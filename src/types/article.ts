export interface Article {
    web_url: string;
    lead_paragraph: string;
    document_type: string;
    pub_date: string;
    headline: {
        main: string;
    }
}
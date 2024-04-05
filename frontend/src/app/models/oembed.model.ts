export interface OEmbedResponse {
    url: string;
    author_name: string;
    author_url: string;
    html: string;
    width: number;
    height: number | null;
    type: string;
    cache_age: string;
    provider_name: string;
    provider_url: string;
    version: string;
  }
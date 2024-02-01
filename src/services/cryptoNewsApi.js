import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': '79def42624msh8b314e3f33289d4p127477jsnf78ab0e278f0',
    'X-RapidAPI-Host': 'duckduckgo10.p.rapidapi.com'
};

const baseUrl = 'https://duckduckgo10.p.rapidapi.com';

const createNewsRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createNewsRequest(`/search/news?term=${newsCategory}&region=in-en&safeSearch=off`)
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
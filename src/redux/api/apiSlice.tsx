import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://books-backend-sever.onrender.com/api/v1/',
  }),
  tagTypes: ['reviews', 'updatebook', 'wishList'],
  endpoints: () => ({}),
});

// 0aGY1LqYTLKtovBA
// tech-net

import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/books',
    }),
    singleProduct: builder.query({
      query: (id) => ({ url: `/books/${id}` }),
    }),
    postBook: builder.mutation({
      query: (data) => ({
        url: `/books/`,
        method: 'POST',
        body: data,
      }),
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getComment: builder.query({
      query: (id) => ({ url: `/users/review/${id}` }),
      providesTags: ['reviews'],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `/users/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetProductsQuery,
  useSingleProductQuery,
  usePostCommentMutation,
  usePostBookMutation,
  useCreateUserMutation,
  useLoginUserMutation,
} = productApi;

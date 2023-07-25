import { api } from '@/redux/api/apiSlice';

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (search) => `books?searchTerm=${search}`,
      providesTags: ['reviews', 'updatebook'],
    }),
    singleBook: builder.query({
      query: (id) => ({ url: `/books/${id}` }),
      providesTags: ['updatebook'],
    }),
    postBook: builder.mutation({
      query: (data) => ({
        url: `/books/`,
        method: 'POST',
        body: data,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['updatebook'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['updatebook'],
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getReviews: builder.query({
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
    userWishList: builder.mutation({
      query: ({ email, data }) => ({
        url: `/users/wishList/${email}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['wishList'],
    }),
    getUserWishList: builder.query({
      query: (email) => ({ url: `/users/wishList/${email}` }),
      providesTags: ['wishList'],
    }),
    deleteWishList: builder.mutation({
      query: ({ email, data }) => ({
        url: `/users/wishList/${email}`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['wishList'],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetBooksQuery,
  useSingleBookQuery,
  usePostReviewMutation,
  usePostBookMutation,
  useCreateUserMutation,
  useLoginUserMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useUserWishListMutation,
  useGetUserWishListQuery,
  useDeleteWishListMutation,
} = booksApi;

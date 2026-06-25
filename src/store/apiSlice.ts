import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const wakatechApi = createApi({
  reducerPath: 'wakatechApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.wakatech.com/v1/' }),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (userId) => `users/${userId}`,
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useLoginUserMutation } = wakatechApi;
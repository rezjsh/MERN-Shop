import { USERS_URL } from "../constants";
import { emptySplitApi } from "./baseApi";

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation } = userApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  withCredentials: true,

  tagTypes: ["User", "Product", "Order", "Category"],

  endpoints: () => ({}),
});

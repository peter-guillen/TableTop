import type { ActivityLogEntry } from "../adminTypes.ts";
import { baseApi } from "../../../shared/api/baseApi.ts";

export const activityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Any write in any domain adds a log entry, and those writes don't
    // invalidate this, so the dashboard refetches it on every visit instead
    getActivity: builder.query<ActivityLogEntry[], void>({
      query: () => "/api/activity",
    }),
  }),
});

export const { useGetActivityQuery } = activityApi;

import { IRegion } from '@/interfaces/IRegion';
import { api } from '@/store/api/api';

export const regionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRegions: build.query<IRegion[], void>({
      query: () => '/common/country-list/',
    }),
  }),
  overrideExisting: true,
});

export const { useGetRegionsQuery } = regionsApi;

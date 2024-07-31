import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

import { api, BASE_URL } from './api';

import { getTokens } from '@/helpers/_index';
import { IListPromoCode, IPromoCode, IPromoCodeForm } from '@/interfaces/IPromoCode';

const EXCELS_DIR = FileSystem.documentDirectory + 'excels';

export const promoCodeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPromoCodesList: build.query<IListPromoCode[], void>({
      query: () => '/code/list/',
      extraOptions: {
        retry: 2,
      },
      providesTags: ['PromoCode'],
    }),
    getPromoPrize: build.mutation<any, { code: string; keyword?: string }>({
      query: ({ code, keyword }) => ({
        url: '/code/get_prize/',
        method: 'POST',
        body: {
          code,
          keyword,
        },
      }),
      invalidatesTags: ['Balance'],
    }),
    getPromoById: build.query<IPromoCode, string>({
      query: (id: string) => `/code/mycollection/${id}/`,
      extraOptions: {
        retry: 2,
      },
    }),
    createPromoCode: build.mutation<IPromoCode, FormData>({
      query: (promoCodeForm: FormData) => ({
        url: '/code/create/',
        method: 'POST',
        body: promoCodeForm,
      }),
      invalidatesTags: ['PromoCode', 'Balance'],
    }),
    changePromoStatus: build.mutation<{ status: 'a' | 'p' }, { codeId: number }>({
      query: ({ codeId }) => ({
        url: `/code/mycollection/${codeId}/`,
        method: 'PATCH',
      }),
    }),
    promoStatistics: build.query<any, { codeId: string; start_date: string; end_date: string }>({
      query: ({ codeId, start_date, end_date }) => ({
        url: `/code/mycollection/${codeId}/statistics/`,
        params: {
          start_date,
          end_date,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const saveInCacheAndShare = async (codeName: string, blob: Blob) => {
  try {
    await checkFile();

    const currDate = new Date().toLocaleDateString('en-GB').split('/').join('-');
    const fileUri = `${EXCELS_DIR}/${codeName.split(' ').join('_')}-${currDate}.xlsx`;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const readerResult = typeof reader.result === 'string' ? reader.result.split(',')[1] : '';
      await FileSystem.writeAsStringAsync(fileUri, readerResult, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await Sharing.shareAsync(fileUri);
    };
    reader.readAsDataURL(blob);
  } catch (e) {
    throw new Error('Error while saving file.');
  }
};

export const saveInStorage = async (codeName: string, blob: Blob) => {
  try {
    await checkFile();

    const currDate = new Date().toLocaleDateString('en-GB').split('/').join('-');
    const fileUri = `${EXCELS_DIR}/${codeName.split(' ').join('_')}-${currDate}.xlsx`;

    await mediaLibPermissionStatus();

    const reader = new FileReader();
    reader.onloadend = async () => {
      const readerResult = typeof reader.result === 'string' ? reader.result.split(',')[1] : '';
      await FileSystem.writeAsStringAsync(fileUri, readerResult, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const folder = await FileSystem.getInfoAsync(fileUri);
      console.log(folder);

      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync('Download');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Download', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    };

    reader.readAsDataURL(blob);
  } catch (error) {
    throw new Error('Error while saving file.');
  }
};

export const downloadExcel = async (codeId: string) => {
  try {
    const { access } = await getTokens();
    const response = await fetch(BASE_URL + `/code/excel/${codeId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (!response.ok) {
      const resErr = await response.json();
      throw new Error(resErr.detail);
    }

    return await response.blob();
  } catch (err) {
    throw new Error('Error while loading file!');
  }
};

export const checkFile = async () => {
  const dirInfo = await FileSystem.getInfoAsync(EXCELS_DIR);
  !dirInfo.exists && (await FileSystem.makeDirectoryAsync(EXCELS_DIR, { intermediates: true }));
};

export const mediaLibPermissionStatus = async () => {
  const permissions = await MediaLibrary.getPermissionsAsync();
  if (permissions.status !== 'granted') {
    await MediaLibrary.requestPermissionsAsync();
  }
};

export const {
  useGetPromoCodesListQuery,
  useGetPromoByIdQuery,
  useCreatePromoCodeMutation,
  useChangePromoStatusMutation,
  usePromoStatisticsQuery,
  useGetPromoPrizeMutation,
} = promoCodeApi;

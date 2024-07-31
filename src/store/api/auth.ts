import { LoginForm } from '@/screens/AuthScreens/LoginScreen/types';
import { RegistrationForm } from '@/screens/AuthScreens/RegistrationScreen/types';
import { api } from '@/store/api/api';

export type LoginResponse = {
  access: string;
  refresh: string;
};

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse | { detail: string }, LoginForm>({
      query({ phoneNumber, password }) {
        return {
          url: '/account/login/',
          method: 'POST',
          body: {
            phone_number: phoneNumber,
            password,
          },
        };
      },
      invalidatesTags: ['QrCode', 'Balance', 'PromoCode'],
    }),
    register: build.mutation<{ message: string }, Partial<RegistrationForm>>({
      query(form) {
        return {
          url: '/account/signup/',
          method: 'POST',
          body: form,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useRegisterMutation } = authApi;

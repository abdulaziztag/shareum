import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SerializedError } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { LoginForm } from './types';

import { AppInput, AppButton, AppText } from '@/components/_index';
import { setTokens } from '@/helpers/_index';
import { useActiveTheme, useAppDispatch } from '@/hooks/_index';
import { useLoginMutation } from '@/store/api/auth';
import { changeIsLoggedIn } from '@/store/features/utilsSlice';
import { RootStackType } from '@/types';

export const LoginScreen = () => {
  const activeTheme = useActiveTheme();
  const navigation = useNavigation<NavigationProp<RootStackType>>();
  const dispatch = useAppDispatch();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      password: '',
      phoneNumber: '',
    },
  });

  const submitData = async (formData: LoginForm) => {
    try {
      const result = await loginMutation(formData).unwrap();
      const { access, refresh } = result as { access: string; refresh: string };
      dispatch(changeIsLoggedIn(true));
      await setTokens(access, refresh);
    } catch (e: SerializedError | any) {
      Toast.show({ type: 'error', text1: e.data.detail ?? 'Something went wrong :(' });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: activeTheme.backgroundPrimary }]}
      keyboardShouldPersistTaps="handled">
      <AppText style={styles.headerText} translatable>
        signIn
      </AppText>
      <AppInput<LoginForm>
        control={control}
        translatable
        name="phoneNumber"
        rules={{
          required: t('errorTip'),
          min: 0,
        }}
        label="phoneNumberLabel"
        placeholder="phoneNumberPlaceholder"
        containerStyles={{ minHeight: 90 }}
        type="phone-pad"
        errorMessage={errors?.phoneNumber?.message}
      />
      <AppInput<LoginForm>
        name="password"
        control={control}
        translatable
        rules={{
          required: t('errorTip'),
          min: 0,
        }}
        label="passwordLabel"
        placeholder="passwordPlaceholder"
        containerStyles={{ minHeight: 90 }}
        secureText
        errorMessage={errors?.password?.message}
      />
      <AppButton
        title="enter"
        translatable
        onClick={handleSubmit(submitData)}
        btnStyles={styles.loginBtn}
        loader={isLoading}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <View style={[styles.divider, { backgroundColor: activeTheme.textSecondary }]} />
        <AppText style={{ marginHorizontal: 10 }} translatable>
          noAccount
        </AppText>
        <View style={[styles.divider, { backgroundColor: activeTheme.textSecondary }]} />
      </View>
      <AppButton
        title="signUp"
        translatable
        onClick={() => {
          navigation.navigate('Registration');
        }}
        btnStyles={{ borderColor: activeTheme.textSecondary, ...styles.signUpBtn }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    flex: 1,
  },
  signUpBtn: {
    flex: 0,
    backgroundColor: 'transparent',
    borderWidth: 2,
    marginHorizontal: 0,
    borderRadius: 100,
  },
  loginBtn: {
    flex: 0,
    marginHorizontal: 0,
    borderRadius: 100,
    marginTop: 40,
  },
});

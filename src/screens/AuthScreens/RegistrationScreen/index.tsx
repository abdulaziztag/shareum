import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SerializedError } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { RegistrationForm } from './types';

import { AppButton, AppInput, AppText } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';
import { useRegisterMutation } from '@/store/api/auth';
import { RootStackType } from '@/types';

export const RegistrationScreen = () => {
  const activeTheme = useActiveTheme();
  const navigation = useNavigation<NavigationProp<RootStackType>>();
  const [registrationMutation, { isLoading }] = useRegisterMutation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationForm>({
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password', '');

  const submitForm = async ({ confirmPassword, ...form }: RegistrationForm) => {
    try {
      await registrationMutation(form).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Account created successfully',
        text2: 'Please log in',
      });
      navigation.navigate('Login');
    } catch (e: SerializedError | any) {
      console.log(e);
      Toast.show({ type: 'error', text1: e.data.detail || 'Something went wrong!' });
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: activeTheme.backgroundPrimary }}>
      <ScrollView contentContainerStyle={styles.container}>
        <AppText style={styles.headerText}>Sign Up</AppText>
        <AppInput<RegistrationForm>
          control={control}
          rules={{
            required: 'This field is required',
            min: 0,
          }}
          label="First name"
          placeholder="Please enter first name"
          clearButton={false}
          errorMessage={errors?.first_name?.message}
          containerStyles={{ minHeight: 90 }}
          name="first_name"
        />
        <AppInput<RegistrationForm>
          label="Last name"
          control={control}
          placeholder="Please enter last name"
          clearButton={false}
          name="last_name"
          containerStyles={{ minHeight: 75 }}
        />
        <AppInput<RegistrationForm>
          label="Phone number"
          control={control}
          rules={{
            required: 'This field is required',
          }}
          placeholder="Please phone number"
          name="phone_number"
          clearButton={false}
          containerStyles={{ minHeight: 90 }}
          errorMessage={errors?.phone_number?.message}
          type="phone-pad"
        />
        <AppInput<RegistrationForm>
          control={control}
          rules={{
            required: 'This field is required',
          }}
          label="Password"
          name="password"
          placeholder="Please enter password"
          clearButton={false}
          containerStyles={{ minHeight: 90 }}
          errorMessage={errors?.password?.message}
          secureText
        />
        <AppInput<RegistrationForm>
          control={control}
          rules={{
            validate: (value) => value === password || 'The passwords do not match',
          }}
          label="Confirm password"
          placeholder="Please enter password"
          name="confirmPassword"
          clearButton={false}
          containerStyles={{ minHeight: 90 }}
          errorMessage={errors?.confirmPassword?.message}
          secureText
        />
        <AppButton
          title="Enter"
          onClick={handleSubmit(submitForm)}
          btnStyles={styles.loginBtn}
          loader={isLoading}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <View style={{ backgroundColor: activeTheme.textSecondary, ...styles.divider }} />
          <AppText style={styles.textMini}>Don't have an account?</AppText>
          <View style={{ backgroundColor: activeTheme.textSecondary, ...styles.divider }} />
        </View>
        <AppButton
          title="Sign in"
          onClick={() => {
            navigation.navigate('Login');
          }}
          btnStyles={{ borderColor: activeTheme.textSecondary, ...styles.signUpBtn }}
        />
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    flex: 1,
  },
  textMini: {
    marginHorizontal: 10,
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

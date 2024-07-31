import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SerializedError } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import { UploadImage } from '../components/UploadImage';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { AppText } from '@/components/AppText';
import { useActiveTheme } from '@/hooks/_index';
import { useAppSelector } from '@/hooks/storeHooks';
import { IBalance } from '@/interfaces/IBalance';
import { CreateFormTypes } from '@/screens/CreateCode/types';
import { useGetBalanceQuery } from '@/store/api/balance';
import { useCreateQrCodeMutation } from '@/store/api/qrCode';
import { RootStackType } from '@/types';

export default ({ chosenCryptoId }: { chosenCryptoId: number }) => {
  const activeTheme = useActiveTheme();
  const { data } = useGetBalanceQuery();
  const [createCodeMutation, { isLoading }] = useCreateQrCodeMutation();
  const regions = useAppSelector((state) => state.region.regions);
  const navigation = useNavigation<NavigationProp<RootStackType>>();
  const crypto = data?.find((crypto) => crypto.crypto.id === chosenCryptoId) as IBalance;

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormTypes>({
    defaultValues: {
      totalAmount: '',
      perScanAmount: '',
      name: '',
      description: '',
    },
  });
  const totalAmount = watch('totalAmount') as unknown as number;
  const totalAmountHint = `≈ ${(totalAmount * crypto.crypto.price).toFixed(2)} USD \n Available: ${
    crypto.available
  } ${crypto.crypto.slug}`;
  const perScanAmount = watch('perScanAmount') as unknown as number;
  const perScanAmountHint = `≈ ${(perScanAmount * crypto.crypto.price).toFixed(
    2
  )} USD\n Total scans: ${
    +totalAmount !== 0 && +perScanAmount !== 0 ? Math.floor(totalAmount / perScanAmount) : 0
  }`;

  const [selectedRegions, setSelectedRegions] = useState('');
  const [imageUri, setImageUri] = useState<{ uri: string; imgName: string; type: string } | null>(
    null
  );

  useEffect(() => {
    const selectedRegions = regions.filter((region) => region.state);
    const isAll = regions.every((region) => region.state);

    if (isAll) setSelectedRegions('All regions selected');
    else if (selectedRegions.length <= 7) {
      setSelectedRegions(selectedRegions.map((region) => region.name).join(' ,'));
    } else {
      setSelectedRegions(
        selectedRegions
          .map((region) => region.name)
          .splice(7)
          .join(',') + ` and ${selectedRegions.length - 7} regions`
      );
    }
  }, [regions]);

  const createQr = async ({ totalAmount, perScanAmount, description, name }: CreateFormTypes) => {
    try {
      const selectedRegions = regions.filter((region) => region.state);
      const isAll = regions.every((region) => region.state);

      const qrFormData = new FormData();
      qrFormData.append('balance', totalAmount);
      qrFormData.append('per_user', perScanAmount);
      qrFormData.append('name', name);
      qrFormData.append('description', description);
      qrFormData.append('crypto_network', chosenCryptoId.toString());
      !isAll && qrFormData.append('countries_str', selectedRegions.map((r) => r.id).join(','));
      //imageUri && qrFormData.append('image', imageUri as any);

      await createCodeMutation(qrFormData).unwrap();
      navigation.navigate('CodesList');

      Toast.show({
        type: 'success',
        text1: 'Code created successfully!',
        text2: 'Check it out in list of codes!',
      });
    } catch (e: SerializedError | any) {
      Toast.show({
        type: 'error',
        text1: e.data.detail || 'Something went wrong, try again later.',
      });
    }
  };

  return (
    <>
      <AppInput<CreateFormTypes>
        control={control}
        name="totalAmount"
        rules={{
          required: 'This field is required',
          min: 0,
        }}
        label="Total amount"
        placeholder="Please enter total amount"
        type="numeric"
        hint={totalAmountHint}
        appendText={crypto.crypto.slug}
        containerStyles={{ marginTop: 20, paddingHorizontal: 10 }}
        clearButton={false}
        errorMessage={errors.totalAmount && errors.totalAmount.message}
      />
      <AppInput<CreateFormTypes>
        label="Per scan"
        placeholder="Please enter amount per scan"
        type="numeric"
        control={control}
        name="perScanAmount"
        rules={{
          required: 'This field is required',
          min: 0,
        }}
        hint={perScanAmountHint}
        appendText={crypto.crypto.slug}
        containerStyles={{ paddingHorizontal: 10 }}
        clearButton={false}
        errorMessage={errors.perScanAmount && errors.perScanAmount.message}
      />
      <View style={[styles.divider, { backgroundColor: activeTheme.textSecondary }]} />
      <AppInput<CreateFormTypes>
        control={control}
        name="name"
        rules={{
          required: 'This field is required',
          minLength: 0,
        }}
        label="Name"
        containerStyles={{ marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Please enter QR name"
        errorMessage={errors.name && errors.name.message}
      />
      <AppInput<CreateFormTypes>
        control={control}
        name="description"
        label="Description (Optional)"
        placeholder="Please enter QR description"
        isTextArea
        containerStyles={{
          paddingHorizontal: 10,
        }}
        inputStyles={{
          paddingLeft: 10,
        }}
      />
      <View style={[styles.divider, { backgroundColor: activeTheme.textSecondary }]} />
      <TouchableOpacity
        style={styles.countriesContainer}
        onPress={() => navigation.navigate('Regions')}>
        <AppText style={styles.countriesTitle}>Available regions</AppText>
        <AntDesign name="right" size={20} color={activeTheme.textPrimary} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10, flexWrap: 'wrap' }}>
        <AppText style={styles.countriesText} secondary>
          {selectedRegions}
        </AppText>
      </View>
      <UploadImage pickedImage={setImageUri} />
      <AppButton
        title="Create QR"
        loader={isLoading}
        onClick={handleSubmit(createQr)}
        btnStyles={{ marginBottom: 40 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 3,
    marginVertical: 10,
  },
  countriesContainer: {
    marginVertical: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  countriesTitle: {
    fontSize: 18,
  },
  countriesText: {
    paddingRight: 5,
  },
});

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SerializedError } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { AppInput, AppButton } from '@/components/_index';
import { useActiveTheme, useAppSelector } from '@/hooks/_index';
import { IBalance, IPromoCodeForm } from '@/interfaces/_index';
import { UploadImage } from '@/screens/CreateCode/components/UploadImage';
import { PromoCreateFormTypes } from '@/screens/CreateCode/types';
import { useGetBalanceQuery } from '@/store/api/balance';
import { useCreatePromoCodeMutation } from '@/store/api/promoCode';
import { RootStackType } from '@/types';

export default ({ chosenCryptoId }: { chosenCryptoId: number }) => {
  const activeTheme = useActiveTheme();
  const { data, isSuccess } = useGetBalanceQuery();
  //  const regions = useAppSelector((state) => state.region.regions);
  //  const [selectedRegions, setSelectedRegions] = useState('');
  const [createCodeMutation, { isLoading }] = useCreatePromoCodeMutation();
  const [imageUri, setImageUri] = useState<{ uri: string; imgName: string; type: string } | null>(
    null
  );
  const navigation = useNavigation<NavigationProp<RootStackType>>();
  const crypto = data?.find((crypto) => crypto.crypto.id === chosenCryptoId) as IBalance;

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PromoCreateFormTypes>({
    defaultValues: {
      totalAmount: '',
      perScanAmount: '',
      name: '',
      description: '',
      keyword: '',
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

  /*  useEffect(() => {
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
  }, [regions]);*/

  const createPromo = async ({
    totalAmount,
    perScanAmount,
    description,
    name,
    keyword,
  }: PromoCreateFormTypes) => {
    try {
      /*const selectedRegions = regions.filter((region) => region.state);
      const isAll = regions.every((region) => region.state);*/

      const promoCodeFormData = new FormData();

      promoCodeFormData.append('balance', totalAmount);
      promoCodeFormData.append('per_user', perScanAmount);
      promoCodeFormData.append('name', name);
      promoCodeFormData.append('description', description);
      promoCodeFormData.append('crypto_network', chosenCryptoId.toString());
      promoCodeFormData.append('keyword', keyword);
      /*!isAll &&
        promoCodeFormData.append('countries_str', selectedRegions.map((r) => r.id).join(','));
*/
      await createCodeMutation(promoCodeFormData).unwrap();

      navigation.navigate('CodesList');
      Toast.show({
        type: 'success',
        text1: 'Code created successfully!',
        text2: 'Check it out in list of codes!',
      });
    } catch (e: SerializedError | any) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: e.data.detail,
      });
    }
  };

  return (
    <>
      <AppInput<PromoCreateFormTypes>
        control={control}
        placeholder="Please enter total amount"
        label="Total amount"
        hint={totalAmountHint}
        appendText={crypto.crypto.slug}
        type="numeric"
        name="totalAmount"
        rules={{
          required: 'This field is required',
          min: 0,
        }}
        clearButton={false}
        containerStyles={{ marginTop: 20, paddingHorizontal: 10 }}
        errorMessage={errors.totalAmount && errors.totalAmount.message}
      />
      <AppInput<PromoCreateFormTypes>
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
      <View style={[styles.divider, { backgroundColor: activeTheme.mainColor }]} />
      <AppInput<PromoCreateFormTypes>
        label="Name"
        control={control}
        name="name"
        rules={{
          required: 'This field is required',
          minLength: 0,
        }}
        containerStyles={{ marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Please enter name"
        errorMessage={errors.name && errors.name.message}
      />
      <AppInput<PromoCreateFormTypes>
        control={control}
        name="description"
        label="Description (Optional)"
        placeholder="Please enter description"
        isTextArea
        containerStyles={{
          paddingHorizontal: 10,
        }}
        inputStyles={{
          paddingLeft: 10,
        }}
      />
      <AppInput<PromoCreateFormTypes>
        control={control}
        name="keyword"
        label="Keyword (Optional)"
        containerStyles={{ marginTop: 20, paddingHorizontal: 10 }}
        placeholder="Please keyword"
      />
      <View style={[styles.divider, { backgroundColor: activeTheme.mainColor }]} />
      <UploadImage pickedImage={setImageUri} />
      <AppButton loader={isLoading} title="Create promo" onClick={handleSubmit(createPromo)} />
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 3,
    marginVertical: 10,
  },
});

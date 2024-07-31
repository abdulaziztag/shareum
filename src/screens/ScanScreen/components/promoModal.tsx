import { SerializedError } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { Modal, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { AppInput } from '@/components/AppInput';
import { AppText } from '@/components/AppText';
import { useActiveTheme } from '@/hooks/_index';
import { useGetPromoPrizeMutation } from '@/store/api/promoCode';

export const PromoModal = ({
  modalVisible,
  closeModal,
}: {
  modalVisible: boolean;
  closeModal: () => void;
}) => {
  const activeTheme = useActiveTheme();
  const [codeSubmitMutation, { isLoading }] = useGetPromoPrizeMutation();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string; keyword: string }>({
    defaultValues: {
      code: '',
      keyword: '',
    },
  });

  const submit = async ({ code, keyword }: { code: string; keyword: string }) => {
    try {
      const payload: { code: string; keyword?: string } = { code };
      if (keyword && keyword.trim() !== '') {
        payload.keyword = keyword;
      }
      console.log(payload);
      await codeSubmitMutation(payload).unwrap();
      Toast.show({ type: 'success', text1: 'Successfully got a prize!' });
      setValue('code', '');
    } catch (e: SerializedError | any) {
      Toast.show({ type: 'error', text1: e.data.detail });
    }
  };

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={styles.overlay}>
        <Toast />
        <AppCard
          style={{
            alignSelf: 'center',
            borderRadius: 10,
            width: '90%',
            zIndex: -1,
            flexDirection: 'column',
            padding: 0,
          }}>
          <AppText style={styles.title} bold translatable>
            getPrize
          </AppText>
          <AppInput
            control={control}
            rules={{
              required: 'This field is required',
              min: 0,
            }}
            name="code"
            placeholder="Code"
            onClearClicked={() => setValue('code', '')}
            containerStyles={{ marginHorizontal: 10 }}
            errorMessage={errors?.code?.message}
          />
          <AppInput
            control={control}
            name="keyword"
            placeholder="Keyword"
            onClearClicked={() => setValue('keyword', '')}
            containerStyles={{ marginHorizontal: 10 }}
            errorMessage={errors?.keyword?.message}
          />
          <View style={styles.actions}>
            <AppButton
              onClick={closeModal}
              title="close"
              translatable
              fullWidth
              btnStyles={{
                borderBottomLeftRadius: 10,
                backgroundColor: activeTheme.backgroundPrimary,
                ...styles.btnStyles,
              }}
            />
            <AppButton
              onClick={handleSubmit(submit)}
              title="submit"
              translatable
              fullWidth
              loader={isLoading}
              btnStyles={{ borderBottomRightRadius: 10, ...styles.btnStyles }}
            />
          </View>
        </AppCard>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .6)',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginVertical: 20,
    fontSize: 25,
    alignSelf: 'center',
  },
  actions: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 0,
  },
  btnStyles: {
    margin: 0,
    borderRadius: 0,
  },
  divider: {
    position: 'absolute',
    top: 5,
    width: 50,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#969494',
  },
});

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Image, Modal, StyleSheet, View } from 'react-native';

import { AppCard, AppText, AppIconButton } from '@/components/_index';
import { useActiveTheme } from '@/hooks/_index';

export const QrModal = ({
  modalVisible,
  closeModal,
  error,
  crypto_slug,
  description,
  per_user,
  isSuccess,
  isLoading,
}: {
  modalVisible: boolean;
  closeModal: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  per_user: number;
  crypto_slug: string;
  description: string;
  error: { data: { detail: string } };
}) => {
  const activeTheme = useActiveTheme();

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={styles.overlay}>
        <AppCard
          style={{
            minHeight: 175,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isLoading
              ? activeTheme.backgroundPrimary
              : isSuccess
              ? 'rgba(22, 163, 74, 1)'
              : activeTheme.error,
          }}>
          {isLoading ? (
            <ActivityIndicator />
          ) : isSuccess ? (
            <>
              <Image
                source={require('../../../../assets/cardBackground2.jpg')}
                style={{
                  borderColor: activeTheme.textPrimary,
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  position: 'absolute',
                  top: -50,
                  alignSelf: 'center',
                  borderWidth: 1,
                }}
              />
              <View>
                <AppText style={{ alignSelf: 'center', fontSize: 24 }} bold>
                  +{per_user} {crypto_slug}
                </AppText>
                <AppText style={{ alignSelf: 'center', fontSize: 20 }}>{description}</AppText>
              </View>
            </>
          ) : (
            <AppText>{!!error && error.data.detail}</AppText>
          )}
        </AppCard>
        {!isLoading && (
          <AppIconButton
            onClick={closeModal}
            containerStyles={{ flex: 0, marginTop: 20 }}
            iconBtnStyles={{ borderColor: 'green', borderWidth: 2 }}>
            <MaterialCommunityIcons name="check" size={40} color="#38a169" />
          </AppIconButton>
        )}
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
  body: {
    position: 'relative',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
    width: '95%',
    shadowColor: '#000',
    paddingTop: 10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
});

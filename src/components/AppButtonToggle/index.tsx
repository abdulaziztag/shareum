import { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppButtonToggleProps } from '@/components/AppButtonToggle/types';

export const AppButtonToggle: FC<AppButtonToggleProps> = ({
  children,
  initialActiveButtonId,
  onChange,
}) => {
  const [activeButton, setActiveButton] = useState<number>(initialActiveButtonId);

  const changeActiveBtn = (id: number) => {
    onChange && onChange(id);
    setActiveButton(id);
  };

  return (
    <View style={styles.container}>
      {children.map((btn, id) => (
        <AppButton
          key={id}
          active={id === activeButton}
          btnStyles={styles.button}
          title={btn}
          onClick={() => changeActiveBtn(id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    marginHorizontal: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  button: {
    margin: 0,
    flex: 1,
    borderRadius: 0,
  },
});

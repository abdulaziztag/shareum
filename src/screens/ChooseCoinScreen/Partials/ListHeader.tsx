import { AppInput } from '@/components/AppInput';

export const ListHeader = ({
  inputHandler,
  inputValue,
}: {
  inputHandler: (value: string) => void;
  inputValue: string;
}) => {
  return (
    <>
      <AppInput
        name="searchCoin"
        value={inputValue}
        placeholder="Search"
        onChangeText={inputHandler}
        prependIcon="search1"
      />
    </>
  );
};

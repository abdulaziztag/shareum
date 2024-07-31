export type AppButtonToggleProps = {
  children: JSX.Element[];
  initialActiveButtonId: number;
  onChange?: (activeId: number) => void;
};

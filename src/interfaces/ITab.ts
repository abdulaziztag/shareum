export interface ITab {
  name: string;
  component: ({ navigation }: { navigation: any }) => JSX.Element;
  iconName: 'home' | 'qr-code' | 'person';
  iconNameOutlined: 'home-outline' | 'qr-code-outline' | 'person-outline';
}

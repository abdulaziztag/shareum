export interface ITab {
	name: string,
	component: ({navigation}: { navigation: any; }) => JSX.Element,
	iconName: 'md-home' | 'md-qr-code' | 'md-person',
	iconNameOutlined: 'md-home-outline' | 'md-qr-code-outline' | 'md-person-outline'
}
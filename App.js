import React from 'react';
import { StyleSheet, View } from 'react-native';
import List from './screens/List';
import AppBar from './components/AppBar';

export default class App extends React.Component {
	render () {
		return (
			<View style={styles.container}>
				<AppBar/>
				<List/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

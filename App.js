import React from 'react';
import { StyleSheet, View } from 'react-native';
import List from './screens/List';
import { ListContextProvider } from './helpers/ListContext';

export default class App extends React.Component {
	render () {
		return (
			<ListContextProvider>
				<View style={styles.container}>
					<List/>
				</View>
			</ListContextProvider>
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

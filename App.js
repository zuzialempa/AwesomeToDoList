import React from 'react';
import { StyleSheet, View } from 'react-native';
import List from './screens/List';
import { FunctionContextProvider } from './helpers/FunctionContext';

export default class App extends React.Component {

	render () {
		return (
			<FunctionContextProvider>
				<View style={styles.container}>
					<List/>
				</View>
			</FunctionContextProvider>
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

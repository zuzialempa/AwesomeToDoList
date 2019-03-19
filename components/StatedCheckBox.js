import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import checkBoxStates from '../configuration/StatedCheckBox';
import PropTypes from 'prop-types';
import { FunctionContext } from '../helpers/FunctionContext';

class StatedCheckBox extends Component {
	constructor (props) {
		super(props);
		this.state = {
			checkBoxState: checkBoxStates[0]
		};
    }
	render () {
		const { title } = this.props;
		return (
            <FunctionContext.Consumer>
                { value =>
                    <CheckBox
                        {...this.state.checkBoxState}
                        containerStyle ={styles.checkBox}
                        title={title.text === '' ? ' ' : title.text}
                        onPress={event => {
                            this.setState(state => {
                                return {checkBoxState: value.handleOnPress(state.checkBoxState)};
                            });
                        }}
                        onLongPress={event => value.changeLongPressedCheckBox(title)}
                    />
                }
            </FunctionContext.Consumer>
		);
	}
}
const styles = StyleSheet.create({
	checkBox: {
        borderRadius: 5
	}
});
StatedCheckBox.propTypes = {
    title: PropTypes.object
};
export default StatedCheckBox;

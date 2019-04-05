import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const StatedCheckBox = ({ title, handleOnPress, handleLongPress }) => {
    return <CheckBox
            {...title.status}
            containerStyle ={styles.checkBox}
            title={title.text === '' ? ' ' : title.text}
            onPress={event => handleOnPress(title)}
            onLongPress={event => handleLongPress(title)}
        />;
};
const styles = StyleSheet.create({
	checkBox: {
        borderRadius: 5,
        backgroundColor: 'white'
	}
});
StatedCheckBox.propTypes = {
    title: PropTypes.object,
    handleOnPress: PropTypes.func,
    handleLongPress: PropTypes.func
};
export default StatedCheckBox;

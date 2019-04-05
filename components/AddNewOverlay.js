import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import { PropTypes } from 'prop-types';
const {height, width} = Dimensions.get('window');
class AddNewOverlay extends Component {
    constructor (props) {
        super(props);
        this.state = {
            textValue: ' '
        };
    }
    render () {
        const { onPressDone } = this.props;
        const { textValue } = this.state;
        return (
            <Overlay
                isVisible={this.props.isVisible}
                overlayStyle={styles.overlayStyle}
            >
                <>
                    <Input
                        placeholder='write your TODO'
                        onChange={event => {
                            this.setState({textValue: event.nativeEvent.text});
                        }}
                    />
                    <Button
                        onPress={event => onPressDone(event, textValue)}
                        title='Done'
                        buttonStyle={ styles.doneButton }
                        accessibilityLabel='Add new TODO element'
                    />
                </>
            </Overlay>
        );
    }
}
const styles = StyleSheet.create({
	overlayStyle: {
        width: width*0.8,
        height: height*0.3
    },
    doneButton: {
        marginTop: 15,
        backgroundColor: 'red'
    }
});
AddNewOverlay.defaultProps = {
    isVisible: true
};
AddNewOverlay.propTypes = {
    isVisible: PropTypes.bool,
    onPressDone: PropTypes.func
};
export default AddNewOverlay;

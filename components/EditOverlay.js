import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import { PropTypes } from 'prop-types';
var {height, width} = Dimensions.get('window');
class EditOverlay extends Component {
    constructor (props) {
        super(props);
        this.state = {
            textValue: props.title
        };
    }
    shouldComponentUpdate (nextProps, prevState) {
        if (nextProps.title.id !== prevState.textValue.id) {
            this.setState({textValue: nextProps.title});
            return true;
        }
        return false;
    }
    render () {
        return (
            <Overlay
                isVisible={this.props.isVisible}
                overlayStyle={styles.overlayStyle}
            >
                <>
                    <Input
                        onChange={event => {
                            const newValue = this.state.textValue;
                            newValue.text = event.nativeEvent.text;
                            this.setState({textValue: newValue});
                        }}
                        defaultValue={this.props.title.text}
                    />
                    <Button
                         onPress={event => this.props.onPressDone(event, this.state.textValue)}
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
EditOverlay.defaultProps = {
    isVisible: true
};
EditOverlay.propTypes = {
    title: PropTypes.object,
    isVisible: PropTypes.bool,
    onPressDone: PropTypes.func
};
export default EditOverlay;

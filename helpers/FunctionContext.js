import React, { Component } from 'react';
import checkBoxStates from '../configuration/StatedCheckBox';
import { PropTypes } from 'prop-types';
const FunctionContext = React.createContext();
class FunctionContextProvider extends Component {
    constructor (props) {
        super(props);
        this.changeLongPressedCheckBox=this.changeLongPressedCheckBox.bind(this);
        this.handleOnPress=this.handleOnPress.bind(this);
        this.state = {
            checkBoxStates: checkBoxStates,
            longPressedCheckBox: {
                text: '',
                id: -1
            },
            changeLongPressedCheckBox: this.changeLongPressedCheckBox,
            handleOnPress: this.handleOnPress
        };
    }
    changeLongPressedCheckBox (title) {
        this.setState({longPressedCheckBox: title});
    }
    handleOnPress (checkBoxState) {
        const indexOfCurrentState = checkBoxStates.indexOf(checkBoxState);
        const indexOfState = indexOfCurrentState === checkBoxStates.length - 1 ? 0 : checkBoxStates.indexOf(checkBoxState) + 1;
        const newCheckBoxState = checkBoxStates[indexOfState];
        return newCheckBoxState;
    }
    render () {
        const { children } = this.props;
        return (
            <FunctionContext.Provider value={this.state}>
                { children }
            </FunctionContext.Provider>
        );
    }
}
FunctionContextProvider.propTypes = {
    children: PropTypes.object
};
export {
    FunctionContext,
    FunctionContextProvider
};


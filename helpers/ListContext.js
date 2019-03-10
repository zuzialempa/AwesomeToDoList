import React, { Component } from 'react';
import checkBoxStates from '../configuration/StatedCheckBox';
import { PropTypes } from 'prop-types';
const ListContext = React.createContext();
class ListContextProvider extends Component {
    constructor (props) {
        super(props);
        this.changeLongPressedCheckBox=this.changeLongPressedCheckBox.bind(this);
        this.handleOnPress=this.handleOnPress.bind(this);
        this.state = {
            list: [{text: 'example', id: 0, status: checkBoxStates[0]}],
            checkBoxStates: checkBoxStates,
            longPressedCheckBox: {
                text: '',
                id: -1,
                status: { }
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
            <ListContext.Provider value={this.state}>
                { children }
            </ListContext.Provider>
        );
    }
}
ListContextProvider.propTypes = {
    children: PropTypes.object
};
export {
    ListContext,
    ListContextProvider
};


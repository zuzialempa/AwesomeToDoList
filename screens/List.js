import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import StatedCheckBoxList from '../components/StatedCheckBoxList';
import AddNewOverlay from '../components/AddNewOverlay';
import { FunctionContext } from '../helpers/FunctionContext';
import EditOverlay from '../components/EditOverlay';
const defaultObject = {
    text: '',
    id: -1
};
class List extends Component {
	constructor (props){
		super(props);
        this.onPressedAddElement = this.onPressedAddElement.bind(this);
        this.onPressDone = this.onPressDone.bind(this);
        this.handleOnEditDelete = this.handleOnEditDelete.bind(this);
        this.handleOnEditDone = this.handleOnEditDone.bind(this);
		this.state = {
            list: [{text: 'example', id: 0}],
            addNewVisibility: false
		};
    }
    handleOnEditDone (changeLongPressedCheckBox, element) {
        const { list } = this.state;
        list[list.indexOf(list.find(item => item.id === element.id))].text = element.text;
        changeLongPressedCheckBox(defaultObject);
        this.setState({list: list});
    }
	onPressedAddElement (){
        this.setState({addNewVisibility: true});
    }
    onPressDone (event, text) {
        const { list } = this.state;
        const newId = list.length === 0 ? 0 : list[list.length - 1].id + 1;
        list.push({text: text, id: newId});
        this.setState({
            list: list,
            addNewVisibility: false
        });
    }
    async handleOnEditDelete (changeLongPressedCheckBox, element) {
        const { list } = this.state;
        const index = list.indexOf(element);
        changeLongPressedCheckBox(defaultObject);
        const newList = list.slice(0, index).concat(list.slice(index + 1, list.length));
        await this.setState({ list: newList });
    }
	render (){
        const { list, addNewVisibility } = this.state;
		return (
            <>
                <StatedCheckBoxList
                    titles={this.state.list}
                />
                <Button
                    onPress={this.onPressedAddElement}
                    title='Add new'
                    containerStyle={styles.buttonStyle}
                    accessibilityLabel='Add new TODO element'
                />
                {this.state.addNewVisibility && <AddNewOverlay
                    isVisible={this.state.addNewVisibility}
                    onPressDone={this.onPressDone}
                />}
                <FunctionContext.Consumer>
                    {value => {
                        return <EditOverlay
                            isVisible={value.longPressedCheckBox.id !== -1}
                            title={value.longPressedCheckBox}
                            onPressDone={(event, element) => this.handleOnEditDone(value.changeLongPressedCheckBox, element)}
                            onPressDelete={(event, element) => this.handleOnEditDelete(value.changeLongPressedCheckBox, element)}
                        />;
                    }}
                </FunctionContext.Consumer>
            </>
		);
	}
}
const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#841584',
        position: 'absolute',
        alignSelf: 'flex-end',
        right: '5%',
        bottom: '5%'
    }
});
export default List;

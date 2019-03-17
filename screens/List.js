import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Button } from 'react-native-elements';
import StatedCheckBoxList from '../components/StatedCheckBoxList';
import AddNewOverlay from '../components/AddNewOverlay';
import EditOverlay from '../components/EditOverlay';
import checkBoxStates from '../configuration/StatedCheckBox';

const defaultObject = {
    text: '',
    id: -1
};
const {height, width} = Dimensions.get('window');
const sections = [
    'todo', 'done'
];

class List extends Component {
	constructor (props){
		super(props);
        this.onPressedAddElement = this.onPressedAddElement.bind(this);
        this.onPressDoneAtAddNew = this.onPressDoneAtAddNew.bind(this);
        this.handleOnEditDelete = this.handleOnEditDelete.bind(this);
        this.handleOnEditDone = this.handleOnEditDone.bind(this);
        this.childToRender = this.childToRender.bind(this);
        this.handleOnCheckboxPress = this.handleOnCheckboxPress.bind(this);
        this.handleLongPress = this.handleLongPress.bind(this);
        this.state = {
            list: [
                {text: 'example', id: 0, status: checkBoxStates[0]},
                {text: 'example', id: 1, status: checkBoxStates[0]},
                {text: 'example', id: 2, status: checkBoxStates[0]},
                {text: 'example', id: 3, status: checkBoxStates[0]}
            ],
            addNewVisibility: false,
            addEditVisibility: false,
            activeSections: ['todo'],
            longPressedCheckBox: {...defaultObject}
		};
    }
    handleOnCheckboxPress (checkbox) {
        const { list } = this.state;
        const indexOfCurrentState = checkBoxStates.indexOf(checkbox.status);
        const indexOfNextState = indexOfCurrentState === checkBoxStates.length - 1 ? 0 : indexOfCurrentState + 1;
        const indexOfCheckbox = list.indexOf(checkbox);
        list[indexOfCheckbox].status = checkBoxStates[indexOfNextState];
        this.setState({list: list});
    }
    handleLongPress (checkbox) {
        this.setState({longPressedCheckBox: checkbox, addEditVisibility: true});
    }
    handleOnEditDone (element) {
        const { list } = this.state;
        list[list.indexOf(list.find(item => item.id === element.id))].text = element.text;
        this.handleLongPress(defaultObject);
        this.setState({list: list});
    }
	onPressedAddElement (){
        this.setState({addNewVisibility: true});
    }
    onPressDoneAtAddNew (event, text) {
        const { list } = this.state;
        const newId = list.length === 0 ? 0 : list[list.length - 1].id + 1;
        list.push({text: text, id: newId, status: checkBoxStates[0]});
        this.setState({
            list: list,
            addNewVisibility: false
        });
    }
    async handleOnEditDelete (element) {
        const { list } = this.state;
        const index = list.indexOf(element);
        this.handleLongPress(defaultObject);
        const newList = list.slice(0, index).concat(list.slice(index + 1, list.length));
        await this.setState({ list: newList });
    }
    childToRender () {
        const { list } = this.state;
		return (
            <StatedCheckBoxList
                titles={list}
                handleOnPress={this.handleOnCheckboxPress}
                handleLongPress={this.handleLongPress}
            />
		);
    }
	render (){
        const { list, addNewVisibility, longPressedCheckBox, addEditVisibility } = this.state;
		return (
            <ScrollView style={styles.scrollViewStyle}>
                <StatedCheckBoxList
                    titles={list}
                    handleOnPress={this.handleOnCheckboxPress}
                    handleLongPress={this.handleLongPress}
                />
                <Accordion
                    sections={sections}
                    activeSections={this.state.activeSections}
                    renderHeader={(section) => {
                        return (
                            <View style={styles.collapseHeaderStyle}>
                            <Text>{section}</Text>
                            </View>
                        );
                    }}
                    underlayColor='#DCDCDC'
                    renderContent={this.childToRender}
                    onChange={(activeSections) => {
                        this.setState({ activeSections });
                    }}
                />
                {addNewVisibility && <AddNewOverlay
                    isVisible={addNewVisibility}
                    onPressDone={this.onPressDoneAtAddNew}
                />}
                {addEditVisibility && <EditOverlay
                    isVisible={longPressedCheckBox.text !== ''}
                    title={longPressedCheckBox}
                    onPressDone={(event, element) => this.handleOnEditDone(element)}
                    onPressDelete={(event, element) => this.handleOnEditDelete(element)}
                />}
                <Button
                    onPress={this.onPressedAddElement}
                    title='Add new'
                    containerStyle={styles.buttonStyle}
                    accessibilityLabel='Add new TODO element'
                />
            </ScrollView>
		);
	}
}
const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#841584',
        position: 'absolute',
        alignSelf: 'flex-end',
        right: '5%',
        top: 0.8 * height
    },
    collapseHeaderStyle: {
        width: 0.95*width,
        margin: '2%',
        padding: '2%'
    },
    scrollViewStyle: {
        top: '5%',
        width: '95%',
        height: height
    }
});
export default List;

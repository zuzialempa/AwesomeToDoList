import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Button, Icon } from 'react-native-elements';
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
    'done'
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
            activeSections: [],
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
        this.setState({list: list, addEditVisibility: false});
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
        await this.setState({ list: newList, addEditVisibility: false });
    }
    childToRender () {
        const { list } = this.state;
        const filteredList = list.filter(item => item.status === checkBoxStates[checkBoxStates.length - 1]);
		return (
            <StatedCheckBoxList
                titles={filteredList}
                handleOnPress={this.handleOnCheckboxPress}
                handleLongPress={this.handleLongPress}
            />
        );
    }
	render (){
        const { list, addNewVisibility, longPressedCheckBox, addEditVisibility, activeSections } = this.state;
		return (
            <>
                <ScrollView style={styles.scrollViewStyle} keyboardShouldPersistTaps={'handled'}>
                    <StatedCheckBoxList
                    titles={list.filter(item => item.status !== checkBoxStates[checkBoxStates.length - 1])}
                        handleOnPress={this.handleOnCheckboxPress}
                        handleLongPress={this.handleLongPress}
                    />
                    <Accordion
                        sections={sections}
                        activeSections={activeSections}
                        renderHeader={(section) => {
                            return (
                                <View style={styles.collapseHeaderStyle}>
                                    <Text>{section}</Text>
                                    <Icon
                                        name={!activeSections.includes(sections.indexOf(section))
                                            || list.filter(item => item.status === checkBoxStates[checkBoxStates.length - 1]).length === 0 ?
                                            'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                    />
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
                </ScrollView>
                <Icon
                    name='add'
                    color='#6200EE'
                    containerStyle={styles.buttonStyle}
                    size={25}
                    raised={true}
                    reverse={true}
                    onPress={this.onPressedAddElement}
                />
            </>
		);
	}
}
const styles = StyleSheet.create({
    buttonStyle: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: '2%',
        bottom: '2%'
    },
    collapseHeaderStyle: {
        width: width,
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingRight: '4%',
        paddingLeft: '4%',
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderBottomColor: '#CFCFCF',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    scrollViewStyle: {
        width: '100%',
        height: height,
        backgroundColor: '#F1F1F1'
    }
});
export default List;

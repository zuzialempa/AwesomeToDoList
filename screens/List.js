import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Button } from 'react-native-elements';
import StatedCheckBoxList from '../components/StatedCheckBoxList';
import AddNewOverlay from '../components/AddNewOverlay';
import { ListContext } from '../helpers/ListContext';
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
        this.onPressDone = this.onPressDone.bind(this);
        this.handleOnEditDelete = this.handleOnEditDelete.bind(this);
        this.handleOnEditDone = this.handleOnEditDone.bind(this);
        this.childToRender = this.childToRender.bind(this);
        this.state = {
            list: [{text: 'example', id: 0}],
            addNewVisibility: false,
            activeSections: ['todo']
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
        list.push({text: text, id: newId, status: checkBoxStates[0]});
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
    childToRender () {
        const { list, addNewVisibility } = this.state;
		return (
            <>
                <StatedCheckBoxList
                    titles={list}
                />
                {addNewVisibility && <AddNewOverlay
                    isVisible={addNewVisibility}
                    onPressDone={this.onPressDone}
                />}
                <ListContext.Consumer>
                    {value => {
                        return <EditOverlay
                            isVisible={value.longPressedCheckBox.text !== ''}
                            title={value.longPressedCheckBox}
                            onPressDone={(event, element) => this.handleOnEditDone(value.changeLongPressedCheckBox, element)}
                            onPressDelete={(event, element) => this.handleOnEditDelete(value.changeLongPressedCheckBox, element)}
                        />;
                    }}
                </ListContext.Consumer>
            </>
		);
    }
	render (){
        const { list, addNewVisibility } = this.state;
		return (
            <>
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
                <Button
                    onPress={this.onPressedAddElement}
                    title='Add new'
                    containerStyle={styles.buttonStyle}
                    accessibilityLabel='Add new TODO element'
                />
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
    },
    collapseHeaderStyle: {
        width: 0.95*width,
        margin: '2%',
        padding: '2%'
    }
});
export default List;

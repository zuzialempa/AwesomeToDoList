import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import StatedCheckBox from '../components/StatedCheckBox';
import PropTypes from 'prop-types';

const StatedCheckBoxList = ({ titles }) => {
    return (
            // <ScrollView style={styles.scrollViewStyle}>
                titles.map(title => <StatedCheckBox title={title} key={title.id+title.text}/>)
            // </ScrollView>
        );
};
const styles = StyleSheet.create({
    scrollViewStyle: {
        width: '95%'
    }
});
StatedCheckBoxList.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.object)
};
export default StatedCheckBoxList;

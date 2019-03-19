import React from 'react';
import StatedCheckBox from '../components/StatedCheckBox';
import PropTypes from 'prop-types';

const StatedCheckBoxList = ({ titles, handleOnPress, handleLongPress }) => {
        return (
                titles.map(title =>
                    <StatedCheckBox
                        title={title}
                        key={title.id+title.text}
                        handleOnPress={handleOnPress}
                        handleLongPress={handleLongPress}
                    />)
            );
};
StatedCheckBoxList.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.object)
};
export default StatedCheckBoxList;

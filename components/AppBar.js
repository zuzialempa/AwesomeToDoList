import React from 'react';
import { Header} from 'react-native-elements';

const AppBar = () => {
    return (
        <Header
            leftComponent={{icon: 'menu'}}
            rightComponent={{icon: 'favorite'}}
            backgroundColor={'white'}
        />
    );
};
export default AppBar;

import { StyleSheet, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const Header = ({ border = 1, padding = 16, children }) => {
    return (
        <View style={[styles.header, {
            borderBottomWidth: border ? 1 : 0,
            padding: padding,
        }]}>
            {children}
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        borderColor: '#aaa',
    }
})
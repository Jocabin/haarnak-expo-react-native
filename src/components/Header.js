import { StyleSheet, View } from 'react-native';



const Header = ({ children }) => {
    return (
        <View style={styles.header}>
            {children}
        </View>
    );
}

export default Header;



const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        padding: 8,
    }
})
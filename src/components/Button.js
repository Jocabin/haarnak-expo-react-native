import { StyleSheet, Pressable, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const Button = ({ onPress, children }) => {
    return (
        <Pressable style={styles.button} onTouchEnd={onPress}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{children}</Text>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderColor: '#51a7fd',
        borderWidth: 1,
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#dae8fc',
        width: width - 60,
    }
})
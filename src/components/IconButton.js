import { StyleSheet, Pressable, Text, Dimensions, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('screen');

const IconButton = ({ onPress, text, iconName }) => {
    return (
        <Pressable onTouchEnd={onPress}>
            <View style={styles.button}>
                <Ionicons name={iconName} size={24} color="black" />
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{text}</Text>
            </View>
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    }
})
import { View, PanGestureHandler, Animated, PinchGestureHandler, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

const ZoomImage = ({ onPinchEvent, onPanEvent, imgUrl }) => {
    {/* <View>
            <PanGestureHandler
                onGestureEvent={onPanEvent}>
                <Animated.View>
                    <PinchGestureHandler>
                        <Animated.Image
                            source={{ uri: imgUrl }}
                            style={styles.image} />
                    </PinchGestureHandler>
                </Animated.View>
            </PanGestureHandler>
        </View> */}
    return (
        <Image
            source={{ uri: imgUrl }}
            style={styles.image} />
    )
}

export default ZoomImage;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: (width * 16) / 9,
        resizeMode: 'contain',
    },
})
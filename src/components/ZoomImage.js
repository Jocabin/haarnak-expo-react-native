import { View, PanGestureHandler, Animated, PinchGestureHandler, Image } from "react-native";





const ZoomImage = ({ onPinchEvent, onPanEvent }) => {
    return (
        <View>
            <PanGestureHandler
                onGestureEvent={onPanEvent}>
                <Animated.View>
                    <PinchGestureHandler>
                        <Animated.Image
                            source={{ uri: cardInfos.img }}
                            style={styles.image} />
                    </PinchGestureHandler>
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

export default ZoomImage;
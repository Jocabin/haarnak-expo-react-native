import { Animated, FlatList, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Slides from '../data';
import SlideItem from './SlideItem';
import Pagination from './Pagination';

const Slider = () => {
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleOnScroll = event => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
    };

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    return (
        <View>
            <FlatList
                data={Slides}
                renderItem={({ item }) => <SlideItem item={item} />}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                viewabilityConfig={viewabilityConfig}
            />
            <Pagination data={Slides} scrollX={scrollX} index={index} />
        </View>
    );
};

export default Slider;

const styles = StyleSheet.create({});
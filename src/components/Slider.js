import { Animated, FlatList, StyleSheet, View, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import React, { useRef, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import SlideItem from './SlideItem';
import Pagination from './Pagination';
import Button from './Button';
import Header from './Header';

import Slides from '../data';

const { width, height } = Dimensions.get('screen');

const Slider = () => {
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const cards = JSON.parse(SecureStore.getItem('cards'));

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
        <View style={styles.container}>
            <Header border={0} padding={30}>
                <Link href="/new" asChild>
                    <Button ref="addDocument">Ajouter un document</Button>
                </Link>
            </Header>

            <FlatList
                data={cards}
                renderItem={({ item }) => <SlideItem item={item} />}
                horizontal
                style={styles.scrollView}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                viewabilityConfig={viewabilityConfig}
            />

            <Pagination data={cards} scrollX={scrollX} index={index} />
        </View>
    );
};

export default Slider;

const styles = StyleSheet.create({
    container: {
        width,
        height: height - 100,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    scrollView: {
        flexDirection: 'row'
    },
});
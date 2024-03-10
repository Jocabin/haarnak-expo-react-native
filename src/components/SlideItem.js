import { Image, StyleSheet, View, Dimensions, Pressable, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('screen');

const SlideItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Link href={"/card/" + item.id} asChild>
                <Pressable style={styles.imageWrapper}>
                    <Image
                        source={{ uri: item.img }}
                        style={styles.image}
                    />
                </Pressable>
            </Link>
        </View>
    );
};

export default SlideItem;

const styles = StyleSheet.create({
    container: {
        width,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
});
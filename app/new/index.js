import { View, Image, Alert, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';

import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { usePreventScreenCapture } from 'expo-screen-capture';

import React, { useState } from 'react';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

import IconButton from '../../src/components/IconButton';
import Button from '../../src/components/Button';
import Header from '../../src/components/Header';

const { width, height } = Dimensions.get('screen');

export default function Page() {
    usePreventScreenCapture();

    const cards = JSON.parse(SecureStore.getItem('cards'));
    const [cardInfos, setCardInfos] = useState({
        id: null,
        img: null
    })

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });

        if (!result.canceled) {
            setCardInfos({
                id: uuid(),
                img: result.assets[0].uri
            });
        }
    }

    async function save() {
        if (cardInfos.id && cardInfos.img) {
            cards.push(cardInfos)
            await SecureStore.setItem('cards', JSON.stringify(cards));
            router.replace('/')
        } else {
            Alert.alert('Erreur', 'Aucune image sélectionnée')
        }
    }

    return (
        <View style={styles.container}>
            <Header>
                <Link href="/" asChild>
                    <IconButton iconName="arrow-back" text="Retour" />
                </Link>

                <View style={styles.headerRight}>
                    <IconButton iconName="image" text="" onPress={pickImage} />
                    <IconButton iconName="save" text="" onPress={save} />
                </View>
            </Header>

            <View style={styles.imageWrapper}>
                {
                    cardInfos.img &&
                    <Image
                        source={{ uri: cardInfos.img }}
                        style={styles.image} />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height
    },
    imageWrapper: {
        flex: 1
    },
    image: {
        width: '100%',
        height: (width * 16) / 9,
        resizeMode: 'contain',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 16
    }
})
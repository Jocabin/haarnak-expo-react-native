import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Brightness from 'expo-brightness';
import { router } from 'expo-router';
import { usePreventScreenCapture } from 'expo-screen-capture';

import React, { useState, useRef, useEffect } from 'react';

import { Alert, View, StyleSheet, Animated } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';

import Header from '../../../src/components/Header';
import IconButton from '../../../src/components/IconButton';
import ZoomImage from '../../../src/components/ZoomImage';

export default function Page() {
    usePreventScreenCapture();

    const { id } = useLocalSearchParams();
    let cards = JSON.parse(SecureStore.getItem('cards'));
    const [cardInfos, setCardInfos] = useState(cards.find((el) => el.id === id))

    const scale = useRef(new Animated.Value(1)).current
    const translateX = useRef(new Animated.Value(0)).current
    const translateY = useRef(new Animated.Value(0)).current

    useEffect(() => {
        (async () => {
            const { status } = await Brightness.requestPermissionsAsync();
            if (status === 'granted') {
                await Brightness.setBrightnessAsync(1);
            }
        })();
    }, []);

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });

        if (!result.canceled) {
            setCardInfos({
                id: cardInfos.id,
                img: result.assets[0].uri
            });
        }
    }

    async function save() {
        if (cardInfos.id && cardInfos.img) {
            let cardToEditIndex = cards.findIndex((el) => el.id === id)
            cards[cardToEditIndex] = cardInfos

            await SecureStore.setItem('cards', JSON.stringify(cards));
            router.replace('/')
        } else {
            Alert.alert('Erreur', 'Aucune image sélectionnée')
        }
    }

    async function deleteImage() {
        cards = cards.filter(el => el.id !== id)
        await SecureStore.setItem('cards', JSON.stringify(cards));
        router.replace('/')
    }

    const onPinchEvent = Animated.event([{ nativeEvent: scale }], { useNativeDriver: true })
    const onPanEvent = Animated.event([{ nativeEvent: { translateX: translateX, translateY: translateY } }], { useNativeDriver: true })

    return (
        <View>
            <Header>
                <Link href="/" asChild>
                    <IconButton iconName="arrow-back" text="Retour" />
                </Link>

                <View style={styles.headerRight}>
                    <IconButton iconName="trash" text="" onPress={() => {
                        Alert.alert('Confirmation', 'Voulez-vous supprimer ce document ?', [
                            {
                                text: 'Non',
                                onPress: () => console.log('cancel'),
                                style: 'cancel',
                            },
                            { text: 'Oui', onPress: () => deleteImage() },
                        ])
                    }} />
                    <IconButton iconName="image" text="" onPress={pickImage} />
                    <IconButton iconName="save" text="" onPress={save} />
                </View>
            </Header>

            <View style={styles.container}>
                {
                    cardInfos.img &&
                    <ZoomImage imgUrl={cardInfos.img} onPinchEvent={onPinchEvent} onPanEvent={onPanEvent} />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 16
    }
})
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Brightness from 'expo-brightness';
import { router } from 'expo-router';
import { usePreventScreenCapture } from 'expo-screen-capture';

import React, { useState, useRef, useEffect } from 'react';

import { Alert, View, Image, Dimensions, StyleSheet, Animated } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';

import Button from '../../../src/components/Button';
import Header from '../../../src/components/Header';

const { width, height } = Dimensions.get('screen');

export default function Page() {
    usePreventScreenCapture();

    const { id } = useLocalSearchParams();
    const cards = JSON.parse(SecureStore.getItem('cards'));
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

    const onPinchEvent = Animated.event([{ nativeEvent: scale }], { useNativeDriver: true })
    const onPanEvent = Animated.event([{ nativeEvent: { translateX: translateX, translateY: translateY } }], { useNativeDriver: true })

    return (
        <View>
            <Header>
                <Link href="/" asChild>
                    <Button>Retour à l'accueil</Button>
                </Link>
            </Header>

            <View style={styles.container}>

                {
                    /* cardInfos.img &&
                    <ZoomImage onPinchEvent={onPinchEvent} onPanEvent={onPanEvent} /> */
                }

                <Button onPress={pickImage}>Modifier l'image</Button>
                <Button onPress={save}>Enregistrer la carte</Button>
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
    image: {
        width: width - 60,
        height: '77%',
        resizeMode: 'cover',
        backgroundColor: 'lightgray'
    }
})
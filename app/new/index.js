import { View, Image, Alert, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';

import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

import React, { useState } from 'react';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

import Button from '../../src/components/Button';
import Header from '../../src/components/Header';

const { width, height } = Dimensions.get('screen');

export default function Page() {
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
        <View>
            <Header>
                <Link href="/" asChild>
                    <Button>Retour à l'accueil</Button>
                </Link>
            </Header>

            <View style={styles.container}>
                <Button onPress={pickImage}>Sélectionner une image</Button>

                {
                    cardInfos.img &&
                    <Image
                        source={{ uri: cardInfos.img }}
                        style={styles.image} />
                }

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
        justifyContent: 'flex-end'
    },
    image: {
        width: width - 60,
        height: '70%',
        resizeMode: 'cover',
        backgroundColor: 'lightgray'
    }
})
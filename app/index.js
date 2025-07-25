import * as StatusBar from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import * as Brightness from 'expo-brightness';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { usePreventScreenCapture } from 'expo-screen-capture';

import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';

import Slider from '../src/components/Slider';

export default function Page() {
  const cards = SecureStore.getItem('cards');
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  if (!cards) {
    SecureStore.setItem('cards', JSON.stringify([]));
  }
  usePreventScreenCapture();
  // SecureStore.setItem('cards', '')

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');

    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        await Brightness.restoreSystemBrightnessAsync()
      }
    })();

    async function authenticate() {
      if (!isAuthenticated) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Dévérouillez pour accéder"
        });
        setIsAuthenticated(result.success);
      }
    }
    authenticate();
  }, [NavigationBar.getVisibilityAsync()]);

  return (
    <SafeAreaView>
      {isAuthenticated ? <Slider></Slider> : <Text>Vous n'êtes pas connecté</Text>}
      <StatusBar.StatusBar style='auto' translucent={false} backgroundColor='white' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

/* TODO
- zoom image
- bug des refs
- remettre l'empreinte et better page quand pas authent
*/
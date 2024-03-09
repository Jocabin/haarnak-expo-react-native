import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import Slider from './src/components/Slider';

export default function App() {
  let [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function authenticate() {
      const result = await LocalAuthentication.authenticateAsync();
      setIsAuthenticated(result.success);
    }
    authenticate();
  }, []);

  return (
    <SafeAreaView>
      {isAuthenticated ? <Slider></Slider> : <Text>Vous n'êtes pas connecté</Text>}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

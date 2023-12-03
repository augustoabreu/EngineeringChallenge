
import { useEffect, useState } from 'react';
import {
    GoogleSignin,
    GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import { Text, View } from '../components/Themed';
import { router } from 'expo-router';

export default function SignIn() {
    const [isInProgress, setIsInProgress] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const signInUser = async () => {
      try {
        setIsInProgress(true);
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        router.replace('/(tabs)');
      } catch (error) {
        setError("Couldn't not sign. Try again later");
      }
      setIsInProgress(false);
    }
  
    useEffect(() => {
      const check = async () => {
        try {
          const isSignedIn = await GoogleSignin.isSignedIn();
          if (isSignedIn) {
            const user = await GoogleSignin.getCurrentUser();
            if (user) {
                router.replace('/(tabs)');
            } else {
              const user = await GoogleSignin.signInSilently();
              if (user) router.replace('/(tabs)');
            }
          }
        } catch (e) {
          console.error("Couldn't silent sign-in", e)
        }
      }
      check();
    }, []);
  
    useEffect(() => {
      if (!error) return;
      setTimeout(() => {
        setError(null);
      }, 3000)
    }, [error])
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {error ? <Text>{error}</Text> : null}
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            signInUser();
          }}
          disabled={isInProgress}
        />
      </View>
    )
  }
import { Button } from "react-native";
import { router } from 'expo-router';
import {StyleSheet} from 'react-native';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { View } from "../../components/Themed";

export default function Settings() {
    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
        } catch (e) {
            console.error("Couldn't sign out user", e)
        }
        router.replace('auth')
    }
    return (
      <View style={styles.container}>
        <View style={styles.separator} />
        <Button onPress={signOut} title="Sign out" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 20,
      height: 1,
      width: '80%',
    },
  });
  
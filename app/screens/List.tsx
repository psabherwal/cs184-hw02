import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const viewShotRef = useRef<View>(null); // Change the ref type to View

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  const takeScreenshot = async () => {
    if (viewShotRef.current) {
      try {
        // Capture the screenshot using captureRef
        const uri = await captureRef(viewShotRef.current, {
          format: 'png',
          quality: 0.8,
        });
        console.log("Screenshot captured:", uri);

        // Request permissions for media library
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          // Move the screenshot to the appropriate location in the file system
          const asset = await MediaLibrary.createAssetAsync(uri);
          console.log('Screenshot saved to gallery!', asset);
          alert('Screenshot saved successfully!');
        } else {
          alert('Permission to access media library is required!');
        }
      } catch (error) {
        console.error("Error taking screenshot:", error);
        alert('Failed to save screenshot.');
      }
    }
  };

  return (
    <View style={styles.container} ref={viewShotRef}>
      <Text>{userEmail ? `User Email: ${userEmail}` : 'Hello'}</Text>
      <Button onPress={() => navigation.navigate('Welcome')} title="Open Welcome Page" />
      <Button onPress={takeScreenshot} title="Take Screenshot" />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

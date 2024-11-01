import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase storage
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firebase Firestore

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

          // Save screenshot to Firebase Storage
          const storage = getStorage();
          const storageRef = ref(storage, `screenshots/${Date.now()}.png`);

          const response = await fetch(uri); // Fetch the file from the uri
          const blob = await response.blob(); // Convert to blob for Firebase upload

          await uploadBytes(storageRef, blob); // Upload to Firebase storage
          const downloadURL = await getDownloadURL(storageRef); // Get download URL

          // Save the download URL to Firestore
          const firestore = getFirestore();
          await addDoc(collection(firestore, 'screenshots'), {
            downloadURL: downloadURL,
          });

          alert('Screenshot saved successfully to Firebase and gallery!');
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
      <Button onPress={() => navigation.navigate('Screenshot Gallery')} title="Screenshot Gallery" />
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

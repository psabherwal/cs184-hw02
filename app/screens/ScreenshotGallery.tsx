import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const ScreenshotGallery = () => {
  const [screenshots, setScreenshots] = useState<string[]>([]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      const firestore = getFirestore();
      const screenshotCollection = collection(firestore, 'screenshots');
      const snapshot = await getDocs(screenshotCollection);

      const urls: string[] = [];
      snapshot.forEach((doc) => {
        urls.push(doc.data().downloadURL);
      });

      setScreenshots(urls);
    };

    fetchScreenshots();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={screenshots}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
    </View>
  );
};

export default ScreenshotGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
});

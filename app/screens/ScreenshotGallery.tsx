import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const ScreenshotGallery = ({ navigation }: RouterProps) => {
  const [screenshots, setScreenshots] = useState<string[]>([]); // Array to store screenshot URLs
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch screenshot URLs from Firebase (or another source)
    const fetchScreenshots = async () => {
      setLoading(true);
      try {
        // Simulating fetching screenshot URLs, replace this with actual Firebase calls
        const fetchedScreenshots = [
          'https://example.com/screenshot1.png',
          'https://example.com/screenshot2.png'
        ];
        setScreenshots(fetchedScreenshots);
      } catch (error) {
        console.error("Error fetching screenshots: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenshots();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screenshot Gallery</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={screenshots}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.screenshotContainer}>
              <Image source={{ uri: item }} style={styles.screenshot} />
            </View>
          )}
        />
      )}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ScreenshotGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  screenshotContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  screenshot: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

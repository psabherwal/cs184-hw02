import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (currentUser) {
            setUserEmail(currentUser.email);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to MyApp!</Text>
            <Text> {userEmail ? `Hello ${userEmail}` : 'Hello'}</Text>
            <Text>Thanks for creating an account!</Text>
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
        </View>
    );
}

export default List;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

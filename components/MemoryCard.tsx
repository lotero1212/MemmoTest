import { appColors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

interface MemoryCardProps {
    imageSource: any;
    onPress: () => void;
    flipped: boolean;
}

const sounds = [
    require('@/assets/sounds/monsters/pop.mp3')
];

const playRandomSound = async () => {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const { sound } = await Audio.Sound.createAsync(randomSound);
    await sound.playAsync();
};

const MemoryCard: React.FC<MemoryCardProps> = ({ imageSource, onPress, flipped }) => {
    const handlePress = async () => {
        await playRandomSound();
        onPress();
    };

    return (
        <Pressable onPress={handlePress} style={styles.card}>
            {flipped ? (
                <Image source={imageSource} style={styles.image} />
            ) : (
                <View style={styles.hiddenCard} />
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '23%',
        height: 100,
        margin: '1%',
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    hiddenCard: {
        width: '100%',
        height: '100%',
        backgroundColor: appColors.bg[300],
    },
});

export default MemoryCard;

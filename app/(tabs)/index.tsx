import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MemoryCard from '@/components/MemoryCard'; // Importar el nuevo componente
import { HelloWave } from '@/components/HelloWave';
import LottieView from 'lottie-react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { appColors } from '@/constants/Colors';


const images = [
  require('@/assets/images/monster_1.png'),
  require('@/assets/images/monster_2.png'),
  require('@/assets/images/monster_3.png'),
  require('@/assets/images/monster_4.png'),
  require('@/assets/images/monster_5.png'),
  require('@/assets/images/monster_6.png'),
  require('@/assets/images/monster_7.png'),
  require('@/assets/images/monster_8.png'),
  require('@/assets/images/monster_9.png'),
  require('@/assets/images/monster_10.png')
];

const generateRandomPairs = (): { id: number; source: any }[] => {
  const pairs = [...images, ...images].map((image, index) => ({ id: index, source: image }));
  return pairs.sort(() => Math.random() - 0.5);
};

export default function HomeScreen() {
  const [cards, setCards] = useState<{ id: number; source: any }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    setCards(generateRandomPairs());
  }, []);

  useEffect(() => {
    if (matchedCards.length === images.length * 2) {
      setGameWon(true);
    }
  }, [matchedCards]);

  const handleCardPress = (id: number) => {
    if (selectedCards.length === 2 || selectedCards.includes(id) || matchedCards.includes(id)) {
      return;
    }

    const newSelectedCards = [...selectedCards, id];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const [firstId, secondId] = newSelectedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard && secondCard && firstCard.source === secondCard.source) {
        setMatchedCards([...matchedCards, firstId, secondId]);
      }

      setTimeout(() => setSelectedCards([]), 2000);
    }
  };

  const handleAnimationFinish = () => {
    setGameWon(false);
    setMatchedCards([]);
    setSelectedCards([]);
    setCards(generateRandomPairs());
  };
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#F075AA', dark: '#BC5A94' }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedView style={styles.welcomeContainer}>
          <ThemedText type="title">Hola EMMA</ThemedText>
          <HelloWave />
        </ThemedView>
        <Pressable style={styles.pressable} onPress={handleAnimationFinish}>
          <TabBarIcon name='reload' color={appColors.text[400]} />
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.grid}>
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            imageSource={card.source}
            onPress={() => handleCardPress(card.id)}
            flipped={selectedCards.includes(card.id) || matchedCards.includes(card.id)}
          />
        ))}
      </ThemedView>
      {gameWon && (
        <View style={styles.overlay}>
          <LottieView
            source={require('@/assets/animations/confetti.json')}
            autoPlay
            loop={false}
            style={styles.confetti}
            onAnimationFinish={handleAnimationFinish}
          />
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  confetti: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  welcomeContainer: {
    flexDirection: 'row',
    gap: 8,
  }
});

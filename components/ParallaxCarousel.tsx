import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import { images } from '@/constants';

const { width: screenWidth } = Dimensions.get('window');

const Carousel = () => {
    const carouselItems = [
        {
            image: images.carousel1,
        },
        {
            image: images.carousel2,
        },
        {
            image: images.carousel3,
        },
    ];

    const flatListRef = useRef(null);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
        </View>
    );

    return (
        <FlatList
            ref={flatListRef}
            data={carouselItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={screenWidth}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        width: screenWidth - 20, 
        margin: 7,
        borderRadius: 12, 
        backgroundColor: '#fff', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 3, 
        
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        resizeMode:'contain'
        
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height:'37%',
        padding: 10,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    title: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        fontSize: 10,
    },
});

export default Carousel;

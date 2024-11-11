import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ParallaxCarousel from "@/components/ParallaxCarousel";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router'; 
import { images } from '@/constants';
import { useSelector } from 'react-redux'; 
import { selectUser } from '@/store/userSlice';

const Home = () => {
    const router = useRouter(); 
    const user = useSelector(selectUser);

    return (
        <SafeAreaView style={styles.container}>
            {/* Welcome Section */}
            <View style={styles.welcomeContainer}>
                <Image
                    source={images.farmer}
                    style={styles.farmerIcon}
                />
                <View style={styles.welcomeTextContainer}>
                    <Text className='text-xl text-white font-JakartaSemiBold'>Welcome</Text>
                    <Text className='text-xl text-white font-JakartaSemiBold mt-2'>{user.name} </Text>
                </View>
            </View>

            {/* Carousel Section */}
           
            <View style={styles.tabsContainer}>
                <ParallaxCarousel />
            </View>
            <View>
            <Text className='text-xl text-black font-JakartaSemiBold m-2'># Features  offered</Text>
            </View>
            {/* Action Boxes */}
            <View style={styles.boxContainer}>
                {/* Loan Request Button */}
                <TouchableOpacity style={styles.loanBox} onPress={() => router.push('/loanApply')}>
                    <View style={styles.boxHeader}>
                        <Ionicons name="cash-outline" size={24} color="#333" />
                        <Text style={styles.arrow}>➡️</Text>
                    </View>
                    <Text style={styles.boxTitle}>Loan Request</Text>
                    <Text style={styles.boxSubtitle}>Apply for a new loan</Text>
                </TouchableOpacity>

                <View style={styles.bottomBoxes}>
                    {/* eKYC Button */}
                    <TouchableOpacity style={styles.box} onPress={() => router.push('/ekyc')}>
                        <View style={styles.boxHeader}>
                            <Ionicons name="person-outline" size={24} color="#333" />
                            <Text style={styles.arrow}>➡️</Text>
                        </View>
                        <Text style={styles.boxTitle}>EKYC</Text>
                        <Text style={styles.boxSubtitle}>Get your KYC done</Text>
                    </TouchableOpacity>

                    {/* Credit Score Button */}
                    <TouchableOpacity style={styles.box} onPress={() => router.push('/creditScore')}>
                        <View style={styles.boxHeader}>
                            <Ionicons name="trending-up-outline" size={24} color="#333" />
                            <Text style={styles.arrow}>➡️</Text>
                        </View>
                        <Text style={styles.boxTitle}>Credit Score</Text>
                        <Text style={styles.boxSubtitle}>Check your credit score</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    welcomeContainer: {
        backgroundColor: '#0CC25F',
        height: '12%',
        borderBottomLeftRadius: 23,
        borderBottomRightRadius: 23,
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: 'space-between',
        position: 'relative',
        margin: 1
    },
    farmerIcon: {
        width: 60,
        height: 60,
        position: 'absolute',
        top: 20,
        right: 20,
        borderRadius: 50,
    },
    welcomeTextContainer: {
        position: 'absolute',
        bottom: 13,
        left: 20,
    },
    tabsContainer: {
        height: 150,
    },
    boxContainer: {
        paddingHorizontal: 10,
    },
    loanBox: {
        backgroundColor: '#E6F0FA', 
        padding: 10,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    bottomBoxes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        flex: 1,
        backgroundColor: '#E6F0FA', 
        padding: 12,
        borderRadius: 12,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    boxHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    boxTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', 
        marginBottom: 4,
    },
    boxSubtitle: {
        fontSize: 14,
        color: '#333', 
    },
    arrow: {
        fontSize: 18,
        color: '#333',
    },
});

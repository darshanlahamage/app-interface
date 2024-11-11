import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { images } from '@/constants';
import { useSelector } from 'react-redux'; 
import { selectUser } from '@/store/userSlice';

const SuccessLoan = () => {
  const user = useSelector(selectUser);
  const { data } = useLocalSearchParams();
  const loaninfo = data ? JSON.parse(Array.isArray(data) ? data[0] : data) : {};
  const { loanAmount, interestRate, duration } = loaninfo;

  return (
    <View style={styles.container}>
      <Image source={images.celebration} style={styles.celebrationBackground} />
      
      <View style={styles.ticketContainer}>
        <View style={styles.checkIconWrapper}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>
        <Text style={styles.ticketTitle}>Loan Application Successful</Text>
        <Text style={styles.loanInfo}>
          Your loan application has been successfully submitted.
        </Text>
        <View style={styles.loanDetails}>
          <Text style={styles.loanDetailText}>Applicant Name: {user.name}</Text>
          <Text style={styles.loanDetailText}>Loan Amount: ₹{loanAmount}</Text>
          <Text style={styles.loanDetailText}>Interest Rate: {interestRate}%</Text>
          <Text style={styles.loanDetailText}>Duration: {duration} Months</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.doneButton} onPress={() => router.replace("/(root)/(tabs)/home")}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  celebrationBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    resizeMode: 'cover',
  },
  ticketContainer: {
    backgroundColor: '#0CC25F',
    top:50,
    padding: 20,
    borderRadius: 20,
    width: '85%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'dashed',
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  checkIconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: 24,
    color: '#0CC25F',
    fontWeight: 'bold',
  },
  ticketTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  loanInfo: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  loanDetails: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 15,
    alignItems: 'center',
  },
  loanDetailText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  doneButton: {
    backgroundColor: '#0CC25F',
    paddingVertical: 12,
    borderRadius: 25,
    width: '70%',
    alignItems: 'center',
    top:70
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SuccessLoan;

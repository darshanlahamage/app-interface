// src/components/LoanTicket.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/userSlice';

const LoanTicket = ({ form }) => {
    const user = useSelector(selectUser);
  return (
    <View style={styles.loanTicketContainer}>
      <Text style={styles.ticketTitle}>Loan Application Details</Text>
      <View style={styles.ticketItem}>
        <Text style={styles.ticketLabel}>Interest Amount: </Text>
        <Text style={styles.ticketValue}>{form.interestAmount} INR</Text>
      </View>
      <View style={styles.ticketItem}>
        <Text style={styles.ticketLabel}>Interest Rate: </Text>
        <Text style={styles.ticketValue}>{form.interestRate} %</Text>
      </View>
      <View style={styles.ticketItem}>
        <Text style={styles.ticketLabel}>Loan Duration: </Text>
        <Text style={styles.ticketValue}>{form.duration} months</Text>
      </View>
      <View style={styles.ticketItem}>
        <Text style={styles.ticketLabel}>Credit Score: </Text>
        <Text style={styles.ticketValue}>{user.credit_score}</Text>
      </View>
      <View style={styles.ticketItem}>
        <Text style={styles.ticketLabel}>KYC Status: </Text>
        <Text style={styles.ticketValue}>
          {user.kyc_status ? 'Verified' : 'Not Verified'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loanTicketContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  ticketTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0CC25F',
    marginBottom: 15,
    textAlign: 'center',
  },
  ticketItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ticketLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  ticketValue: {
    fontSize: 16,
    color: '#555',
  },
});

export default LoanTicket;

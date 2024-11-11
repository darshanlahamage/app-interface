import React, { useState } from 'react';
import { Alert, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {  router } from 'expo-router';
import { ReactNativeModal } from 'react-native-modal';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { images } from '@/constants';
import { selectUser } from '@/store/userSlice';

const LoanApply = () => {
  const user = useSelector(selectUser);
  const [form, setForm] = useState({
    interestRate: '',
    interestAmount: '',
    duration: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const userid = user.userid;
  const name = user.name;
  const creditScore = 750;
  const kycStatus = true;

  const onSubmitLoanApplication = async () => {
    if (!form.interestAmount || !form.interestRate || !form.duration) {
      Alert.alert("Error", "Please fill all the required fields.");
      return;
    }
    if (!kycStatus || !creditScore) {
      setShowErrorModal(true);
      return;
    }
    try {
      const response = await axios.post('http://192.167.0.128:3000/api/loans/create', {     
        user_id: userid,
        duration: form.duration,
        amount: form.interestAmount,
        interest_rate: form.interestRate,
      });

      if (response.data) {
        setShowSuccessModal(true);
      } else {
        Alert.alert('Error', 'Failed to submit loan application.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const onContinueHandler = () => {
    const loaninfo = {
      loanAmount: form.interestAmount,
      interestRate: form.interestRate,
      duration: form.duration,
    }
    setShowSuccessModal(false);
    router.push({
      pathname: "/(root)/successLoan",
     params: {data: JSON.stringify(loaninfo)}
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text className="text-xl font-JakartaSemiBold text-[#858585] mb-2">Applier - {name}</Text>

        <InputField
          label="Interest Amount"
          placeholder="Enter Amount in Rupees"
          value={form.interestAmount}
          icon={images.cash}
          keyboardType="numeric"
          onChangeText={(value) => setForm({ ...form, interestAmount: value })}
        />
        <InputField
          label="Interest Rate (%)"
          placeholder="Enter Interest Rate"
          value={form.interestRate}
          icon={images.cash}
          keyboardType="numeric"
          onChangeText={(value) => setForm({ ...form, interestRate: value })}
        />
        <InputField
          label="Loan Duration (Months)"
          placeholder="Enter Duration"
          value={form.duration}
          icon={images.calender}
          keyboardType="numeric"
          onChangeText={(value) => setForm({ ...form, duration: value })}
        />

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Credit Score</Text>
          <Text style={styles.infoValue}>{creditScore || 'Unavailable'}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>KYC Status</Text>
          <Text style={styles.infoValue}>
            {kycStatus ? 'Verified' : 'Not Verified'}
          </Text>
        </View>

        <CustomButton
          title="Submit Application"
          onPress={onSubmitLoanApplication}
          style={styles.submitButton}
        />
      </View>

      {/* Success Modal */}
      <ReactNativeModal isVisible={showSuccessModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Application Submitted</Text>
          <Text style={styles.modalText}>
            Your loan application has been submitted successfully.
          </Text>
          <CustomButton
            title="Continue"
            onPress={onContinueHandler}
            style={styles.modalButton}
          />
        </View>
      </ReactNativeModal>

      {/* Error Modal */}
      <ReactNativeModal isVisible={showErrorModal}>
        <View style={styles.modalContainer}>
          <Text className='text-2xl font-JakartaBold text-center'>Submission Error</Text>
          <Text style={styles.modalText}>
            KYC verification and credit score are required to submit the loan application.
          </Text>
          <CustomButton
            title="OK"
            onPress={() => setShowErrorModal(false)}
            bgVariant='danger'
          />
        </View>
      </ReactNativeModal>

    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    padding: 20,
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  infoSection: {
    marginTop: 15,
    padding: 7,
    backgroundColor: '#E6F0FA',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#0CC25F',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0CC25F',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: '#0CC25F',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  loanTicketContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure it's on top of other content
  },
});

export default LoanApply;

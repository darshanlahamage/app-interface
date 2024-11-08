import React, { useState } from "react";
import { Alert, ScrollView, Text, View, StyleSheet } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { images } from "@/constants";

const LoanApply = () => {
  const [form, setForm] = useState({
    interestRate: "",
    interestAmount: "",
    duration: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const creditScore = 700;
  const kycStatus = true;
  const userid = 123;

  const onSubmitLoanApplication = () => {
    if (!kycStatus || !creditScore) {
      setShowErrorModal(true);
    } else {
      setShowSuccessModal(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text className="text-2xl font-JakartaSemiBold text-center mb-2">Faster Loans</Text>

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
          <Text style={styles.infoValue}>{creditScore || "Unavailable"}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>KYC Status</Text>
          <Text style={styles.infoValue}>
            {kycStatus ? "Verified" : "Not Verified"}
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
            onPress={() => setShowSuccessModal(false)}
            style={styles.modalButton}
          />
        </View>
      </ReactNativeModal>

      {/* Error Modal */}
      <ReactNativeModal isVisible={showErrorModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Submission Error</Text>
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

export default LoanApply;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  formContainer: {
    padding: 20,
    margin: 10,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#0CC25F",
    marginBottom: 20,
  },
  infoSection: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#E6F0FA",
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#0CC25F",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: "#0CC25F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
});

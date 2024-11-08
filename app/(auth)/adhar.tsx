import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { ReactNativeModal } from "react-native-modal";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import axios from "axios";
import { icons, images } from "@/constants";

const AadhaarVerification = () => {
  const [form, setForm] = useState({
    aadhaar: "",
    otp: "",
    role: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onRequestOtpPress = async () => {
    try {
      const response = await axios.post("http://192.167.0.128:3000/api/users/register/request-otp", {
        aadhaar_number: form.aadhaar,
      });

      if (response.data) {
        setVerification({ ...verification, state: "pending" });
        Alert.alert("OTP Sent", "Please check your registered mobile number for the OTP.");
      } else {
        Alert.alert("Error", response.data.message || "Failed to send OTP");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.log(err);
    }
  };

  const onVerifyOtpPress = async () => {
    try {
      const response = await axios.post("http://192.167.0.128:3000/api/users/register/verify-otp", {
        aadhaar_number: form.aadhaar,
        otp: form.otp,
        role: form.role,
      });

      if (response.data) {
        setVerification({ ...verification, state: "success" });
        setShowSuccessModal(true);
      } else {
        setVerification({
          ...verification,
          error: response.data.message || "Invalid OTP",
          state: "failed",
        });
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  
  const successhandler =()=>{
    setShowSuccessModal(false);
    router.push(`/(root)/(tabs)/home`);
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.aadhaarImage}
            className="z-0 w-full h-[270px]"
          />
          <Text className="text-3xl text-white font-JakartaBold  bottom-12 left-5">
            Aadhaar Verification
          </Text>
        </View>
        <View className="p-5 flex-1 mt-10 justify-end">
          {/* Show Aadhaar and Role fields only if OTP is not yet requested */}
          {verification.state === "default" && (
            <>
              <InputField
                label="Aadhaar Number"
                placeholder="Enter Aadhaar Number"
                value={form.aadhaar}
                icon={icons.aadhaar}
                keyboardType="numeric"
                onChangeText={(value) => setForm({ ...form, aadhaar: value })}
              />
              <InputField
                label="Role"
                placeholder="Enter Your Role - (Lender or Farmer)"
                value={form.role}
                icon={icons.person}
                onChangeText={(value) => setForm({ ...form, role: value })}
              />
              <CustomButton
                title="Request OTP"
                onPress={onRequestOtpPress}
                className="mt-6 bg-primary-500"
              />
            </>
          )}

          {/* Show OTP field and Verify button once OTP is requested */}
          {verification.state === "pending" && (
            <View className="mt-5">
              <InputField
                label="OTP"
                placeholder="Enter OTP"
                icon={icons.lock}
                value={form.otp}
                keyboardType="numeric"
                onChangeText={(value) => setForm({ ...form, otp: value })}
              />
              {verification.error && (
                <Text className="text-red-500 text-sm mt-1">
                  {verification.error}
                </Text>
              )}
              <CustomButton
                title="Verify OTP"
                onPress={onVerifyOtpPress}
                className="mt-5 bg-success-500"
              />
            </View>
          )}
        </View>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              Your Aadhaar verification is successful.
            </Text>
            <CustomButton
              title="Continue"
              onPress={() => successhandler()}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default AadhaarVerification;

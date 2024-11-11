import React, { useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import axios from "axios";
import ReactNativeModal from "react-native-modal";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/userSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onLoginPress = async () => {
    try {
      const response = await axios.post("http://192.167.0.128:3000/api/users/login/user-login", form);

      if (response.data) {
        const storeUserData ={
            user_id: response.data.userdata.user_id, 
            name: response.data.userdata.name, 
            aadhaar_number: response.data.userdata.aadhaar_number, 
            phone: response.data.userdata.phone, 
            kyc_verified: response.data.userdata.kyc_verified, 
            role: response.data.userdata.role, 
            credit_score: response.data.userdata.credit_score
        }
         dispatch(setUserInfo(storeUserData));
        setShowSuccessModal(true);
      } else {
        Alert.alert("Login Failed", "Invalid phone number or password.");
      }
    } catch (error) {
      
      if (error && error.status === 404) {
        Alert.alert("User Not Found", "Please check your phone number and try again.");
      } else {
        Alert.alert("Error", "Something went wrong, please try again later.");
      }
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.replace("/(root)/(tabs)/home"); 
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.loginImage} className="z-0 w-full h-[310px]" />
          <Text className="text-3xl text-white font-JakartaBold bottom-12 left-5">
            Login
          </Text>
        </View>
        <View className="p-5 flex-1 mt-10 justify-end">
          <InputField
            label="Phone"
            placeholder="Enter your phone number"
            value={form.phone}
            icon={icons.phone}
            keyboardType="phone-pad"
            onChangeText={(value) => setForm({ ...form, phone: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            value={form.password}
            icon={icons.lock}
            secureTextEntry
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton title="Log In" onPress={onLoginPress} className="mt-6 bg-primary-500" />
          <Text
            onPress={() => router.push("/(auth)/adhar")}
            className="text-center text-primary-500 mt-4"
          >
            Not registered yet? Go to Aadhaar verification
          </Text>
        </View>
      </View>

      {/* Success Modal */}
      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white p-5 rounded-lg shadow-lg">
          <Text className="text-lg font-bold">Login Successful</Text>
          <Text className="mt-4">Welcome back!</Text>
          <CustomButton title="Go to Home" onPress={handleSuccessModalClose} className="mt-6 bg-primary-500" />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default LoginScreen;

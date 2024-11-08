import { CameraView, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EKYC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [Cameratype, setCameraType] = useState<CameraType>('front');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);
//   const userId = useSelector((state) => state.user.userId); 
  const userId =1; 


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takeSelfie = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync({ quality: 0.5, base64: true });
      setPhoto(photoData.uri);
      console.log(photo);
    }
  };


  const handleSubmitEKYC = async () => {
    if (!photo) {
      Alert.alert("Selfie Required", "Please capture a selfie to proceed.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("selfie", {
      uri: photo,
      type: "image/jpeg",
      name: "selfie.jpg",
    });

    try {
      const response = await axios.post("https://api.example.com/ekyc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        Alert.alert("Success", "Your eKYC has been successfully submitted.");
      } else {
        Alert.alert("Failed", "There was an issue submitting your eKYC. Try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete eKYC</Text>
      <Text style={styles.subtitle}>Capture a selfie to verify your identity.</Text>
      <Text className='text-xl text-red font-JakartaSemiBold mb-5'>Keep your face closer to camera.</Text>

      {photo ? (
        <View style={styles.photoContainer}>
          <Image source={{ uri: photo }} style={styles.photo} />
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.retakeText}>Retake Selfie</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} type={Cameratype}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takeSelfie}>
              <Text style={styles.text}>Take Selfie</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitEKYC}
        disabled={loading}
      >
        <Text style={styles.submitText}>Submit eKYC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "80%",
    backgroundColor: "#000",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    alignSelf: "center",
    marginBottom: 30,
  },
  captureButton: {
    padding: 15,
    backgroundColor: "#0CC25F",
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  photoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 5,
    borderColor: "#0CC25F",
    marginBottom: 20,
  },
  retakeButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  retakeText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 20,
    borderRadius: 10,
    elevation: 3,
  },
  submitText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default EKYC;

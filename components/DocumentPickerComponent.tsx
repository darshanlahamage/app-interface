import React, { useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const DocumentPickerComponent = ({ onFilePicked }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDocumentPick = async () => {
    try {
      const pickedFile = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(pickedFile);
      console.log('Picked File:', pickedFile);

      // Convert file to base64
      const base64Data = await RNFS.readFile(pickedFile.uri, 'base64');
      console.log('Base64 Data:', base64Data);

      // Pass the selected file info back to the parent component if needed
      onFilePicked({ pickedFile, base64Data });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert("Cancelled", "No document selected");
      } else {
        Alert.alert("Error", "Failed to pick the document");
        console.error(err);
      }
    }
  };

  return (
    <View>
      <Button title="Upload Document" onPress={handleDocumentPick} />
      {selectedFile && (
        <Text style={{ marginTop: 10, color: 'green' }}>
          {selectedFile.name} selected
        </Text>
      )}
    </View>
  );
};

export default DocumentPickerComponent;

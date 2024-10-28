import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const scannedProduct = getProductFromBarcode(data);
    if (scannedProduct) {
      setProduct(scannedProduct);
      Alert.alert("Scanned", `Product: ${scannedProduct.name}`, [
        { text: 'OK', onPress: () => setScanned(false) }
      ]);
    } else {
      Alert.alert("Scanned", "Product not found.", [
        { text: 'OK', onPress: () => setScanned(false) }
      ]);
    }
  };

  const getProductFromBarcode = (barcode) => {
    const products = [
      { id: 1, name: "Lauren's Orange Juice", image: 'https://cdn.glitch.global/YOUR_GLITCH_PROJECT/juice.png' },
      { id: 2, name: "Baskin's Skimmed Milk", image: 'https://cdn.glitch.global/YOUR_GLITCH_PROJECT/milk.png' },
      { id: 3, name: "Master's Aloe Vera Lotion", image: 'https://cdn.glitch.global/YOUR_GLITCH_PROJECT/lotion.png' }
    ];
    return products.find((item) => item.id.toString() === barcode);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['ean13', 'qr', 'upc_e', 'datamatrix', 'code128']
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
      
      <View style={styles.scanFooter}>
        <Image
          source={product ? { uri: product.image } : require('./assets/tải xuống.jpg')}
          style={styles.thumbnail}
        />
        <View>
          <Text style={styles.productBrand}>{product ? product.name.split(" ")[0] : "Brand"}</Text>
          <Text style={styles.productName}>{product ? product.name : "Product Name"}</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 5,
  },
  scanFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  productBrand: {
    fontSize: 12,
    color: 'gray',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#00bfff',
    borderRadius: 20,
    padding: 10,
    marginLeft: 'auto',
  },
});

export default ScanScreen;

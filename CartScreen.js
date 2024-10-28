import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Lauren's Orange Juice",
      price: 149,
      quantity: 2,
      image: 'https://cdn.glitch.global/19cd5bc6-7477-40f9-a7ee-d761a98174ec/f73e9c98-7d32-4a29-aae7-8967d78f36c5.image.png?v=1730101914389'
    },
    {
      id: 2,
      name: "Baskin's Skimmed Milk",
      price: 129,
      quantity: 1,
      image: 'https://cdn.glitch.global/19cd5bc6-7477-40f9-a7ee-d761a98174ec/6d202633-1b4d-40f7-a937-c04384f52b2f.image.png?v=1730102034528'
    },
    {
      id: 3,
      name: "Master's Aloe Vera Lotion",
      price: 1249,
      quantity: 1,
      image: 'https://cdn.glitch.global/19cd5bc6-7477-40f9-a7ee-d761a98174ec/d9bf5c3f-e1f9-4786-abcf-6f5458f454b4.image.png?v=1730102117733'
    },
    {
      id: 4,
      name: "Fresh Berries Mix",
      price: 499,
      quantity: 1,
      image: 'https://cdn.glitch.global/19cd5bc6-7477-40f9-a7ee-d761a98174ec/8d4932be-9a44-4796-93e7-7be6f424481e.image.png?v=1730102186083'
    },
    {
      id: 5,
      name: "Organic Honey",
      price: 299,
      quantity: 1,
      image: 'https://cdn.glitch.global/19cd5bc6-7477-40f9-a7ee-d761a98174ec/ec7f7235-70ca-4499-ba75-045ca87bc2b2.image.png?v=1730102215138'
    },
    {
      id: 6,
      name: "Green Tea Pack",
      price: 89,
      quantity: 3,
      image: 'https://cdn.glitch.global/19cd5bc6-7477-40f9-a7ee-d761a98174ec/4282e340-ddad-4b4a-80b0-e8b4967c9dab.image.png?v=1730102256073'
    },
    {
      id: 7,
      name: "Whole Wheat Bread",
      price: 79,
      quantity: 1,
      image: 'https://cdn.glitch.global/19cd5bc6-7477-40f9-a7ee-d761a98174ec/1b2e8776-192b-417a-8574-a974ff3e82aa.image.png?v=1730102281608'
    },
    {
      id: 8,
      name: "Almond Butter",
      price: 459,
      quantity: 1,
      image: 'https://cdn.glitch.global/YOUR_GLITCH_PROJECT/almond-butter.png'
    },
    {
      id: 9,
      name: "Organic Apples",
      price: 199,
      quantity: 1,
      image: 'https://cdn.glitch.global/YOUR_GLITCH_PROJECT/apples.png'
    },
    {
      id: 10,
      name: "Vitamin C Supplement",
      price: 599,
      quantity: 1,
      image: 'https://cdn.glitch.global/YOUR_GLITCH_PROJECT/vitamin-c.png'
    }
  ]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal(cartItems);
  }, [cartItems]);

  // Tính tổng giá trị đơn hàng
  const calculateTotal = (items) => {
    const totalValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalValue);
  };

  // Cập nhật số lượng và lưu vào AsyncStorage
  const updateQuantity = async (itemId, change) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Hiển thị từng sản phẩm trong giỏ hàng
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} VNĐ</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
          <Ionicons name="remove-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
          <Ionicons name="add-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Thỏ Bảy Màu Cart 👍</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalAmount}>{total} VNĐ</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Proceed to checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  cartList: {
    paddingBottom: 10,
    marginTop: 40, // Đẩy danh sách xuống dưới để không che mất tiêu đề
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: 'gray',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6464',
  },
  checkoutButton: {
    backgroundColor: '#FF7F50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;

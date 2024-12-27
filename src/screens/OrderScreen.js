import { Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import OrderItem from "../components/OrderItem";
import AuthContext from "../features/context/authContext";
import orderContext from "../features/context/orderContext";
import { getAllOrderItems } from "../features/firebase/order";

const OrderScreen = ({ navigation }) => {
  const { orders, setOrders } = useContext(orderContext);
  const { isLoggedIn } = useContext(AuthContext);

  const fetchAllOrders = async () => {
    const res = await getAllOrderItems();
    if (res.success === true) {
      setOrders(res.data);
      console.log("res.data", res.data);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllOrders();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "center", marginVertical: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Đơn hàng</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView
          style={{ marginTop: 10, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {orders?.map((order, index) => (
            <OrderItem
              key={index}
              bookName={order.bookName}
              qty={order.qty}
              title={order.title}
              date={order.date}
              orderId={order.orderId}
              image={order.image}
              price={order.price}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Hãy đăng nhập!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderScreen;

import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';

import TabNavigator from './src/navigation/TabNavigator';
import { AuthProvider } from './src/features/context/authContext';
import { ProductProvider } from './src/features/context/productContext';
import { CartProvider} from './src/features/context/cartContext'
import {OrderProvider} from './src/features/context/orderContext'

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [products, setProducts] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartItems, setCartItems] = useState(null); 
  const [orders, setOrders] = useState(null);

  return (
    <AuthProvider
      value={{isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser}}>
      <ProductProvider
        value={{products, setProducts, currentProduct, setCurrentProduct}}>
        <CartProvider value={{cartItems, setCartItems}}>
          <OrderProvider value={{orders, setOrders}}>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
          </OrderProvider>
          </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
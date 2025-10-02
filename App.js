import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/Login/LoginScreen';
import Signup from './src/screens/Signup/Signup';
import Terms from './src/screens/Terms/TermsScreen';
import Doginfo from './src/screens/DogInfo/Doginfo';
import MainScreen from "./src/screens/Main/MainScreen";
import Dogdetail from "./src/screens/Dogdetail/Dogdetail";
import WalkScreen from "./src/screens/Walk/WalkScreen";
import WalkDetail from "./src/screens/Walkdetail/WalkDetail";
import CafeScreen from "./src/screens/CafeScreen/CafeScreen";
import CafeDetail from "./src/screens/CafeDetail/CafeDetail";
import HospitalScreen from "./src/screens/HospitalScreen/HospitalScreen";
import HospitalDetail from "./src/screens/HospitalDetail/HospitalDetail";
import TrainingScreen from "./src/screens/TrainingScreen/TrainingScreen";
import TrainingDetail from "./src/screens/TrainingDetail/TrainingDetail";
import ShoppingScreen from "./src/screens/ShoppingScreen/ShoppingScreen";
import ShoppingDetail from "./src/screens/ShoppingDetail/ShoppingDetail";
import CartScreen from "./src/screens/CartScreen/CartScreen";
import OrderScreen from "./src/screens/OrderScreen/OrderScreen";
import DeliveryAddressScreen from "./src/screens/DeliveryAddressScreen/DeliveryAddressScreen";
import CommunityScreen from "./src/screens/CommunityScreen/CommunityScreen";
import WritePostScreen from "./src/screens/WritePostScreen/WritePostScreen";
import WalkGroupScreen from "./src/screens/WalkGroupScreen/WalkGroupScreen";
import WalkGroupDetailScreen from "./src/screens/WalkGroupDetailScreen/WalkGroupDetailScreen";
import OneToOneDetailScreen from "./src/screens/OneToOneDetailScreen/OneToOneDetailScreen";
import PostDetailScreen from "./src/screens/OneToOneDetailScreen/PostDetailScreen";
import ChatScreen from "./src/screens/ChatScreen/ChatScreen";
import CouponScreen from "./src/screens/CouponScreen/CouponScreen";
import ExploreScreen from "./src/screens/ExploreScreen/ExploreScreen";
import WalkStartScreen from "./src/screens/WalkStartScreen/WalkStartScreen";
import MyScreen from "./src/screens/MyScreen/MyScreen";
import MyWalkHistoryScreen from "./src/screens/MyScreen/MyWalkHistoryScreen/MyWalkHistoryScreen";
import WalkLogDetailScreen from "./src/screens/MyScreen/MyWalkHistoryScreen/WalkLogDetailScreen";
import MyCommunityScreen from "./src/screens/MyScreen/MyCommunityScreen/MyCommunityScreen";
import MyCouponScreeny from "./src/screens/MyScreen/MyCouponScreen/MyCouponScreen";
import MyInfoEditScreen from "./src/screens/MyScreen/MyInfoEditScreen/MyInfoEditScreen";
import EditLoginInfoScreen from "./src/screens/MyScreen/MyInfoEditScreen/EditLoginInfoScreen/EditLoginInfoScreen";
import EditProfileInfoScreen from "./src/screens/MyScreen/MyInfoEditScreen/EditProfileInfoScreen/EditProfileInfoScreen"
import EditContactInfoScreen from "./src/screens/MyScreen/MyInfoEditScreen/EditContactInfoScreen/EditContactInfoScreen"
import EditAddressInfoScreen from "./src/screens/MyScreen/MyInfoEditScreen/EditAddressInfoScreen/EditAddressInfoScreen"


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="Doginfo" component={Doginfo} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="Dogdetail" component={Dogdetail} />
          <Stack.Screen name="WalkScreen" component={WalkScreen}/>
          <Stack.Screen name="WalkDetail" component={WalkDetail} />
          <Stack.Screen name="CafeScreen" component={CafeScreen} />
          <Stack.Screen name="CafeDetail" component={CafeDetail} />
          <Stack.Screen name="HospitalScreen" component={HospitalScreen} />
          <Stack.Screen name="HospitalDetail" component={HospitalDetail} />
          <Stack.Screen name="TrainingScreen" component={TrainingScreen} />
          <Stack.Screen name="TrainingDetail" component={TrainingDetail} />
          <Stack.Screen name="ShoppingScreen" component={ShoppingScreen} />
          <Stack.Screen name="ShoppingDetail" component={ShoppingDetail} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="OrderScreen" component={OrderScreen} />
          <Stack.Screen name="DeliveryAddressScreen" component={DeliveryAddressScreen} />
          <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
          <Stack.Screen name="WritePostScreen" component={WritePostScreen} />
          <Stack.Screen name="WalkGroupScreen" component={WalkGroupScreen} />
          <Stack.Screen name="WalkGroupDetailScreen" component={WalkGroupDetailScreen} />
          <Stack.Screen name="OneToOneDetailScreen" component={OneToOneDetailScreen} />
          <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="CouponScreen" component={CouponScreen} />
          <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
          <Stack.Screen name="WalkStartScreen" component={WalkStartScreen} />
          <Stack.Screen name="MyScreen" component={MyScreen} />
          <Stack.Screen name="MyWalkHistoryScreen" component={MyWalkHistoryScreen} />
          <Stack.Screen name="WalkLogDetailScreen" component={WalkLogDetailScreen} />
          <Stack.Screen name="MyCommunityScreen" component={MyCommunityScreen} />
          <Stack.Screen name="MyCouponScreeny" component={MyCouponScreeny} />
          <Stack.Screen name="MyInfoEditScreen" component={MyInfoEditScreen} />
          <Stack.Screen name="EditLoginInfoScreen" component={EditLoginInfoScreen} />
          <Stack.Screen name="EditProfileInfoScreen" component={EditProfileInfoScreen} />
          <Stack.Screen name="EditContactInfoScreen" component={EditContactInfoScreen} />
          <Stack.Screen name="EditAddressInfoScreen" component={EditAddressInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

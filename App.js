import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { Cart, HomePage, ProfilePage } from "./screens/Index";
import ProductDetails from "./screens/ProductDetails";
import NewRivals from "./screens/NewRivals";
import WelcomeScreen from "./screens/Swiper";
import FirstPage from "./screens/FirstPage";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/Signup";
import UseProvider from "./hook/useUser";
import { FavoritesProvider } from "./hook/useFavorites";
import Course from "./screens/Course";
import CoursesByCategory from "./components/course/CoursesByCategory";
import CourseList from "./components/course/CourseList";
import QuizList from "./components/quiz/QuizList";
import QuizByCategory from "./components/quiz/QuizByCategory";
import Quiz from "./screens/Quiz";
import InstructorPage from "./components/Instructor/Instructor";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useEffect } from "react";
import OrderTracking from "./screens/OrderTracking";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StripeProvider publishableKey="pk_test_51Nc9U6CNsQ61mmLfnEsi87ZXBGI0XLTutgjddx4yjTb56spTA1cdOPpZtkL1oGYJStASxmj8wnGcLDPXnE0qxhTo00PH4cBsdI">
      <UseProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen
                name="FirstPage"
                component={FirstPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Bottom Navigation"
                component={BottomTabNavigation}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="InstructorDetails"
                component={InstructorPage}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="Profile"
                component={ProfilePage}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="Cart"
                component={Cart}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="Order"
                component={OrderTracking}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen name="CourseList" component={CourseList} />
              <Stack.Screen
                name="CoursesByCategory"
                component={CoursesByCategory}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen name="QuizList" component={QuizList} />
              <Stack.Screen
                name="QuizByCategory"
                component={QuizByCategory}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="ProductList"
                component={NewRivals}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignupScreen"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Course"
                component={Course}
                options={{ headerShown: false }}
              ></Stack.Screen>

              <Stack.Screen
                name="Quiz"
                component={Quiz}
                options={{ headerShown: false }}
              ></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </FavoritesProvider>
      </UseProvider>
    </StripeProvider>
  );
}

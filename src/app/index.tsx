import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function homePage() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const ring1Style = useAnimatedStyle(() => {
    return {
      padding: ring1padding.value,
      backgroundColor: `rgba(255, 255, 255, 0.2)`,
      borderRadius: "100%",
    };
  });

  const ring2Style = useAnimatedStyle(() => {
    return {
      padding: ring2padding.value,
      backgroundColor: `rgba(255, 255, 255, 0.2)`,
      borderRadius: "100%",
    };
  });

  const router = useRouter();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => {
      ring1padding.value = withSpring(hp(5));
    }, 200);

    setTimeout(() => {
      ring2padding.value = withSpring(hp(5.5));
    }, 400);

    setTimeout(() => {
      router.push("/(tabs)/landing");
    }, 2000);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <Animated.View style={ring2Style}>
        <Animated.View style={ring1Style}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={{
              width: hp(20),
              height: hp(20),
              borderRadius: "100%",
            }}
          />
        </Animated.View>
      </Animated.View>
      <View className="items-center space-y-2">
        <Text
          className="font-bold text-white tracking-widest"
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="font-medium text-white tracking-widest"
          style={{ fontSize: hp(2) }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
}

export default homePage;

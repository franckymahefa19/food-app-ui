import { Stack } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { BellIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function Tabslayout() {
  return (
    <Stack>
      <Stack.Screen
        name="landing"
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {}}
              className="rounded-full overflow-hidden ml-4"
            >
              <Image
                source={{
                  uri: "https://plus.unsplash.com/premium_vector-1719858611039-66c134efa74d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={{
                  width: hp(5),
                  height: hp(5),
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View className="mr-4">
              <BellIcon size={hp(4)} color="gray" />
            </View>
          ),
        }}
      />
    </Stack>
  );
}

export default Tabslayout;

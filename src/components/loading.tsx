import { ActivityIndicator, View } from "react-native";

export const Loading = (props: any) => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator {...props} />
    </View>
  );
};

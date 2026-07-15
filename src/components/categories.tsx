import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export interface MealCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

function Categories({
  categories,
  activeCat,
  setActiveCat,
}: {
  categories: MealCategory[];
  activeCat: string;
  setActiveCat: (categorie: string) => void;
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, gap: 10 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCat;
          let activeBtnClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              className="items-center space-y-1"
              onPress={() => setActiveCat(cat.strCategory)}
            >
              <View className={`rounded-full p-[6px] ${activeBtnClass}`}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text
                className="text-neutral-600"
                style={{
                  fontSize: hp(1.6),
                }}
              >
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

export default Categories;

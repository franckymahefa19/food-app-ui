import Categories from "@/components/categories";
import Recipes from "@/components/recipes";
import axios from "axios";
import { useHeaderHeight } from "expo-router/build/react-navigation";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function landing() {
  const header = useHeaderHeight();
  const [activeCat, setActiveCat] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadCategories();
    loadRecipes(activeCat);
  }, [activeCat]);

  const loadCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php",
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
      setError(false);
    } catch (err: any) {
      console.log("error : ", err.message);
      setError(true);
    }
  };

  const loadRecipes = async (category: string) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      if (response && response.data) {
        setRecipes(response.data.meals);
      }
    } catch (err: any) {
      console.log("error : ", err.message);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: header + 10 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, gap: 10 }}
      >
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Frantor!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View>
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>
        {error ? (
          <View>Une erreur s'est produite</View>
        ) : (
          <>
            <View>
              {categories.length === 0 ? null : (
                <Categories
                  categories={categories}
                  activeCat={activeCat}
                  setActiveCat={setActiveCat}
                />
              )}
            </View>
            <View>
              <Recipes categories={categories} recipes={recipes} />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

export default landing;

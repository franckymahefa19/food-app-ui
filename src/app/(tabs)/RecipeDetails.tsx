import { Loading } from "@/components/loading";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square2StackIcon,
  UsersIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import YoutubeIframe from "react-native-youtube-iframe";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strInstructions: string;
  strYoutube?: string;
  [key: string]: any;
}

export default function RecipeDetails() {
  const item = useLocalSearchParams();
  const [isFavourite, setIsFavourite] = useState(true);
  const router = useRouter();
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (item.id) {
      loadRecipe(item.id as string);
    }
  }, [item.id]);

  const loadRecipe = async (id: string) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      if (response && response.data && response.data.meals) {
        setRecipe(response.data.meals[0]);
      }
    } catch (err: any) {
      console.log("error : ", err.message);
    } finally {
      setLoading(false);
    }
  };

  const ingredientsIndexes = (meal: Meal | null) => {
    if (!meal) return [];
    let indexes: number[] = [];
    for (let i = 1; i <= 20; i++) {
      if (
        meal["strIngredient" + i] &&
        meal["strIngredient" + i].trim() !== ""
      ) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
      className="bg-white flex-1"
    >
      {/* Section Image de fond */}
      <View className="flex-row justify-center">
        <Animated.Image
          source={{
            uri: (item.strMealThumb as string) || recipe?.strMealThumb,
          }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
          sharedTransitionTag={item.strMeal as string}
        />
      </View>

      {/* Boutons Retour et Favoris flottants */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        style={{
          position: "absolute",
          top: 16,
          left: 0,
          right: 0,
          zIndex: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          className="p-2 rounded-full bg-white shadow-sm"
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full bg-white shadow-sm"
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <HeartIcon size={hp(3.5)} color={isFavourite ? "red" : "gray"} />
        </TouchableOpacity>
      </Animated.View>

      {/* État de chargement */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : recipe ? (
        <View className="p-4 justify-between space-y-4 pt-8">
          {/* Titre & Origine */}
          <Animated.View
            entering={FadeInDown.delay(100).duration(700).springify()}
            className="space-y-2"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {recipe.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {recipe.strArea}
            </Text>
          </Animated.View>

          {/* Badges d'infos (Temps, portions, calories, difficulté) */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(700).springify()}
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View className="rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>

            <View className="rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full items-center justify-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>

            <View className="rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Cal
                </Text>
              </View>
            </View>

            <View className="rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full items-center justify-center"
              >
                <Square2StackIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Ingrédients */}
          <View className="space-y-4">
            <Animated.Text
              entering={FadeInDown.delay(300).duration(700).springify()}
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Animated.Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(recipe).map((i) => {
                return (
                  <Animated.View
                    entering={FadeInDown.delay(400).duration(700).springify()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    key={i}
                    className="flex-row space-x-4 items-center"
                  >
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-extrabold text-neutral-700"
                      >
                        {recipe["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium text-neutral-600"
                      >
                        {recipe["strIngredient" + i]}
                      </Text>
                    </View>
                  </Animated.View>
                );
              })}
            </View>
          </View>

          {/* Instructions de préparation */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>
            <Text
              style={{ fontSize: hp(1.6) }}
              className="text-neutral-700 leading-6"
            >
              {recipe.strInstructions}
            </Text>
          </View>

          {/* Lecteur Vidéo YouTube */}
          {recipe.strYoutube && getYoutubeVideoId(recipe.strYoutube) && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipe Video
              </Text>
              <View className="rounded-xl overflow-hidden">
                <YoutubeIframe
                  videoId={getYoutubeVideoId(recipe.strYoutube)!}
                  height={hp(25)}
                />
              </View>
            </View>
          )}
        </View>
      ) : (
        <View className="flex-1 justify-center items-center mt-16">
          <Text className="text-neutral-500">Recette introuvable.</Text>
        </View>
      )}
    </ScrollView>
  );
}

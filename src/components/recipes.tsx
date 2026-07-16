import MasonryList from "@react-native-seoul/masonry-list";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MealCategory } from "./categories";
import { Loading } from "./loading";

export interface MealListItem {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strArea: string | null;
  strCountry: string;
}

const Recipes = ({
  categories,
  recipes,
}: {
  categories: MealCategory[];
  recipes: MealListItem[];
}) => {
  return (
    <View className="space-y-3 mx-4">
      <Text
        className="font-semibold text-neutral-600"
        style={{ fontSize: hp(3) }}
      >
        Recipes
      </Text>
      {recipes.length === 0 || categories.length === 0 ? (
        <Loading size="large" className="mt-20" />
      ) : (
        <MasonryList
          data={recipes}
          keyExtractor={(item): string => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <RecipeCard item={item as MealListItem} index={i} />
          )}
          // refreshing={isLoadingNext}
          // onRefresh={() => refetch({ first: ITEM_CNT })}
          onEndReachedThreshold={0.1}
          // onEndReached={() => loadNext(ITEM_CNT)}
        />
      )}
    </View>
  );
};

export default Recipes;

const router = useRouter();

const RecipeCard = ({ item, index }: { item: MealListItem; index: number }) => {
  const isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="justify-center mb-4 space-y-1"
        onPress={() =>
          router.push({
            pathname: "/RecipeDetails",
            params: {
              id: item.idMeal,
              strMeal: item.strMeal, // Ajouté
              strMealThumb: item.strMealThumb, // Ajouté
            },
          })
        }
      >
        <Animated.Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          sharedTransitionTag={item.strMeal}
        />
        <Text
          className="font-semibold ml-2 text-neutral-600"
          style={{ fontSize: hp(1.5) }}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

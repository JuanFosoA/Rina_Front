import { ImageSourcePropType } from "react-native";

export type RecipeType = {
        id: string;
        name: string;
        image: ImageSourcePropType;
        rating: string;
        ingredients: string[];
        time: string;
        difficulty: string;
        calories: string;
    }


    export const RecipeList: RecipeType[] = [
        {
            id: "1",
            name: "Spaghetti Carbonara",
            image: require("../assets/spaghetti.webp"),
            rating: "4.8",
            ingredients: ["Spaghetti", "Eggs", "Parmesan Cheese", "Bacon", "Black Pepper", "Salt"],
            time: "25 min",
            difficulty: "Medium",
            calories: "540 kcal"
        },
        {
            id: "2",
            name: "Grilled Chicken Salad",
            image: require("../assets/salad.webp"),
            rating: "4.6",
            ingredients: ["Chicken Breast", "Lettuce", "Tomatoes", "Cucumber", "Olive Oil", "Lemon Juice"],
            time: "20 min",
            difficulty: "Easy",
            calories: "350 kcal"
        },
        {
            id: "3",
            name: "Avocado Toast",
            image: require("../assets/avocado_toast.webp"),
            rating: "4.9",
            ingredients: ["Bread", "Avocado", "Cherry Tomatoes", "Feta Cheese", "Olive Oil", "Salt", "Pepper"],
            time: "10 min",
            difficulty: "Easy",
            calories: "280 kcal"
        },
        {
            id: "4",
            name: "Beef Tacos",
            image: require("../assets/tacos.webp"),
            rating: "4.7",
            ingredients: ["Ground Beef", "Tortillas", "Onion", "Tomato", "Cilantro", "Lime", "Cheese"],
            time: "30 min",
            difficulty: "Medium",
            calories: "600 kcal"
        },
        {
            id: "5",
            name: "Mushroom Risotto",
            image: require("../assets/risotto.webp"),
            rating: "4.5",
            ingredients: ["Arborio Rice", "Mushrooms", "Garlic", "Parmesan Cheese", "White Wine", "Onion", "Butter"],
            time: "40 min",
            difficulty: "Hard",
            calories: "480 kcal"
        },
        {
            id: "6",
            name: "Blueberry Pancakes",
            image: require("../assets/pancakes.webp"),
            rating: "4.9",
            ingredients: ["Flour", "Eggs", "Milk", "Blueberries", "Baking Powder", "Maple Syrup", "Butter"],
            time: "20 min",
            difficulty: "Easy",
            calories: "350 kcal"
        },
        {
            id: "7",
            name: "Sushi Rolls",
            image: require("../assets/sushi.webp"),
            rating: "4.8",
            ingredients: ["Sushi Rice", "Nori", "Salmon", "Cucumber", "Avocado", "Soy Sauce", "Wasabi"],
            time: "50 min",
            difficulty: "Hard",
            calories: "320 kcal"
        }
    ];
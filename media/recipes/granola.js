
const get_recipe = function() { return {
    name: "Granola",
    meal: "Breakfast",
    duration: time(1, 0, 0),
    oven: 325,
    origin: "Sarah Karnasiewicz @ The New York Times",
    steps: [
        {
            text: "Preheat the oven to 325 F"
        },
        {
            text: "In a small bowl, whisk the following:",
            list: [
                "1/2 C olive oil",
                "1/2 C syrup",
                "2 Tbsp brown sugar",
                "zest of 3 oranges",
                "1 tsp ground ginger"
            ],
        },
        {
            text: "In a separate large bowl, combine the following:",
            list: [
                "3 C oats",
                "3/2 C coconut flakes",
                "1 C chopped cashews",
                "3/4 C pumpkin seeds"
            ]
        },
        {
            text: "Pour the wet ingredients from the small bowl into the bowl with the dry ingredients. Stir until combined uniformly."
        },
        {
            text: "In the small bowl, whisk one egg with a pinch of salt. Stir in the egg."
        },
        {
            text: "Spread the mixture over a parchment-lined baking sheet."
        },
        {
            text: "Bake for 30 minutes at 325F, rotating the baking sheet every 10 minutes.",
            time: time(0, 30, 0),
        },
        {
            text: "Let cool, then break into chunks and stir in 1 C of golden raisins. Store in a glass jar."
        }
    ]
}};

//const load_recipe = function() {
//    generate_recipe(recipe);
//};

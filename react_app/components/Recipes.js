import * as React from 'react';
import * as Native from 'react-native';
import * as Paper from 'react-native-paper';

const allRecipes = [
  {
    name: "Cake",
    ingredients: ["Eggs", "Flour", "Milk"],
    instructions: "Bake"
  },
  {
    name: "Pasta",
    ingredients: ["Noodles", "Basil", "Tomato"],
    instructions: "Boil"
  },
  {
    name: "Salad",
    ingredients: ["Lettuce", "Tomato"],
    instructions: "Toss"
  }
];

export default function Recipes() {

  function suggestedRecipes(ingredients) {
    return allRecipes;
  }

  const RecipeCard = ({recipe}) => (
    <Paper.Card style={styles.recipeCard}>
      <Paper.Card.Content>
        <Paper.Text variant="titleLarge">{recipe.name}</Paper.Text>
      </Paper.Card.Content>
      <Paper.Card.Cover source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/chocolate-cake-index-64b83bce2df26.jpg' }} />
    </Paper.Card>
  );

  return (
    <Native.View style={styles.container}>
      <Native.FlatList
        data={allRecipes}
        renderItem= { ({item}) => <RecipeCard recipe={item} /> }
        style={styles.recipeList}
      />
    </Native.View>
  );
}

const styles = Native.StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  text: {
    textAlign: 'center'
  },
  recipeList: {
    flex: 1,
  },
  recipeCard: {
    marginBottom: 10,
  }
});

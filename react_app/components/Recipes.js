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

  [suggestedRecipes, setSuggestedRecipes] = React.useState([0]);

  function suggestRecipes(ingredients) {
    setSuggestedRecipes(allRecipes);
    console.log(suggestedRecipes.length);
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
      <Paper.Button style={styles.button} mode='contained' onPress={suggestRecipes}> Suggest New Recipes! </Paper.Button>

      { suggestedRecipes.length == 0 ?
        <Paper.Text style={styles.text}> No Recipes Loaded </Paper.Text>
        :
        <Native.View>
          <Paper.Text style={styles.text}> Click on a card for more info: </Paper.Text>
          <Native.FlatList
            data={suggestedRecipes}
            renderItem= { ({item}) => <RecipeCard recipe={item} /> }
            style={styles.recipeList}
          />
        </Native.View>
      }
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
  },
  button: {
    marginBottom: 5
  }
});

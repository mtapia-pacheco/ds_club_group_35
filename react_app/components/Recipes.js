import * as React from 'react';
import * as Native from 'react-native';
import * as Paper from 'react-native-paper';

const allRecipes = [
  {
    name: "Cake",
    ingredients: ["Eggs", "Flour", "Milk", "Eggs", "Flour", "Milk", "Eggs", "Flour", "Milk", "Eggs", "Flour", "Milk", "Eggs", "Flour", "Milk", "Eggs", "Flour", "Milk"],
    instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis vulputate sem. Donec pharetra felis ut nisi pharetra, id aliquam quam consequat. Etiam faucibus lorem et ipsum accumsan, et dignissim nisi finibus. Nulla et massa sit amet sem tempus aliquet. In cursus a risus et semper. Phasellus tempor ut risus a blandit. Suspendisse non arcu placerat, aliquet ex rhoncus, venenatis nisi. Maecenas suscipit, turpis eu commodo posuere, mi velit iaculis mi, vulputate pretium enim orci in risus. Donec vel orci et metus hendrerit volutpat vitae et velit. Cras malesuada, neque at suscipit hendrerit, nibh ipsum ullamcorper nisl, non porta ex tellus vel lacus. In placerat massa felis, sit amet interdum nunc molestie vel.",
    image: require('../assets/snack-icon.png')
  },
  {
    name: "Pasta",
    ingredients: ["Noodles", "Basil", "Tomato"],
    instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis vulputate sem. Donec pharetra felis ut nisi pharetra, id aliquam quam consequat. Etiam faucibus lorem et ipsum accumsan, et dignissim nisi finibus. Nulla et massa sit amet sem tempus aliquet. In cursus a risus et semper. Phasellus tempor ut risus a blandit. Suspendisse non arcu placerat, aliquet ex rhoncus, venenatis nisi. Maecenas suscipit, turpis eu commodo posuere, mi velit iaculis mi, vulputate pretium enim orci in risus. Donec vel orci et metus hendrerit volutpat vitae et velit. Cras malesuada, neque at suscipit hendrerit, nibh ipsum ullamcorper nisl, non porta ex tellus vel lacus. In placerat massa felis, sit amet interdum nunc molestie vel.",
    image: require('../assets/snack-icon.png')
  },
  {
    name: "Salad",
    ingredients: ["Lettuce", "Tomato"],
    instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis vulputate sem. Donec pharetra felis ut nisi pharetra, id aliquam quam consequat. Etiam faucibus lorem et ipsum accumsan, et dignissim nisi finibus. Nulla et massa sit amet sem tempus aliquet. In cursus a risus et semper. Phasellus tempor ut risus a blandit. Suspendisse non arcu placerat, aliquet ex rhoncus, venenatis nisi. Maecenas suscipit, turpis eu commodo posuere, mi velit iaculis mi, vulputate pretium enim orci in risus. Donec vel orci et metus hendrerit volutpat vitae et velit. Cras malesuada, neque at suscipit hendrerit, nibh ipsum ullamcorper nisl, non porta ex tellus vel lacus. In placerat massa felis, sit amet interdum nunc molestie vel.",
    image: require('../assets/snack-icon.png')
  }
];

export default function Recipes() {

  [suggestedRecipes, setSuggestedRecipes] = React.useState([]);
  function suggestRecipes(ingredients) {
    setSuggestedRecipes(allRecipes);
  }

  const [recipeModalVisible, setRecipeModalVisible] = React.useState(false);
  const [focusedRecipe, setFocusedRecipe] = React.useState("");
  const focusRecipe = (recipe) => {
    setFocusedRecipe(recipe);
    setRecipeModalVisible(true);
  };

  const RecipeCard = ({recipe}) => (
    <Paper.Card style={styles.recipeCard} mode='elevated' onPress={() => focusRecipe(recipe)}>
      <Paper.Card.Title title={recipe.name} />
      <Paper.Card.Cover source={recipe.image} />
    </Paper.Card>
  );

  return (
    <Native.View style={styles.container}>
      <Paper.Button style={styles.button} mode='contained' onPress={suggestRecipes}> Suggest New Recipes! </Paper.Button>

      { suggestedRecipes.length == 0 ?
        <Paper.Text style={styles.text}> No Recipes Loaded </Paper.Text>
        :
        <Native.View style={{flex: 1}}>
          <Paper.Text style={styles.text}> Click on a card for more info: </Paper.Text>
          <Native.FlatList
            data={suggestedRecipes}
            renderItem= { ({item}) => <RecipeCard recipe={item} /> }
            style={styles.recipeList}
          />
        </Native.View>
      }

      <Paper.Portal>
        <Paper.Modal visible={recipeModalVisible} onDismiss={() => setRecipeModalVisible(false)} contentContainerStyle={styles.modal}>
          <Paper.Text variant='titleSmall' style={styles.modalTitle}>{focusedRecipe.name}</Paper.Text>
          <Native.Image style={{height: 200, margin: 10}} source={focusedRecipe.image} />
          <Native.View style={{flex: 1, flexDirection: 'row'}}>
            <Native.View style={{flex: 2, padding: 5}}>
              <Paper.Text style={styles.modalSubtitle}>Ingredients: </Paper.Text>
              <Native.FlatList
                data={focusedRecipe.ingredients}
                renderItem= { ({item}) => <Paper.Text style={styles.modalText}>{'- ' + item}</Paper.Text> }
                style={styles.recipeList}
              />
            </Native.View>
            <Native.View style={{flex: 3, padding: 5}}>
              <Paper.Text style={styles.modalSubtitle}>Instructions: </Paper.Text>
              <Native.ScrollView style={{flex: 1}}>
                <Paper.Text style={styles.modalText}>{focusedRecipe.instructions}</Paper.Text>
              </Native.ScrollView>
              
            </Native.View>
          </Native.View>
          
        </Paper.Modal>
      </Paper.Portal>
    </Native.View>
  );
}

const styles = Native.StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  text: {
    textAlign: 'center',
    marginBottom: 10
  },
  recipeList: {
    flex: 1,
  },
  recipeCard: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 5
  },
  modal: {
    backgroundColor: 'white', 
    height: 600,
    padding: 25
  },
  modalTitle: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10
  },
  modalSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    flex: 0
  },
  modalText: {
    flex: 1
  },
});

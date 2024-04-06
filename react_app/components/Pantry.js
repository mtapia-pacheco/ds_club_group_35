import * as React from 'react';
import * as Native from 'react-native';
import * as Paper from 'react-native-paper';

const allIngredients = ["Fish", "Flour", "Cabbage", "Squid", "Salmon", "Pie"];

export default function Pantry() {
  [ingredientData, setIngredientData] = React.useState(["Flour"]);

  const Ingredient = ({name}) => (
    <Native.View style={styles.ingredient}>
      <Paper.Text style={{flex: 1}}>{name}</Paper.Text>
      <Paper.Button mode="outlined" onPress={ () => {
        const index = ingredientData.indexOf(name);
        var newData;
        if(index >= 0) {newData = ingredientData.slice(); newData.splice(index, 1);}
        setIngredientData(newData);
      }}>Del</Paper.Button>
    </Native.View>
  );

  const [manualModalVisible, setManualModalVisible] = React.useState(false);
  const showManualModal = () => {setManualModalVisible(true); setManualText("")};
  const hideManualModal = () => setManualModalVisible(false);
  const [manualText, setManualText] = React.useState("");
  const addManual = () => {
    if(!ingredientData.includes(manualText)) {
      ingredientData.push(manualText);
      ingredientData.sort();
    }
    hideManualModal();
  };

  function suggestedIngredients() {
    return allIngredients.filter((x) => x.toLowerCase().startsWith(manualText.toLowerCase()));
  }

  return (
    <Native.View style={styles.container}>
      <Paper.Text style={styles.text}>Add Ingredients:</Paper.Text>
      <Native.View style={styles.buttonBar}>
        <Paper.Button style={styles.button} mode='contained'> Camera </Paper.Button>
        <Paper.Button style={styles.button} mode='contained' onPress={showManualModal}> Manual </Paper.Button>
      </Native.View>
      <Native.FlatList
        data={ingredientData}
        renderItem= { ({item}) => <Ingredient name={item} /> }
        style={styles.ingredientList}
      />

      <Paper.Portal>
        <Paper.Modal visible={manualModalVisible} onDismiss={hideManualModal} contentContainerStyle={styles.modal}>
          <Paper.TextInput
            label="Enter Ingredient Name..."
            value={manualText}
            onChangeText = {manualText => {setManualText(manualText); validateIngredientInput()}}
          />
          <Native.FlatList
            data={suggestedIngredients()}
            renderItem= { ({item}) => <Paper.Chip style={{marginTop: 5, marginRight: 5}} onPress={() => setManualText(item)}>{item}</Paper.Chip> }
            style={{margin: 10, padding:5}}
            horizontal
          />
          <Paper.Button mode='contained' disabled={!allIngredients.includes(manualText)} onPress={addManual}>Add</Paper.Button>
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
    textAlign: 'center'
  },
  buttonBar: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    marginRight: 5,
  },
  ingredientList: {
    padding: 5,
    flex: 1,
  },
  ingredient: {
    height: 50,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  },
  modal: {
    backgroundColor: 'white', 
    padding: 20
  }
});

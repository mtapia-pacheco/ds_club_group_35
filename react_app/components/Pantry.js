import * as React from 'react';
import * as Native from 'react-native';
import * as Paper from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';

const allIngredients = ["Fish", "Flour", "Cabbage", "Squid", "Salmon", "Pie", "Fish", "Flour", "Cabbage", "Squid", "Salmon", "Pie", "Fish", "Flour", "Cabbage", "Squid", "Salmon", "Pie"];

export default function Pantry() {
  [ingredientData, setIngredientData] = React.useState([]);

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

  const cameraRef = React.useRef();
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = React.useState(false);
  const [pictureTaken, setPictureTaken] = React.useState(false);

  const [cameraModalVisible, setCameraModalVisible] = React.useState(false);
  const showCameraModal = () => {
    if (cameraPermission.granted) {
      setPictureTaken(false);
      setCameraModalVisible(true);
    } else {
      requestCameraPermission();
    }
  };

  const hideCameraModal = () => setCameraModalVisible(false);

  const [cameraURI, setCameraURI] = React.useState("");
  const [cameraIngredients, setCameraIngredients] = React.useState([]);
  const takePicture = async () => {
    const data = await cameraRef.current.takePictureAsync({});
    setCameraURI(data.uri);
    console.log(data.uri);
    setPictureTaken(true);
    setCameraIngredients(getCameraIngredients());
  }

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
  
  [recipe, setRecipe] = React.useState([]);

  /*eact.useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch('/recipe?ingredients= pasta tomato onion');
      const data = await response.json();
      setRecipe(data);
    };

    fetchRecipe();
  }, []);*/

  const fetchRecipe = async () => {
    const response = await fetch('/recipe?ingredients= pasta tomato onion', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    /*.then(response => response.json())
    .then(response => setRecipe(response))
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      });
      */
      try {
        JSON.parse(response);
      }
      catch (error) {
        console.log('Error parsing JSON:', error, response);
      }
  };

  function ingredientAutofill() {
    return allIngredients.filter((x) => x.toLowerCase().startsWith(manualText.toLowerCase()));
  }

  function getCameraIngredients() {
    return allIngredients;
  }

  return (
    <Native.View style={styles.container}>
      <Paper.Text style={styles.text}>Add Ingredients:</Paper.Text>
      <Native.View style={styles.buttonBar}>
        <Paper.Button style={styles.button} mode='contained' onPress={showCameraModal}> Camera </Paper.Button>
        <Paper.Button style={styles.button} mode='contained' onPress={showManualModal}> Manual </Paper.Button>
      </Native.View>
      <Native.FlatList
        data={ingredientData}
        renderItem= { ({item}) => <Ingredient name={item} /> }
        style={styles.ingredientList}
      />
      <Native.View>
        <Paper.Button style={styles.button} mode='contained' onPress={fetchRecipe}>a</Paper.Button>
      </Native.View>

      <Paper.Portal>
        <Paper.Modal visible={cameraModalVisible} onDismiss={hideCameraModal} contentContainerStyle={styles.modal}>
          { !pictureTaken ?
            <Native.View>
              <Camera ref={cameraRef} style={styles.cameraPreview} type='back' ratio='4:3' onCameraReady={()=>setIsCameraReady(true)}></Camera>
              <Paper.Button visible={!pictureTaken} mode='contained' disabled={!isCameraReady} onPress={takePicture} >Take Picture</Paper.Button>
            </Native.View> 
            :
            <Native.View>
              <Native.Image style={styles.cameraPreview} source={{uri: cameraURI}} />
              <Native.Text>The following ingredients were found:</Native.Text>
              <Native.ScrollView contentContainerStyle={styles.chipList}>
                {cameraIngredients.map( (item) => <Paper.Chip style={styles.chip} onPress={() => setManualText(item)}>{item}</Paper.Chip>)}
              </Native.ScrollView>
              <Paper.Button visible={!pictureTaken} mode='contained' disabled={!isCameraReady} onPress={takePicture} >Add Ingredients</Paper.Button>
            </Native.View> 
          }
        </Paper.Modal>

        <Paper.Modal visible={manualModalVisible} onDismiss={hideManualModal} contentContainerStyle={styles.modal}>
          <Paper.TextInput
            label="Enter Ingredient Name..."
            value={manualText}
            onChangeText = {manualText => {setManualText(manualText)}}
          />
          <Native.ScrollView contentContainerStyle={styles.chipList}>
            {ingredientAutofill().map( (item) => <Paper.Chip style={styles.chip} onPress={() => setManualText(item)}>{item}</Paper.Chip>)}
          </Native.ScrollView>
          <Paper.Button mode='contained' disabled={!allIngredients.includes(manualText)} onPress={addManual}>Add Ingredient</Paper.Button>
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
  },
  chipList: {
    margin: 10,
    padding: 5,
    height: 100,
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  cameraPreview: {
    height: 250,
    marginBottom: 10,
  }
});

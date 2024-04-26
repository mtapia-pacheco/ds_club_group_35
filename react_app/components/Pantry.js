import * as React from 'react';
import * as Native from 'react-native';
import * as Paper from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';

const allIngredients = ["Fish", "Flour", "Cabbage", "Squid", "Salmon", "Lettuce", "Rice", "Beef", "Tomato", "Potato"];

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
      }}>X</Paper.Button>
    </Native.View>
  );

  const cameraRef = React.useRef();
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = React.useState(false);
  const [pictureTaken, setPictureTaken] = React.useState(false);
  const [pictureProcessing, setPictureProcessing] = React.useState(false);

  const [cameraModalVisible, setCameraModalVisible] = React.useState(false);
  const showCameraModal = () => {
    if (cameraPermission.granted) {
      setPictureTaken(false);
      setPictureProcessing(false);
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

    setPictureTaken(true);
    setCameraIngredients(getCameraIngredients());
    setPictureProcessing(true);

    setPictureProcessing(false);
  }

  const addCamera = () => {
    for(let cameraIngredient of cameraIngredients) {
      if(!ingredientData.includes(cameraIngredient)) {
        ingredientData.push(cameraIngredient);
      }
    }
    ingredientData.sort();
    hideCameraModal();
  };

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
      {
        ingredientData.length == 0 ?
        <Paper.Text style={styles.text}>No Ingredients! Add one with the buttons above!</Paper.Text>
        :
        <Native.FlatList
          data={ingredientData}
          renderItem= { ({item}) => <Ingredient name={item} /> }
          style={styles.ingredientList}
        />
      }

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
              { !pictureProcessing ?
                <Native.ScrollView contentContainerStyle={styles.chipList}>
                  {cameraIngredients.map( (item) => <Paper.Chip style={styles.chip} key={item}>{item}</Paper.Chip>)}
                </Native.ScrollView>
                :
                <Paper.ActivityIndicator animating={true} />
              }
              <Paper.Button visible={!pictureTaken} mode='contained' disabled={pictureProcessing} onPress={addCamera} >Add Ingredients</Paper.Button>
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
            {ingredientAutofill().map( (item) => <Paper.Chip style={styles.chip} key={item} onPress={() => setManualText(item)}>{item}</Paper.Chip>)}
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

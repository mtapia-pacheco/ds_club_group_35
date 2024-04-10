import * as React from 'react';
import * as Native from 'react-native';
import * as Paper from 'react-native-paper';

import Pantry from './components/Pantry';
import Recipes from './components/Recipes';

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'pantry', title: 'Pantry', focusedIcon: require('./assets/snack-icon.png') },
    { key: 'recipes', title: 'Recipes', focusedIcon: 'book' },
  ]);

  const renderScene = Paper.BottomNavigation.SceneMap({
    pantry: Pantry,
    recipes: Recipes,
  });

  return (
    <Paper.Provider>
    <Native.SafeAreaView style={styles.container}>
      <Paper.Title style={styles.header}> WorldlyBites </Paper.Title>
      <Paper.BottomNavigation
        style={styles.bottomBar}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </Native.SafeAreaView>
    </Paper.Provider>
  );
}

const styles = Native.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  header: {
    flex: 0,
    padding: 10,
    paddingTop: 20,
    textAlign: 'center',
  },
  bottomBar: {
    flex: 1,
  },
});

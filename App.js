import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from "./store";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePageNav from './navigations/HomePageNav';
import { RootSiblingParent } from 'react-native-root-siblings';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <HomePageNav/>
      </Provider>
    </RootSiblingParent>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

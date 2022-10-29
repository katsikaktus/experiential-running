import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from "./store";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePageNav from './navigations/HomePageNav';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <HomePageNav/>
    </Provider>
    
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

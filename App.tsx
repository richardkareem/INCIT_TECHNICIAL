import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { Route } from './src/routes'
import FlashMessage from 'react-native-flash-message'
import { store } from './src/redux/store'
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Route />
        <FlashMessage position={'top'} />
      </NavigationContainer>
    </Provider>
  )
}

export default App

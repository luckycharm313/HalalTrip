import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  user: require('./UserRedux').reducer,
  main: require('./MainRedux').reducer,
  category: require('./CategoryRedux').reducer,
  hotel: require('./HotelRedux').reducer,
  place: require('./PlaceRedux').reducer,
  restaurant: require('./RestaurantRedux').reducer,
  activity: require('./ActivityRedux').reducer,
  trend : require('./TrendRedux').reducer,
  startup : require('./StartupRedux').reducer,
  tourist : require('./TouristRedux').reducer,
  search : require('./SearchRedux').reducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)
  let persistor = persistStore(store)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return {store, persistor}
}

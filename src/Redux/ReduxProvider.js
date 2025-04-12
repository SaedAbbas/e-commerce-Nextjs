'use client'
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store";
import { Provider } from 'react-redux'

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;

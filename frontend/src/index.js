import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ShopContextProvider from "./Context/ShopContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import returnStoreAndPersistor from "./app/store"

console.log(React);
const {store, persistor} = returnStoreAndPersistor(); 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShopContextProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ShopContextProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

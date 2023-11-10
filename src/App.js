import React from "react";
import "./App.css";
import { Root } from "./components/Root";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
    return (
        <Provider store={store}>
            <Root />
        </Provider>
    );
}

export default App;

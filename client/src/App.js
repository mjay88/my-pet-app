import "./App.scss";
import Layout from "./components/Layout";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <div className="App">
      <GlobalProvider >
        <Layout />
      </GlobalProvider>
    </div>
  );
}

export default App;

import RoutesApp from "./routes";

import GlobalStyle from "./styles/global";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <RoutesApp />
    </>
  );
}

export default App;

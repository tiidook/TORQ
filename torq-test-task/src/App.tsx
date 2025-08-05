import { ToastContainer } from "react-toastify";

import { IpLookup } from "./features/ip-lookup";
import { AppContainer } from "./appStyles";

function App() {
  return (
    <AppContainer>
      <IpLookup/>
      <ToastContainer position="top-right" autoClose={3000} />
    </AppContainer>
  )
}

export default App

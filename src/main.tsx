import ReactDOM from "react-dom/client"
import App from "./App"
import { CurrencyProvider } from "./Context/CurrencyContext"

const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(
  <CurrencyProvider>
    <App />
  </CurrencyProvider>
)

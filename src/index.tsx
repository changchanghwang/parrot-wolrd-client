import App from "./app/App";
import { createRoot } from "react-dom/client";
import "@assets/fonts/font.css";

const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);

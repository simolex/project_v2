import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
    <RouterProvider>
        <App />
    </RouterProvider>
);

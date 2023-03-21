import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import cytoscape from "cytoscape";
import gridGuide from "cytoscape-grid-guide";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
gridGuide(cytoscape);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

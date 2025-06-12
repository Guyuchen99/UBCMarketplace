import "./styles.css";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<HeroUIProvider>
				<ToastProvider />
				<App />
			</HeroUIProvider>
		</Provider>
	</StrictMode>
);

/**
 * @format
 */
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Platform } from "react-native";

if (Platform.OS !== "web") {
    global.self = global;
}

AppRegistry.registerComponent(appName, () => App);

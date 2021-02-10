import { AsyncStorage } from "react-native";
import { USER_KEY } from "../Constants/config";

var token;

export async function authHeader() {
  // return authorization header with jwt token
  if (!token) {
    console.log("reading async storage......");
    let user = await AsyncStorage.getItem(USER_KEY);
    if (user) {
      user = JSON.parse(user);
      token = user.token;
    }
  }

  return {
    Authorization: "Bearer " + token
  };
}

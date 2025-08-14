import { useState } from "react";
import { View } from "react-native";
import { auth0Config } from "@/auth/auth0";
import { jwtDecode } from "jwt-decode";
import { AppNavBar } from "@/common/app-nav-bar";
import { useAuthStore } from "@/store/auth";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import HomeScreen from "../home-screen/home-screen";

export default function LoginScreen() {
  console.log("LoginScreen rendered");
  const { domain, clientId, redirectUrl } = auth0Config;
  const { setToken, login, setUser } = useAuthStore.getState();

  WebBrowser.maybeCompleteAuthSession();

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "notesight",
    path: "callback",
    preferLocalhost: false,
  });

  console.log("Redirect URI:", redirectUri);

  const discovery = {
    authorizationEndpoint: `https://${domain}/authorize`,
    tokenEndpoint: `https://${domain}/oauth/token`,
    revocationEndpoint: `https://${domain}/oauth/revoke`,
  };

  async function loginWithAuth0() {
    console.log("📞 loginWithAuth0 called");

    const nonce = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    console.log("nonce", nonce);

    const request = new AuthSession.AuthRequest({
      clientId: clientId,
      redirectUri,
      responseType: AuthSession.ResponseType.IdToken,
      scopes: ["openid", "profile", "email"],
      extraParams: {
        // audience: `https://${domain}/api/v2/`,
        nonce: nonce, // 🔐 must be a unique random string in real use
      },
    });

    console.log("request", JSON.stringify(request, null, 1));
    const res = await request.makeAuthUrlAsync(discovery);
    console.log("makeAuthUrlAsync", res);

    const result = await request.promptAsync(discovery);
    console.log("result", JSON.stringify(result, null, 1));
    if (result.type === "success" && result.params.id_token) {
      const user = jwtDecode(result.params.id_token);
      console.log("user", JSON.stringify(user, null, 1));
      setUser(user);
      setToken(result.params.id_token);
      login(); // Update global auth state
      console.log("access_", result.params.access_token);
      return {
        idToken: result.params.id_token,
        accessToken: result.params.access_token ?? null,
        user,
      };
    }
    console.log("Reached here");
    throw new Error("Error encountered during login: " + result.type);
  }

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <AppNavBar login={loginWithAuth0} />

      <HomeScreen />
    </View>
    // <View style={{ padding: 20 }}>
    //   {userInfo ? (
    //     <>
    //       <Text>Welcome {userInfo.nickname}</Text>
    //       <Text>Email: {userInfo.email}</Text>
    //       <Button title="Logout" onPress={() => logoutWithAuth0()} />
    //     </>
    //   ) : (
    //     <Button title="Login with Auth0" onPress={() => loginWithAuth0()} />
    //   )}
    // </View>
  );
}

// import React, { useState, useCallback } from "react";
// import {
//   StyleSheet,
//   View,
//   ActivityIndicator,
//   SafeAreaView,
//   Platform,
//   TouchableOpacity,
//   Text,
// } from "react-native";
// import { useAuth0 } from "react-native-auth0";
// import { useFocusEffect } from "@react-navigation/native";

// // import { makeRedirectUri } from "expo-auth-session";
// import { useAuthStore } from "@/store/auth";
// import * as AuthSession from "expo-auth-session";
// import { auth0Config } from "@/auth/auth0";

// // import { AppNavBar } from "../components/app-navbar/AppNavbar";

// export default function LoginScreen() {
//   const { authorize, cancelWebAuth } = useAuth0();
//   const { setToken, login } = useAuthStore.getState();
//   const [isLoading, setIsLoading] = useState(false);
//   const { domain, clientId, redirectUrl } = auth0Config;
//   console.log("LoginScreen rendered");

//   async function userLogin() {
//     const redirectUri = AuthSession.makeRedirectUri({
//       scheme: "notesight",
//       path: redirectUrl, // Must match Auth0 Allowed Callback URLs
//     });

//     console.log("Redirect URI:", redirectUri);

//     const result = await AuthSession.startAsync({
//       authUrl:
//         `https://${domain}/authorize` +
//         `?client_id=${clientId}` +
//         `&redirect_uri=${encodeURIComponent(redirectUri)}` +
//         `&response_type=token` +
//         `&scope=openid profile email`,
//     });

//     console.log("Auth result:", result);
//   }

//   // const userLogin = async () => {
//   //   console.log("Login Hit");
//   //   try {
//   //     setIsLoading(true);

//   //     const redirectUri =
//   //       Platform.OS === "ios"
//   //         ? makeRedirectUri({ scheme: "notesight", path: "ios/callback" })
//   //         : makeRedirectUri({ scheme: "notesight", path: "android/callback" });

//   //     console.log("Redirect URI:", redirectUri);

//   //     const credentials = await authorize({
//   //       scope: "openid profile email",
//   //       redirectUrl: redirectUri,
//   //       audience: "https://dev-7v1ogpzhapj6e1en.us.auth0.com/api/v2/",
//   //       additionalParameters: { prompt: "login" },
//   //     });

//   //     console.log("Login successful", credentials);
//   //     if (credentials) {
//   //       login();
//   //       setToken(credentials.accessToken);
//   //     }

//   //     // await SecureStore.setItemAsync("token", credentials.accessToken);

//   //     setIsLoading(false);
//   //   } catch (e: any) {
//   //     if (e.code === "USER_CANCELLED") {
//   //       await cancelWebAuth();
//   //       console.log("User cancelled login", e);
//   //     } else {
//   //       console.log("Login failed:", e);
//   //     }
//   //     setIsLoading(false);
//   //   }
//   // };

//   // useFocusEffect(
//   //   useCallback(() => {
//   //     userLogin();
//   //   }, [])
//   // );

//   // if (isLoading) {
//   //   return (
//   //     <View style={styles.loader}>
//   //       <ActivityIndicator size="large" />
//   //     </View>
//   //   );
//   // }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <TouchableOpacity style={styles.signInButton} onPress={userLogin}>
//           <Text style={styles.signInText}>Login</Text>
//         </TouchableOpacity>

//         {/* <AppNavBar login={userLogin} />
//         <HomeScreen /> */}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   container: {
//     height: "100%",
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10,
//   },
//   image: { height: 30, width: 200 },

//   signInButton: {
//     backgroundColor: "#000",
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//   },
//   signInText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
// });

import { use, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { MenuIcon } from "lucide-react-native";
import SideMenu from "./side-menu";
import { useAuthStore } from "@/store/auth";

export const AppNavBar = ({ login }: any) => {
  const { user } = useAuthStore.getState();

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.navBar}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      {user && <Text>{user.nickname}</Text>}
      {!user && (
        <TouchableOpacity style={styles.signInButton} onPress={login}>
          <Text style={styles.signInText}>Login</Text>
        </TouchableOpacity>
      )}

      {/* <LoginScreen /> */}

      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <MenuIcon size={32} />
        {/* <Menu size={32} color="black" /> */}
      </TouchableOpacity>

      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 100,
  },
  signInButton: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  signInText: {
    color: "#fff",
    fontWeight: "600",
  },
  navBar: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 2,
    zIndex: 999,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111827",
  },
  contentContainer: {
    padding: 16,
    alignItems: "center",
    width: "100%",
  },
});

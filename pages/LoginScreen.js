import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';

import { useDispatch, useSelector } from "react-redux";
import {
    setActiveUser,
    setUserLogOut,
    selectUserEmail,
} from "./store/userSlice2";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const dispatch = useDispatch();

    const userEmail = useSelector(selectUserEmail);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((authUser) => {
            console.log("AUTHUSER", authUser)
            if (authUser) {
                navigation.replace("HomeScreen");
                dispatch(
                    setActiveUser({
                        name: authUser.displayName ? authUser.displayName : authUser.email,
                        photo: authUser.photoURL
                            ? authUser.photoURL
                            : "https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y",
                    })
                );
                return unsubscribe;
            } else {
                dispatch(setUserLogOut());
            }
        });
    }, []);

    const handleLogin = () => {
        if (email && password !== "") {
            console.log(email, password);

            auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    console.log("Auth Response", response)
                })
                .catch((err) => {
                    console.log(err.message);
                    // auth().createUserWithEmailAndPassword(email, password)
                    err.message ===
                        // "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."
                        "[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.]"
                        ? auth().createUserWithEmailAndPassword(email, password)
                        : alert(err.message)
                }
                );
        } else {
            alert("Access Denied");
        }
    };

    const emailPasswordValidator = () => {
        const emailPattern = /^[^]+@[^]+[a-z]{2,3}$/;
        const passwordValidation = password.length >= 8 ? true : false;
        const emailValidation = email.match(emailPattern) ? true : false;
        passwordValidation && emailValidation === true
            ? handleLogin()
            : alert("Invalid email or password");
    };
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={emailPasswordValidator}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        height: "80%",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    textInput: {
        marginTop: 20,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: "black",
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
});
import React, { useEffect } from "react";
import firebase, { auth } from "./firebase-config";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

const Auth = () => {
    useEffect(() => {
        const ui =
            firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

        ui.start("#firebaseui-auth-container", {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID, // Email/Password
            ],
            signInSuccessUrl: "/",
        });
        return () => {
            ui.delete()
        };
    }, []);
    return (
        <div>
            <h2>Accedi</h2>
            <div id="firebaseui-auth-container"></div>
        </div>
    );
};

export default Auth;

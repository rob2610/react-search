import React, { useEffect } from "react";
import firebase, { auth } from "./firebase-config";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

const Auth = () => {
    useEffect(() => {
        const ui =
            firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

        ui.start("#firebaseui-auth-container", {
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false,
                    disableSignUp: { status: true },
                },
            ],
            signInFlow: "popup",
            callbacks: {
                signInFailure: (error) => {
                    if (error.code === "auth/user-not-found") {
                        return Promise.reject(new Error("The user is not registered. Contact the admin."));
                    }
                    return Promise.reject(error);
                },
            },
            credentialHelper: firebaseui.auth.CredentialHelper.NONE
        });

        return () => {
            ui.delete();
        };
    }, []);

    return (
        <div className="login-container">
            <h2>Login</h2>
            <div id="firebaseui-auth-container"></div>
        </div>
    );
};

export default Auth;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Auth = ({ children }) => {
    const { user } = useContext(UserContext);

    if (user) {
        return <Navigate to={"/"} replace />;
    }

    return children;
};

export default Auth;

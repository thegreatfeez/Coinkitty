import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"


export default function AuthRequired() {
    const {currentUser} = useAuth()
    if (!currentUser) {
        return(
        <Navigate to="login" 
        state={{message: '⚠️ You need to log in first before you can access your portfolio.'}} />
        )
    }
    return <Outlet />
}
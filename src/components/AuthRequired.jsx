import React from "react"
import { Outlet, Navigate } from "react-router-dom"


export default function AuthRequired() {
    const isAuthenticated = false
    if (!isAuthenticated) {
        return(
        <Navigate to="login" 
        state={{message: '⚠️ You need to log in first before you can access your portfolio.'}} />
        )
    }
    return <Outlet />
}
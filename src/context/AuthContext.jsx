"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "@/helper/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authModalTab, setAuthModalTab] = useState("login"); // "login" | "register"

    // Restore session from localStorage on mount
    useEffect(() => {
        try {
            const savedToken = localStorage.getItem("auth_token");
            const savedUser = localStorage.getItem("auth_user");
            if (savedToken && savedUser) {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
            }
        } catch (e) {
            console.error("Failed to restore auth session:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    // Persist session to localStorage
    const persistSession = (accessToken, userData) => {
        localStorage.setItem("auth_token", accessToken);
        localStorage.setItem("auth_user", JSON.stringify(userData));
        setToken(accessToken);
        setUser(userData);
    };

    // Clear session
    const clearSession = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        setToken(null);
        setUser(null);
    };

    // Login
    const login = async (email, password) => {
        const response = await axiosInstance.post("/login", { email, password });
        const { access_token, user_data } = response.data;
        persistSession(access_token, user_data);
        return response.data;
    };

    // Register
    const register = async (formData) => {
        const response = await axiosInstance.post("/register", {
            name: `${formData.first_name} ${formData.last_name}`.trim(),
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
        });
        const { access_token, user_data } = response.data;
        persistSession(access_token, user_data);
        return response.data;
    };

    // Logout
    const logout = useCallback(() => {
        clearSession();
        setAuthModalOpen(false);
    }, []);

    // Open auth modal
    const openAuthModal = useCallback((tab = "login") => {
        setAuthModalTab(tab);
        setAuthModalOpen(true);
    }, []);

    // Close auth modal
    const closeAuthModal = useCallback(() => {
        setAuthModalOpen(false);
    }, []);

    const isAuthenticated = !!token && !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated,
                login,
                register,
                logout,
                authModalOpen,
                authModalTab,
                setAuthModalTab,
                openAuthModal,
                closeAuthModal,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Eye, EyeOff, User, Mail, Phone, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AuthModal() {
    const {
        authModalOpen,
        authModalTab,
        setAuthModalTab,
        closeAuthModal,
        login,
        register,
        isAuthenticated,
    } = useAuth();

    const modalRef = useRef(null);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") closeAuthModal();
        };
        if (authModalOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [authModalOpen, closeAuthModal]);

    // Close if authenticated
    useEffect(() => {
        if (isAuthenticated && authModalOpen) {
            closeAuthModal();
        }
    }, [isAuthenticated, authModalOpen, closeAuthModal]);

    if (!authModalOpen) return null;

    return (
        <div className="auth-modal-overlay" onClick={closeAuthModal}>
            <div
                ref={modalRef}
                className="auth-modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={closeAuthModal}
                    className="auth-modal-close"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header with Islamic Pattern */}
                <div className="auth-modal-header">
                    <div className="auth-modal-header-pattern"></div>
                    <div className="auth-modal-header-content">
                        <div className="auth-modal-bismillah">﷽</div>
                        <h2 className="auth-modal-title">
                            {authModalTab === "login" ? "Welcome Back" : "Join Our Community"}
                        </h2>
                        <p className="auth-modal-subtitle">
                            {authModalTab === "login"
                                ? "Sign in to your account"
                                : "Create your account to get started"}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="auth-modal-tabs">
                    <button
                        onClick={() => setAuthModalTab("login")}
                        className={`auth-modal-tab ${authModalTab === "login" ? "auth-modal-tab-active" : ""}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setAuthModalTab("register")}
                        className={`auth-modal-tab ${authModalTab === "register" ? "auth-modal-tab-active" : ""}`}
                    >
                        Register
                    </button>
                </div>

                {/* Forms */}
                <div className="auth-modal-body">
                    {authModalTab === "login" ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    );
}

// ─── Login Form ──────────────────────────────────────────────────

function LoginForm() {
    const { login, setAuthModalTab, closeAuthModal } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!email.trim()) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Invalid email address";
        if (!password) errs.password = "Password is required";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        setErrors({});
        setIsSubmitting(true);
        try {
            await login(email, password);
            toast.success("Login successful! Welcome back.");
            closeAuthModal();
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Login failed. Please check your credentials.";
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            {/* Email */}
            <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrapper">
                    <Mail className="auth-input-icon" />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`auth-input ${errors.email ? "auth-input-error" : ""}`}
                    />
                </div>
                {errors.email && <span className="auth-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrapper">
                    <Lock className="auth-input-icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`auth-input ${errors.password ? "auth-input-error" : ""}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="auth-eye-btn"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.password && <span className="auth-error">{errors.password}</span>}
            </div>

            {/* Submit */}
            <button type="submit" disabled={isSubmitting} className="auth-submit-btn">
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing in...
                    </span>
                ) : (
                    "Sign In"
                )}
            </button>

            {/* Switch */}
            <p className="auth-switch-text">
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => setAuthModalTab("register")} className="auth-switch-link">
                    Register Now
                </button>
            </p>
        </form>
    );
}

// ─── Register Form ───────────────────────────────────────────────

function RegisterForm() {
    const { register: registerUser, setAuthModalTab, closeAuthModal } = useAuth();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        // Clear error for field
        if (errors[field]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[field];
                return copy;
            });
        }
    };

    const validate = () => {
        const errs = {};
        if (!formData.first_name.trim()) errs.first_name = "First name is required";
        if (!formData.last_name.trim()) errs.last_name = "Last name is required";
        if (!formData.phone.trim()) errs.phone = "Phone number is required";
        if (!formData.email.trim()) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email address";
        if (!formData.password) errs.password = "Password is required";
        else if (formData.password.length < 6) errs.password = "Password must be at least 6 characters";
        if (!formData.password_confirmation) errs.password_confirmation = "Please confirm your password";
        else if (formData.password !== formData.password_confirmation)
            errs.password_confirmation = "Passwords do not match";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        setErrors({});
        setIsSubmitting(true);
        try {
            await registerUser(formData);
            toast.success("Registration successful! Welcome to our community.");
            closeAuthModal();
        } catch (err) {
            const data = err?.response?.data;
            if (data?.errors) {
                // Handle Laravel validation errors
                const fieldErrors = {};
                Object.keys(data.errors).forEach((key) => {
                    fieldErrors[key] = data.errors[key][0];
                });
                setErrors(fieldErrors);
                toast.error("Please fix the errors below.");
            } else {
                const msg = data?.message || "Registration failed. Please try again.";
                toast.error(msg);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            {/* Name Row */}
            <div className="auth-field-row">
                <div className="auth-field">
                    <label className="auth-label">First Name</label>
                    <div className="auth-input-wrapper">
                        <User className="auth-input-icon" />
                        <input
                            type="text"
                            placeholder="First name"
                            value={formData.first_name}
                            onChange={handleChange("first_name")}
                            className={`auth-input ${errors.first_name ? "auth-input-error" : ""}`}
                        />
                    </div>
                    {errors.first_name && <span className="auth-error">{errors.first_name}</span>}
                </div>
                <div className="auth-field">
                    <label className="auth-label">Last Name</label>
                    <div className="auth-input-wrapper">
                        <User className="auth-input-icon" />
                        <input
                            type="text"
                            placeholder="Last name"
                            value={formData.last_name}
                            onChange={handleChange("last_name")}
                            className={`auth-input ${errors.last_name ? "auth-input-error" : ""}`}
                        />
                    </div>
                    {errors.last_name && <span className="auth-error">{errors.last_name}</span>}
                </div>
            </div>

            {/* Phone */}
            <div className="auth-field">
                <label className="auth-label">Phone Number</label>
                <div className="auth-input-wrapper">
                    <Phone className="auth-input-icon" />
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange("phone")}
                        className={`auth-input ${errors.phone ? "auth-input-error" : ""}`}
                    />
                </div>
                {errors.phone && <span className="auth-error">{errors.phone}</span>}
            </div>

            {/* Email */}
            <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrapper">
                    <Mail className="auth-input-icon" />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange("email")}
                        className={`auth-input ${errors.email ? "auth-input-error" : ""}`}
                    />
                </div>
                {errors.email && <span className="auth-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrapper">
                    <Lock className="auth-input-icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange("password")}
                        className={`auth-input ${errors.password ? "auth-input-error" : ""}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="auth-eye-btn"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.password && <span className="auth-error">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
                <label className="auth-label">Confirm Password</label>
                <div className="auth-input-wrapper">
                    <Lock className="auth-input-icon" />
                    <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.password_confirmation}
                        onChange={handleChange("password_confirmation")}
                        className={`auth-input ${errors.password_confirmation ? "auth-input-error" : ""}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="auth-eye-btn"
                    >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.password_confirmation && (
                    <span className="auth-error">{errors.password_confirmation}</span>
                )}
            </div>

            {/* Submit */}
            <button type="submit" disabled={isSubmitting} className="auth-submit-btn">
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                    </span>
                ) : (
                    "Create Account"
                )}
            </button>

            {/* Switch */}
            <p className="auth-switch-text">
                Already have an account?{" "}
                <button type="button" onClick={() => setAuthModalTab("login")} className="auth-switch-link">
                    Sign In
                </button>
            </p>
        </form>
    );
}

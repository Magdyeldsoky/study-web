import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/data/fakeAuth";
import Logo from "../components/logo";
import { FaUserPlus, FaArrowRight, FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!firstName || !lastName || !usernameOrEmail || !password || !confirmPassword) {
            setError("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const isEmail = usernameOrEmail.includes("@");

        const result = registerUser({
            firstName,
            lastName,
            username: isEmail ? usernameOrEmail.split("@")[0] : usernameOrEmail,
            email: isEmail ? usernameOrEmail : `${usernameOrEmail}@fake.com`,
            password,
        });

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/login");
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden p-4">

            {/* Mesh Gradients - ثابتة في كل صفحات الـ Auth */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-[550px] z-10 animate-in fade-in zoom-in-95 duration-700">

                {/* Logo Section */}
                <div className="flex justify-center mb-8">
                    <div className="p-3 bg-muted/30 rounded-[1.8rem] border border-border/40 backdrop-blur-sm">
                        <Logo size="38px" />
                    </div>
                </div>

                {/* Register Card */}
                <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black tracking-tight text-foreground">
                            Create <span className="text-primary">Account</span>
                        </h1>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mt-2">
                            Join our community today
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-destructive/10 text-destructive text-[11px] font-bold p-3 rounded-xl text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Name Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 ml-2">First Name</label>
                                <div className="relative group">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors text-xs" />
                                    <Input
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="FirstName"
                                        className="h-12 pl-10 rounded-xl bg-muted/20 border-border/40 focus:bg-card transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 ml-2">Last Name</label>
                                <Input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="LastName"
                                    className="h-12 px-4 rounded-xl bg-muted/20 border-border/40 focus:bg-card transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        {/* Username/Email */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 ml-2">Username or Email</label>
                            <div className="relative group">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors text-xs" />
                                <Input
                                    value={usernameOrEmail}
                                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                                    placeholder="yourname@example.com"
                                    className="h-12 pl-10 rounded-xl bg-muted/20 border-border/40 focus:bg-card transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        {/* Passwords Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 ml-2">Password</label>
                                <div className="relative group">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors text-xs" />
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="h-12 pl-10 rounded-xl bg-muted/20 border-border/40 focus:bg-card transition-all text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 ml-2">Confirm</label>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="h-12 px-4 rounded-xl bg-muted/20 border-border/40 focus:bg-card transition-all text-sm"
                                />
                            </div>
                        </div>

                        <Button className="w-full h-14 mt-4 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                            Register Now <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <div className="pt-4 text-center">
                            <p className="text-sm text-muted-foreground font-medium">
                                Already have an account?{" "}
                                <Link to="/login" className="text-foreground font-black hover:text-primary transition-colors">
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <p className="text-center mt-8 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em] opacity-50">
                    © 2026 Tweakcn Design System
                </p>
            </div>
        </section>
    );
};

export default RegisterPage;
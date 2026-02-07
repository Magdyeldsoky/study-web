import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../components/logo";
import { FaArrowRight, FaLock, FaEnvelope, FaUserTie } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const [inputEmailOrUsername, setInputEmailOrUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [role, setRole] = useState("teacher");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const savedUsers = JSON.parse(localStorage.getItem("fake_users")) || [];
        const user = savedUsers.find(
            (u) => u.email === inputEmailOrUsername || u.username === inputEmailOrUsername
        );

        if (!user) { setErrorMessage("This account does not exist"); return; }
        if (user.password !== inputPassword) { setErrorMessage("Incorrect password"); return; }
        if (user.role !== role) { setErrorMessage("Role does not match this account"); return; }

        localStorage.setItem("current_user", JSON.stringify(user));
        user.role === "teacher" ? navigate("/home") : navigate("/userhome");
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden p-4">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />

            <div className="w-full max-w-[440px] z-10 animate-in fade-in zoom-in-95 duration-700">
                <div className="flex justify-center mb-8">
                    <div className="p-4 bg-card/40 rounded-[2.2rem] border border-border/50 backdrop-blur-md shadow-2xl">
                        <Logo size="42px" />
                    </div>
                </div>

                <div className="bg-card/30 backdrop-blur-2xl border border-white/10 rounded-[2.8rem] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black tracking-tighter text-foreground leading-tight">
                            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/60">Back</span>
                        </h1>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mt-3 opacity-70">
                            Secure Access Portal
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-4">
                                Identifier
                            </label>
                            <div className="relative group">
                                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="text"
                                    placeholder="Username or Email"
                                    className="h-14 pl-14 rounded-2xl bg-black/20 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40 font-medium"
                                    value={inputEmailOrUsername}
                                    onChange={(e) => setInputEmailOrUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-4">
                                Account Type
                            </label>
                            <div className="relative group">
                                <FaUserTie className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" />
                                <select
                                    className="h-14 w-full pl-14 pr-4 rounded-2xl bg-black/20 border border-border/40 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all appearance-none text-foreground"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="teacher" className="bg-card text-foreground">Teacher</option>
                                    <option value="learner" className="bg-card text-foreground">Learner</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/80">
                                    Password
                                </label>
                                <Link to="/forgot-password" title="Reset your password"
                                      className="text-[9px] font-black text-primary/60 hover:text-primary uppercase tracking-tighter transition-colors">
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative group">
                                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-14 pl-14 rounded-2xl bg-black/20 border-border/40 focus:border-primary/50"
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-[11px] font-black p-4 rounded-2xl text-center animate-in slide-in-from-top-2">
                                {errorMessage.toUpperCase()}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-15 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group transition-all"
                        >
                            Sign In
                            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <div className="pt-6 text-center">
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-tight">
                                Don't have an account?{" "}
                                <Link to="/register"
                                      className="text-foreground font-black hover:text-primary transition-colors decoration-primary/30 underline-offset-4 hover:underline">
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <p className="text-center mt-10 text-[9px] text-muted-foreground font-black uppercase tracking-[0.4em] opacity-40">
                    Secured by Tweakcn Cryptography
                </p>
            </div>
        </section>
    );
};

export default Login;
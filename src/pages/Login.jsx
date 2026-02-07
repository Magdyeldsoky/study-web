import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../components/logo";
import { FaArrowRight, FaLock, FaEnvelope } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const [inputEmailOrUsername, setInputEmailOrUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const savedUsers = JSON.parse(localStorage.getItem("fake_users")) || [];
        const user = savedUsers.find(
            (u) => u.email === inputEmailOrUsername || u.username === inputEmailOrUsername
        );

        if (!user) {
            setErrorMessage("This account does not exist");
            return;
        }
        if (user.password !== inputPassword) {
            setErrorMessage("Incorrect password");
            return;
        }
        localStorage.setItem("current_user", JSON.stringify(user));
        navigate("/home");
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden p-4">

            {/* Mesh Gradients (خلفية ستايل Tweakcn الشهيرة) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-[440px] z-10 animate-in fade-in zoom-in-95 duration-700">

                {/* Logo Section */}
                <div className="flex justify-center mb-10">
                    <div className="p-4 bg-muted/30 rounded-[2rem] border border-border/40 backdrop-blur-sm">
                        <Logo size="42px" />
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black tracking-tight text-foreground">
                            Welcome <span className="text-primary">Back</span>
                        </h1>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-[0.2em] mt-2">
                            Login to your account
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* Input Field: Username/Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 ml-2">
                                Identify Yourself
                            </label>
                            <div className="relative group">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="text"
                                    placeholder="Username or Email"
                                    className="h-14 pl-12 rounded-2xl bg-muted/20 border-border/40 focus:bg-card transition-all font-medium"
                                    value={inputEmailOrUsername}
                                    onChange={(e) => setInputEmailOrUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Input Field: Password */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">
                                    Password
                                </label>
                                <Link to="/forgot-password" size="sm" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter">
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative group">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-14 pl-12 rounded-2xl bg-muted/20 border-border/40 focus:bg-card transition-all"
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="bg-destructive/10 text-destructive text-[11px] font-bold p-3 rounded-xl text-center animate-shake">
                                {errorMessage}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            Sign In <FaArrowRight className="text-sm" />
                        </Button>

                        <div className="pt-4 text-center">
                            <p className="text-sm text-muted-foreground font-medium">
                                New here?{" "}
                                <Link to="/register" className="text-foreground font-black hover:text-primary transition-colors">
                                    Create an Account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer Note */}
                <p className="text-center mt-8 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em] opacity-50">
                    Secured by Tweakcn Auth
                </p>
            </div>
        </section>
    );
};

export default Login;
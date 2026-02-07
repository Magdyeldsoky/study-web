import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/data/fakeAuth";
import Logo from "../components/logo";
import { FaUserPlus, FaArrowRight, FaUser, FaLock, FaEnvelope, FaUserTie } from "react-icons/fa";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("teacher");
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
            role
        });

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/login");
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden p-6">

            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />

            <div className="w-full max-w-[580px] z-10 animate-in fade-in zoom-in-95 duration-700">

                <div className="flex justify-center mb-8">
                    <div className="p-4 bg-card/40 rounded-[2.2rem] border border-border/50 backdrop-blur-md shadow-2xl">
                        <Logo size="42px" />
                    </div>
                </div>

                <div className="bg-card/30 backdrop-blur-2xl border border-white/10 rounded-[2.8rem] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] relative overflow-hidden">

                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-black tracking-tighter text-foreground leading-tight">
                            Create <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/60">Account</span>
                        </h1>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mt-3 opacity-70">
                            Begin your professional journey
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive text-[11px] font-black p-4 rounded-2xl text-center animate-in slide-in-from-top-2">
                            {error.toUpperCase()}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-4">First Name</label>
                                <div className="relative group">
                                    <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors text-xs" />
                                    <Input
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        className="h-14 pl-14 rounded-2xl bg-black/20 border-border/40 focus:border-primary/50 font-bold"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-4">Last Name</label>
                                <Input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    className="h-14 px-6 rounded-2xl bg-black/20 border-border/40 focus:border-primary/50 font-bold"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-4">Identifier</label>
                                <div className="relative group">
                                    <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors text-xs" />
                                    <Input
                                        value={usernameOrEmail}
                                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                                        placeholder="Email or Username"
                                        className="h-14 pl-14 rounded-2xl bg-black/20 border-border/40 focus:border-primary/50 font-bold"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-4">Role</label>
                                <div className="relative group">
                                    <FaUserTie className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 text-xs" />
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="h-14 w-full pl-14 pr-4 rounded-2xl bg-black/20 border border-border/40 text-sm font-bold focus:outline-none focus:border-primary/50 text-foreground appearance-none"
                                    >
                                        <option value="teacher" className="bg-card">Teacher</option>
                                        <option value="learner" className="bg-card">Learner</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-4">Password</label>
                                <div className="relative group">
                                    <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors text-xs" />
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="h-14 pl-14 rounded-2xl bg-black/20 border-border/40 focus:border-primary/50"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-4">Confirm</label>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="h-14 px-6 rounded-2xl bg-black/20 border-border/40 focus:border-primary/50"
                                />
                            </div>
                        </div>

                        <Button className="w-full h-15 mt-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group transition-all">
                            Register Now <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <div className="pt-6 text-center">
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-tight">
                                Member already?{" "}
                                <Link to="/login" className="text-foreground font-black hover:text-primary transition-colors decoration-primary/30 underline-offset-4 hover:underline">
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <p className="text-center mt-10 text-[9px] text-muted-foreground font-black uppercase tracking-[0.4em] opacity-40">
                    © 2026 Tweakcn Design System • Secure Registration
                </p>
            </div>
        </section>
    );
};

export default RegisterPage;
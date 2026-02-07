import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "../components/logo";
import { FaArrowLeft, FaPaperPlane, FaEnvelope } from "react-icons/fa";

const ForgotPassword = () => {
    const navigate = useNavigate();

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
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-[1.2rem] bg-primary/10 text-primary mb-6 border border-primary/20 shadow-inner">
                            <FaEnvelope className="text-2xl" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-foreground leading-tight">
                            Reset <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/60">Access</span>
                        </h1>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.25em] mt-4 leading-relaxed max-w-[240px] mx-auto opacity-70">
                            We'll send a recovery link to your inbox
                        </p>
                    </div>

                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-4">
                                Registered Credentials
                            </label>
                            <div className="relative group">
                                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors text-xs z-20" />
                                <Input
                                    id="input-field-username"
                                    type="text"
                                    placeholder="Enter your Email or Username"
                                    className="h-15 pl-14 rounded-2xl bg-black/20 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-bold placeholder:text-muted-foreground/40 text-foreground"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-15 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group transition-all"
                        >
                            Send Recovery Link <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>

                        <div className="pt-2 text-center">
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-border/40 to-transparent my-4" />

                            <Button
                                type="button"
                                variant="ghost"
                                className="w-fit mx-auto h-10 px-6 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group transition-all"
                                onClick={() => navigate("/login")}
                            >
                                <FaArrowLeft className="text-[10px] group-hover:-translate-x-1 transition-transform" /> Back to Login
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="text-center mt-10">
                    <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                        Need help? Contact secure support
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../components/logo";
import { FaShieldAlt, FaSync, FaArrowLeft, FaKey } from "react-icons/fa";

const CodePage = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    const handleVerify = (e) => {
        e.preventDefault();
        alert(`Verifying code: ${code}`);
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden p-4">

            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />

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
                            <FaShieldAlt className="text-2xl" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-foreground leading-tight">
                            Verify <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/60">Identity</span>
                        </h1>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.25em] mt-4 leading-relaxed max-w-[240px] mx-auto opacity-70">
                            Enter the secure code sent to your device
                        </p>
                    </div>

                    <form className="space-y-8" onSubmit={handleVerify}>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-4">
                                Secure Access Code
                            </label>
                            <div className="relative group">
                                <FaKey className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors text-xs z-20" />
                                <Input
                                    id="input-code"
                                    type="text"
                                    maxLength={6}
                                    placeholder="0 0 0 0 0 0"
                                    className="h-20 pl-4 rounded-2xl bg-black/20 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-black text-center text-3xl tracking-[0.4em] placeholder:tracking-normal placeholder:font-medium placeholder:text-sm placeholder:opacity-30 text-foreground"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-15 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all"
                        >
                            Confirm & Continue
                        </Button>

                        <div className="flex flex-col gap-4 pt-2 text-center">
                            <Button
                                type="button"
                                variant="ghost"
                                className="w-fit mx-auto h-10 px-6 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group transition-all"
                                onClick={() => alert("Code resent!")}
                            >
                                <FaSync className="text-[10px] group-hover:rotate-180 transition-transform duration-700" /> Resend Code
                            </Button>

                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-border/40 to-transparent my-2" />

                            <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-tight">
                                Back to safety?{" "}
                                <Link to="/login" className="text-foreground font-black hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">
                                    Login Page
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="text-center mt-10">
                    <p className="inline-flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-[0.4em] opacity-40">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        2FA Authentication Active
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CodePage;
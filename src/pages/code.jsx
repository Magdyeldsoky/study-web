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
        // هنا ممكن تضيف Logic التأكيد
        alert(`Verifying code: ${code}`);
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden p-4">

            {/* Mesh Gradients - ثابتة لربط الهوية البصرية */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-[440px] z-10 animate-in fade-in zoom-in-95 duration-700">

                {/* Logo Section */}
                <div className="flex justify-center mb-10">
                    <div className="p-4 bg-muted/30 rounded-[2rem] border border-border/40 backdrop-blur-sm">
                        <Logo size="42px" />
                    </div>
                </div>

                {/* Verification Card */}
                <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
                            <FaShieldAlt className="text-xl" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">
                            Verify <span className="text-primary">Identity</span>
                        </h1>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mt-3 leading-relaxed max-w-[200px] mx-auto">
                            We've sent a secure code to your device
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleVerify}>
                        {/* Input Field: Verification Code */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 ml-2">
                                Secure Code
                            </label>
                            <div className="relative group">
                                <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors text-xs" />
                                <Input
                                    id="input-code"
                                    type="text"
                                    maxLength={6}
                                    placeholder="0 0 0 0 0 0"
                                    className="h-16 pl-12 rounded-2xl bg-muted/20 border-border/40 focus:bg-card transition-all font-black text-center text-xl tracking-[0.5em] placeholder:tracking-normal placeholder:font-medium placeholder:text-sm"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Confirm & Continue
                        </Button>

                        <div className="flex flex-col gap-2 pt-2 text-center">
                            <Button
                                type="button"
                                variant="ghost"
                                className="w-full h-10 rounded-xl text-muted-foreground hover:text-primary text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 group"
                                onClick={() => alert("Code resent!")}
                            >
                                <FaSync className="text-[10px] group-hover:rotate-180 transition-transform duration-500" /> Resend Code
                            </Button>

                            <p className="text-[11px] text-muted-foreground font-medium">
                                Remember your password?{" "}
                                <Link to="/login" className="text-foreground font-black hover:text-primary transition-colors underline underline-offset-4">
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Security Footer */}
                <p className="text-center mt-8 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em] opacity-60 flex items-center justify-center gap-2">
                    Two-Factor Authentication Active
                </p>
            </div>
        </section>
    );
};

export default CodePage;
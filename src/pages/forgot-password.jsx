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

            {/* Mesh Gradients - للحفاظ على الهوية البصرية الموحدة */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-[440px] z-10 animate-in fade-in zoom-in-95 duration-700">

                {/* Logo Section */}
                <div className="flex justify-center mb-10">
                    <div className="p-4 bg-muted/30 rounded-[2rem] border border-border/40 backdrop-blur-sm">
                        <Logo size="42px" />
                    </div>
                </div>

                {/* Forgot Password Card */}
                <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black tracking-tight text-foreground">
                            Reset <span className="text-primary font-extrabold">Access</span>
                        </h1>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mt-3 leading-relaxed">
                            Don't worry, we'll send you a recovery link
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {/* Input Field: Email or Username */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 ml-2">
                                Your Credentials
                            </label>
                            <div className="relative group">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors text-xs" />
                                <Input
                                    id="input-field-username"
                                    type="text"
                                    placeholder="Email or Username"
                                    className="h-14 pl-12 rounded-2xl bg-muted/20 border-border/40 focus:bg-card transition-all font-medium"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                        >
                            Send Link <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>

                        <div className="pt-2">
                            <Button
                                type="button"
                                variant="ghost"
                                className="w-full h-12 rounded-xl text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                                onClick={() => navigate("/login")}
                            >
                                <FaArrowLeft className="text-[10px]" /> Back to Login
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Support Footer */}
                <p className="text-center mt-8 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em] opacity-60">
                    Need help? Contact support
                </p>
            </div>
        </section>
    );
};

export default ForgotPassword;
import React from "react";
import baground from "/images/bg.png";
import "../heros-styl/hero.css";
import { Button } from "@/components/ui/button.jsx";
import {
    FaBook,
    FaGraduationCap,
    FaLightbulb,
    FaClipboardList,
    FaLaptopCode,
    FaPencilAlt,
    FaClock,
    FaDollarSign,
    FaUniversity,
    FaTrophy, FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HrtoExpeince from "@/components/heromodels/HrtoExpeince.jsx";
import Nav from "../components/ui/nav";

const words = [
    { text: "Tutoring", Icon: FaBook },
    { text: "Expert Students", Icon: FaGraduationCap },
    { text: "Study Smart", Icon: FaLightbulb },
    { text: "Chapter Help", Icon: FaClipboardList },
    { text: "Video Lessons", Icon: FaLaptopCode },
    { text: "Notes & Summaries", Icon: FaPencilAlt },
    { text: "Flexible Hours", Icon: FaClock },
    { text: "Affordable Rates", Icon: FaDollarSign },
    { text: "College-wide", Icon: FaUniversity },
    { text: "Real Results", Icon: FaTrophy },
];

const StartPage = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-background">
            <Nav />

            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0">
                <img src={baground} alt="background" className="w-full h-full object-cover scale-110 animate-pulse duration-[10s]" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <header className="flex flex-col gap-10 text-center lg:text-left animate-in fade-in slide-in-from-left-10 duration-1000">
                        <div className="space-y-8">
                            <div className="hero-text">
                                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-tight flex flex-col lg:flex-row items-center lg:items-end gap-4">
                                    <span className="shrink-0 text-foreground drop-shadow-sm">Learn</span>

                                    <span className="slide block overflow-hidden h-[1.3em] min-w-[280px] sm:min-w-[340px] bg-card/30 rounded-[1.5rem] px-6 border border-white/10 backdrop-blur-xl relative shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
                                        <span className="wrapper flex flex-col transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)">
                                            {words.map((word, index) => {
                                                const Icon = word.Icon;
                                                return (
                                                    <span
                                                        key={index}
                                                        className="flex items-center justify-center lg:justify-start gap-4 h-[1.3em] shrink-0 group"
                                                    >
                                                        <Icon className="text-primary text-2xl md:text-4xl animate-bounce-slow" />
                                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 font-black italic uppercase text-xl sm:text-2xl md:text-4xl">
                                                            {word.text}
                                                        </span>
                                                    </span>
                                                );
                                            })}
                                        </span>
                                    </span>
                                </h1>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
                                    with <span className="underline decoration-primary/30 decoration-8 underline-offset-4">Top College</span> Students <br />
                                    <span className="text-primary italic inline-flex items-center gap-3">
                                        & Get Real Results <span className="h-1 w-20 bg-primary/20 rounded-full hidden md:block" />
                                    </span>
                                </h2>

                                <p className="text-base md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold opacity-80">
                                    Connect with experts in your college and get the help you
                                    need. Learn smarter, save time, and master your future.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            <Button
                                size="lg"
                                className="h-16 px-14 rounded-[2rem] bg-primary text-primary-foreground font-black text-xl shadow-[0_20px_40px_-12px_rgba(var(--primary),0.4)] hover:shadow-[0_25px_50px_-12px_rgba(var(--primary),0.5)] hover:-translate-y-1 active:scale-95 transition-all group"
                                onClick={() => navigate("/login")}
                            >
                                Get Started <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                            </Button>

                            <div className="flex -space-x-4">
                                {[1,2,3,4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-muted overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-4 border-background bg-primary flex items-center justify-center text-[10px] font-black text-primary-foreground">
                                    +500
                                </div>
                            </div>
                        </div>
                    </header>

                    <figure className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000 delay-300">
                        <div className="absolute w-80 h-80 bg-primary/25 rounded-full blur-[120px] -z-10 animate-pulse" />
                        <div className="absolute w-60 h-60 bg-blue-500/10 rounded-full blur-[100px] top-1/4 right-1/4 -z-10" />

                        <div className="w-full h-full flex items-center justify-center perspective-1000">
                            <HrtoExpeince />
                        </div>
                    </figure>

                </div>
            </div>

          
        </section>
    );
};

export default StartPage;
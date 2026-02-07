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

            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none z-0">
                <img src={baground} alt="background" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <header className="flex flex-col gap-10 text-center lg:text-left animate-in fade-in slide-in-from-left-10 duration-1000">
                        <div className="space-y-8">
                            <div className="hero-text">
                                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-tight flex flex-col lg:flex-row items-center lg:items-end gap-4">
                                    <span className="shrink-0 text-foreground">Learn</span>

                                    <span className="slide block overflow-hidden h-[1.3em] min-w-[260px] sm:min-w-[320px] bg-primary/5 rounded-2xl px-5 border border-primary/10 backdrop-blur-sm relative shadow-inner">
                    <span className="wrapper flex flex-col transition-all duration-500 ease-in-out">
                      {words.map((word, index) => {
                          const Icon = word.Icon;
                          return (
                              <span
                                  key={index}
                                  className="flex items-center justify-center lg:justify-start gap-3 h-[1.3em] shrink-0"
                              >
                            <Icon className="text-primary text-2xl md:text-3xl" />
                            <span className="text-foreground font-black italic uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl">
                              {word.text}
                            </span>
                          </span>
                          );
                      })}
                    </span>
                  </span>
                                </h1>
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground/90 leading-tight">
                                    with Top College Students <br />
                                    <span className="text-primary italic">& Get Real Results.</span>
                                </h2>

                                <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                    Connect with experts in your college and get the help you
                                    need—whether it’s a tricky chapter, quick notes, or a full video
                                    lesson. Learn smarter, save time.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-start">
                            <Button
                                size="lg"
                                className="h-16 px-12 rounded-[1.5rem] bg-primary text-primary-foreground font-black text-xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group"
                                onClick={() => navigate("/login")}
                            >
                                Get Started <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </div>
                    </header>

                    <figure className="relative w-full h-[450px] lg:h-[600px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000 delay-300">
                        <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>

                        <div className="w-full h-full flex items-center justify-center">
                            <HrtoExpeince />
                        </div>
                    </figure>

                </div>
            </div>
        </section>
    );
};

export default StartPage;
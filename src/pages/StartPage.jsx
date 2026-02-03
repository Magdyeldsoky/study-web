import React from "react";
import baground from "/images/bg.png"; // خلفية الصفحة
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
  FaTrophy,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HrtoExpeince from "@/components/heromodels/HrtoExpeince.jsx";

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
    <section className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src={baground} alt="background" />
      </div>
      <div className="hero-layout">
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Learn
                <span className="slide">
                  <span className="wrapper flex gap-2">
                    {words.map((word, index) => {
                      const Icon = word.Icon;
                      return (
                        <span
                          key={index}
                          className="flex items-center md-gap-3 gap-1 pb-2"
                        >
                          <Icon className="text-primary size-7" />{" "}
                          {/* بدل text-blue-600 */}
                          <span className="text-foreground font-medium text-[20px] sm:text-[24px] md:text-[30px] lg:text-[34px]">
                            {word.text}
                          </span>
                        </span>
                      );
                    })}
                  </span>
                </span>
              </h1>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-foreground">
                with Top College Students
              </h1>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-foreground">
                and Get Real Results
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl">
                Connect with top students in your college and get the help you
                need—whether it’s a tricky chapter, quick notes, or a full video
                lesson. Learn smarter, save time, and pay only for what you
                need.
              </p>
            </div>
            <Button
              type="button"
              className="z-100 w-80 mt-2 justify-center text-secondary hover:text-foreground text-sm font-medium"
              onClick={() => navigate("/login")}
            >
              Get started
            </Button>
          </div>
        </header>
        <figure>
          <div className="hero-3d-layout">
            <HrtoExpeince />
          </div>
        </figure>
      </div>
    </section>
  );
};

export default StartPage;

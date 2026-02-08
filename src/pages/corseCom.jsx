import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    FaArrowLeft,
    FaPlayCircle,
    FaFilePdf,
    FaCheckCircle,
    FaClock,
    FaLock
} from "react-icons/fa";
import { getTeacherCourses } from "@/data/fakeAuth";

const CorseCom = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(0);

    const query = new URLSearchParams(location.search);
    const courseId = query.get("id");

    useEffect(() => {
        const allCourses = getTeacherCourses();
        const found = allCourses.find(c => c.id === parseInt(courseId));
        setCourse(found);
    }, [courseId]);

    if (!course) return <div className="p-20 text-center font-black uppercase tracking-widest opacity-20">Loading Course Content...</div>;

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 animate-in fade-in duration-700">
            <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="mb-8 group hover:bg-primary/10 rounded-2xl px-6"
            >
                <FaArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" />
                <span className="font-black uppercase text-xs tracking-widest">Back to Library</span>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-6">
                    <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-black shadow-2xl border border-white/5 group">
                        <img
                            src={course.image}
                            className="w-full h-full object-cover opacity-40 blur-sm"
                            alt="Background"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FaPlayCircle className="text-primary text-8xl drop-shadow-2xl cursor-pointer hover:scale-110 transition-transform" />
                        </div>
                        <div className="absolute bottom-8 left-8">
                            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                Lesson {activeLesson + 1}: Getting Started
                            </h2>
                        </div>
                    </div>

                    <Card className="p-8 bg-card/20 backdrop-blur-3xl border-white/5 rounded-[3rem] border-t-white/10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-black tracking-tighter uppercase italic">{course.name}</h1>
                                <p className="text-muted-foreground mt-2 font-medium">Instructor: <span className="text-primary">@{course.instructor}</span></p>
                            </div>
                            <a href={course.pdfUrl} target="_blank" rel="noreferrer">
                                <Button className="rounded-2xl bg-primary/20 text-primary hover:bg-primary hover:text-white transition-all font-black text-xs uppercase tracking-widest h-12 px-6">
                                    <FaFilePdf className="mr-2" /> Resources (PDF)
                                </Button>
                            </a>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Welcome to the <span className="text-foreground font-bold">{course.name}</span> mastery course.
                            This module covers the fundamental principles of {course.code} and provides practical hands-on exercises
                            to ensure you grasp the core concepts effectively.
                        </p>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="bg-card/20 backdrop-blur-3xl border-white/5 rounded-[3rem] overflow-hidden sticky top-28 border-t-white/10">
                        <div className="p-8 border-b border-white/5 bg-white/5">
                            <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-3">
                                <FaPlayCircle className="text-primary" /> Course Content
                            </h3>
                            <div className="flex items-center gap-4 mt-4 text-[10px] font-black text-muted-foreground uppercase">
                                <span className="flex items-center gap-1"><FaClock className="text-primary" /> 12h 45m</span>
                                <span className="flex items-center gap-1"><FaCheckCircle className="text-primary" /> {course.lessons} Lessons</span>
                            </div>
                        </div>

                        <div className="p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                            {[...Array(course.lessons)].map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveLesson(index)}
                                    className={`
                                        flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all mb-2
                                        ${activeLesson === index
                                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                        : "hover:bg-white/5 text-muted-foreground"}
                                    `}
                                >
                                    <span className="text-xs font-black opacity-40 italic">0{index + 1}</span>
                                    <div className="flex-1">
                                        <h4 className="text-[11px] font-black uppercase tracking-wider line-clamp-1">
                                            {index === 0 ? "Introduction & Overview" : `Advanced Module ${index}`}
                                        </h4>
                                    </div>
                                    {index > 2 ? <FaLock className="text-[10px] opacity-30" /> : <FaPlayCircle className="text-sm" />}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default CorseCom;
import React, { useState, useEffect, useMemo } from "react";
import { getCurrentUser, getTeacherCourses } from "@/data/fakeAuth";
import Logo from "../components/logo";
import { useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    FaUserCircle, FaChevronDown, FaSignOutAlt,
    FaSearch, FaRocket, FaTerminal, FaFire,
    FaBookOpen, FaGraduationCap, FaChartLine
} from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Hero2Model from "@/components/hero2model/hero2model.jsx";

const UserHomepage = () => {
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const allCourses = useMemo(() => getTeacherCourses(), []);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    const filteredCourses = allCourses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogout = () => {
        localStorage.removeItem("current_user");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="w-full min-h-screen max-w-7xl mx-auto flex flex-col gap-10 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000 px-4 md:px-8 bg-background">

            <div className="flex items-center justify-between py-6 border-b border-border/40 shrink-0">
                <div className="p-2.5 bg-card/50 rounded-2xl border border-border shadow-sm backdrop-blur-md">
                    <Logo size="24px" />
                </div>

                <header className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                            <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-accent transition-all duration-300 border border-transparent hover:border-border">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-md">
                                    {user.firstName?.[0].toUpperCase()}
                                </div>
                                <div className="hidden md:flex flex-col items-start leading-none">
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-primary">Academy Student</span>
                                    <span className="text-[11px] font-bold text-foreground/80">@{user.username}</span>
                                </div>
                                <FaChevronDown className="text-[8px] text-muted-foreground ml-2" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl bg-card border-border shadow-2xl p-2">
                            <DropdownMenuLabel className="px-4 py-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate("/profile")} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors">
                                <FaUserCircle className="text-primary" /> <span className="font-bold text-xs">Profile Matrix</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-destructive hover:bg-destructive/10">
                                <FaSignOutAlt /> <span className="font-bold text-xs">Eject Session</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
            </div>

            <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-accent/20 rounded-[3rem] border border-border overflow-hidden min-h-[450px]">
                <div className="p-10 md:p-16 z-10 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                        <FaRocket className="animate-pulse" /> Final Mission Awaits
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 leading-[0.9]">
                        Ready for <br />
                        <span className="text-primary italic">Impact?</span>
                    </h1>
                    <p className="text-muted-foreground font-semibold text-sm md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                        Welcome back, {user.firstName}. All systems are go. Your training modules have been synchronized for today's session.
                    </p>
                </div>

                <div className="relative h-[350px] lg:h-full w-full">
                    <div className="absolute inset-0 z-0">
                        <Hero2Model />
                    </div>
                    <div className="absolute top-10 right-10 bg-card/80 backdrop-blur-md p-4 rounded-2xl border border-border shadow-2xl hidden md:block">
                        <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Live Status</p>
                        <p className="text-xs font-bold text-green-500 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" /> Connection Stable
                        </p>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sticky top-6 z-30">
                <div className="lg:col-span-3 relative group">
                    <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="SEARCH CORE DATABASE (NAME OR CODE)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-16 pl-14 pr-6 rounded-2xl bg-card border-border focus:border-primary shadow-xl text-xs font-black tracking-widest uppercase"
                    />
                </div>
                <Button className="h-16 rounded-2xl bg-primary text-primary-foreground font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                    Execute Search
                </Button>
            </div>

            <div className="space-y-8">
                <div className="flex items-center justify-between px-2 border-l-4 border-primary pl-4">
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tighter">Available Modules</h2>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Sector 01: Core Knowledge</p>
                    </div>
                    <span className="text-[10px] bg-accent px-4 py-2 rounded-full font-black text-foreground">
                        {filteredCourses.length} LOADED
                    </span>
                </div>

                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <Card
                                key={course.id}
                                onClick={() => navigate(`/corscom?id=${course.id}`)}
                                className="group relative bg-card border border-border rounded-[2.5rem] overflow-hidden hover:border-primary transition-all duration-500 cursor-pointer shadow-sm hover:shadow-2xl flex flex-col"
                            >
                                <div className="h-48 relative overflow-hidden bg-muted">
                                    <img
                                        src={course.image}
                                        alt={course.name}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                                    <div className="absolute top-5 left-5">
                                        <span className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase shadow-xl border border-white/10">
                                            {course.code}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-black text-foreground uppercase italic tracking-tighter group-hover:text-primary transition-colors leading-none">
                                            {course.name}
                                        </h3>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase">
                                            <span className="flex items-center gap-1.5 text-primary"><FaBookOpen /> {course.lessons} Units</span>
                                            <span className="flex items-center gap-1.5 text-orange-500"><FaFire /> Trending</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-[10px] font-black text-foreground">
                                                {course.instructor?.[0].toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-black text-muted-foreground uppercase leading-none">Instructor</span>
                                                <span className="text-[10px] font-bold text-foreground">@{course.instructor}</span>
                                            </div>
                                        </div>
                                        <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary transition-colors">
                                            <FaTerminal className="text-muted-foreground group-hover:text-primary-foreground transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="h-[400px] flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-border bg-accent/5 p-10 text-center">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <FaSearch className="text-primary/40 text-3xl" />
                        </div>
                        <h3 className="text-lg font-black uppercase text-foreground mb-2">No Matching Data</h3>
                        <p className="text-muted-foreground font-medium text-sm max-w-xs mx-auto">
                            The matrix couldn't find any course matching your request. Try adjusting your filters.
                        </p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <Card className="p-8 rounded-[2.5rem] border border-border bg-card/60 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary"><FaChartLine /></div>
                        <h2 className="text-lg font-black tracking-tight uppercase">Study Matrix</h2>
                    </div>
                    <div className="h-40 flex items-end gap-3 px-2">
                        {[40, 70, 45, 90, 60].map((val, i) => (
                            <div key={i} className="flex-1 bg-primary/20 rounded-t-xl group relative hover:bg-primary transition-all duration-500" style={{ height: `${val}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {val}%
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground font-black uppercase mt-6 text-center tracking-[0.3em]">Weekly Neural Activity</p>
                </Card>

                <Card className="p-8 rounded-[2.5rem] border border-border bg-card/60 backdrop-blur-md flex flex-col justify-center items-center text-center space-y-4">
                    <div className="p-5 bg-green-500/10 rounded-full text-green-500 text-3xl animate-bounce"><FaGraduationCap /></div>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">Unlock Your Potential</h2>
                    <p className="text-sm text-muted-foreground font-medium max-w-xs">
                        Complete 3 more units this week to earn the <span className="text-primary font-bold">"Alpha Scout"</span> badge.
                    </p>
                    <Button variant="outline" className="rounded-full px-8 font-black text-[10px] uppercase tracking-widest border-primary/20 hover:bg-primary/5">View Badges</Button>
                </Card>
            </div>
        </div>
    );
};

export default UserHomepage;
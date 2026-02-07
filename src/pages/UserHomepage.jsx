import React, { useState, useEffect } from "react";
import { getCurrentUser } from "@/data/fakeAuth";
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
import { FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import Hero2Model from "@/components/hero2model/hero2model.jsx";

const UserHomepage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("current_user");
        navigate("/login");
    };

    if (!user) return null;

    const getInitials = (firstName, lastName) => {
        return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
    };

    const lineData = [10, 15, 12, 20];
    const barData = [70, 80, 68, 90];
    const subjects = ["Math", "Physics", "Chemistry", "Biology"];
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

    const maxLine = Math.max(...lineData);
    const maxBar = Math.max(...barData);

    return (
        <div className="w-full min-h-screen max-w-7xl mx-auto flex flex-col gap-6 pb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 px-4 md:px-8 overflow-x-hidden">

            <div className="flex justify-center w-full py-4 shrink-0">
                <div className="p-2.5 bg-card/30 rounded-[1.2rem] border border-border/40 backdrop-blur-md shadow-sm">
                    <Logo size="28px" />
                </div>
            </div>

            <header className="flex justify-start shrink-0">
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <div className="flex items-center gap-4 p-2 pr-5 rounded-[2rem] hover:bg-muted/30 transition-all duration-500 cursor-pointer group border border-transparent hover:border-border/40 hover:backdrop-blur-sm whitespace-nowrap">
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-[1.4rem] bg-gradient-to-br from-primary to-primary/40 p-[2px] shadow-lg">
                                    <div className="w-full h-full rounded-[1.3rem] bg-card flex items-center justify-center overflow-hidden border-2 border-background">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-sm font-black text-primary/80">{getInitials(user.firstName, user.lastName)}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start min-w-0">
                                <h2 className="text-sm font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-2 truncate max-w-[150px]">
                                    {user.firstName} <FaChevronDown className="text-[8px] opacity-40 shrink-0" />
                                </h2>
                                <p className="text-[10px] text-muted-foreground font-bold tracking-tight italic opacity-70 leading-none truncate max-w-[150px]">{user.email}</p>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mt-2 p-2 rounded-[1.5rem] bg-card/80 backdrop-blur-xl border-border/40 shadow-2xl">
                        <DropdownMenuLabel className="px-4 py-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border/40" />
                        <DropdownMenuItem onClick={() => navigate("/profile")} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors">
                            <FaUserCircle className="text-primary" /> <span className="font-bold text-xs">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-destructive hover:bg-destructive/10 transition-colors">
                            <FaSignOutAlt /> <span className="font-bold text-xs">Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            <section className="flex flex-col lg:grid lg:grid-cols-[350px_1fr] xl:grid-cols-[400px_1fr] gap-8 items-center min-h-fit lg:min-h-[500px]">

                <div className="w-full space-y-6 animate-in fade-in slide-in-from-left-10 duration-1000 order-2 lg:order-1 text-center lg:text-left">
                    <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80 block">
                            Live Learning
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] break-words">
                            Welcome, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/40">
                                {user.firstName}
                            </span>
                        </h1>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed max-w-sm mx-auto lg:mx-0 border-l-0 lg:border-l-4 border-primary/10 pl-0 lg:pl-6 py-1">
                        Your personalized learning space is ready. Track your weekly growth and explore new subjects.
                    </p>
                </div>

                <div className="relative w-full aspect-square lg:aspect-auto h-[350px] md:h-[450px] lg:h-full max-h-[600px] bg-gradient-to-b from-primary/5 to-transparent rounded-[3rem] border border-primary/5 backdrop-blur-3xl order-1 lg:order-2 flex items-center justify-center animate-in zoom-in-95 duration-1000">
                    <div className="absolute inset-0 z-10">
                        <Hero2Model />
                    </div>
                    <div className="absolute top-6 right-6 lg:top-10 lg:right-10 bg-card/50 backdrop-blur-md p-4 rounded-[1.5rem] border border-border/40 shadow-xl hidden sm:block">
                        <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Status</p>
                        <p className="text-xs font-bold text-green-500 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online Learning
                        </p>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card className="p-6 lg:p-8 rounded-[2.5rem] border border-border/20 shadow-none bg-card/40 backdrop-blur-md flex flex-col h-[300px] lg:h-[350px]">
                    <div className="flex justify-between items-center mb-6 lg:mb-8 shrink-0">
                        <h2 className="text-base lg:text-lg font-black tracking-tight">Study Hours</h2>
                        <span className="text-[9px] bg-primary/10 text-primary px-3 py-1 rounded-full font-black uppercase tracking-widest">Activity</span>
                    </div>
                    <div className="flex-1 flex items-end gap-2 lg:gap-3 px-1 h-full min-h-0">
                        {lineData.map((val, idx) => (
                            <div key={idx} className="group relative flex-1 flex flex-col items-center h-full">
                                <div className="bg-primary/20 group-hover:bg-primary/40 rounded-t-[0.8rem] w-full transition-all duration-500 relative" style={{ height: `${(val / maxLine) * 100}%` }}>
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] font-black px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20">{val}h</span>
                                </div>
                                <span className="mt-3 text-[8px] text-muted-foreground font-black uppercase tracking-widest truncate w-full text-center">{weeks[idx]}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6 lg:p-8 rounded-[2.5rem] border border-border/20 shadow-none bg-card/40 backdrop-blur-md flex flex-col h-[300px] lg:h-[350px]">
                    <div className="flex justify-between items-center mb-6 lg:mb-8 shrink-0">
                        <h2 className="text-base lg:text-lg font-black tracking-tight">Top Scores</h2>
                        <span className="text-[9px] bg-green-500/10 text-green-500 px-3 py-1 rounded-full font-black uppercase tracking-widest">Performance</span>
                    </div>
                    <div className="flex-1 flex items-end gap-2 lg:gap-3 px-1 h-full min-h-0">
                        {barData.map((val, idx) => (
                            <div key={idx} className="group relative flex-1 flex flex-col items-center h-full">
                                <div className="bg-green-500/20 group-hover:bg-green-500/40 rounded-t-[0.8rem] w-full transition-all duration-500 relative" style={{ height: `${(val / maxBar) * 100}%` }}>
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] font-black px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20">{val}%</span>
                                </div>
                                <span className="mt-3 text-[8px] text-muted-foreground font-black uppercase tracking-widest truncate w-full text-center">{subjects[idx]}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="fixed top-[40%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[100px] md:blur-[120px] -z-10 animate-pulse pointer-events-none" />
        </div>
    );
};

export default UserHomepage;
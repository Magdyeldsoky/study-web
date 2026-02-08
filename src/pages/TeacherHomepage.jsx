import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { FaBrain, FaHome, FaRocket, FaChevronRight, FaStar } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserHomepage = () => {
    const featuredCourses = [
        {
            title: "Neural Architectures",
            tag: "AI & ML",
            desc: "Master the core of deep learning with hands-on neural design.",
            img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400"
        },
        {
            title: "Quantum Computing",
            tag: "PHYSICS",
            desc: "The next frontier of computation. Dive into qubit mechanics.",
            img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400"
        },
        {
            title: "Cyber Security Ops",
            tag: "SECURITY",
            desc: "Defensive tactics and advanced threat hunting protocols.",
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400"
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">

            <Breadcrumb className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="flex items-center gap-2 hover:text-primary transition-all">
                            <FaHome className="text-sm" />
                            <span>System</span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="opacity-20" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="flex items-center gap-2 text-primary">
                            <FaBrain className="text-sm" />
                            <span>Control Center</span>
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <section className="relative overflow-hidden bg-card/20 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl">
                <div className="max-w-3xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                        <FaRocket className="animate-bounce" /> Deployment Ready
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
                        Elevate Your <br />
                        <span className="text-primary italic">Teaching Matrix</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl font-medium">
                        Welcome to the core. Design, manage, and deploy world-class academic content with our next-gen instructor interface.
                    </p>
                </div>

                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[10%] w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]" />
            </section>

            <div className="space-y-8">
                <div className="flex items-end justify-between px-2">
                    <div>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter">Quick Access</h2>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Recently Modified Modules</p>
                    </div>
                    <Button variant="link" className="text-primary font-black uppercase text-[10px] tracking-widest group">
                        View All Labs <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredCourses.map((course, i) => (
                        <Card key={i} className="group bg-card/30 backdrop-blur-md border-white/5 rounded-[2.5rem] overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-xl border-t-white/10">
                            <div className="h-48 relative overflow-hidden">
                                <img src={course.img} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[9px] font-black text-primary uppercase tracking-widest border border-white/10">
                                        {course.tag}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-black text-white uppercase italic mb-3 group-hover:text-primary transition-colors tracking-tighter">
                                    {course.title}
                                </h3>
                                <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-6">
                                    {course.desc}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, x) => <FaStar key={x} className="text-[10px] text-primary" />)}
                                    </div>
                                    <span className="text-[10px] font-black text-white/20 group-hover:text-primary/40 transition-colors uppercase italic">Module_0{i+1}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="h-20" />
        </div>
    );
};

export default UserHomepage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    FaPlus,
    FaSearch,
    FaBook,
    FaPlay,
    FaTrash,
    FaEdit,
    FaPlayCircle,
    FaFileAlt,
    FaGraduationCap,
    FaFilePdf
} from "react-icons/fa";
import { getTeacherCourses, addCourse, deleteCourse } from "@/data/fakeAuth";

const CorsePadge = () => {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [formData, setFormData] = useState({ name: "", code: "", image: "" });

    const navigate = useNavigate();

    useEffect(() => {
        setCourses(getTeacherCourses());
    }, []);

    const handlePublish = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.code) return;

        const fallbackImages = [
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
        ];

        const finalImage = formData.image.trim() !== ""
            ? formData.image
            : `${fallbackImages[Math.floor(Math.random() * fallbackImages.length)]}?q=80&w=800`;

        const result = addCourse({
            name: formData.name,
            code: formData.code,
            image: finalImage,
            type: "Video Course",
            lessons: Math.floor(Math.random() * 20) + 5,
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        });

        if (result.success) {
            setCourses(getTeacherCourses());
            setFormData({ name: "", code: "" });
        }
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this course?")) {
            deleteCourse(id);
            setCourses(getTeacherCourses());
        }
    };

    const filteredCourses = courses
        .filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.code.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => (a[sortBy] || "").localeCompare(b[sortBy] || ""));

    return (
        <div className="min-h-screen bg-background p-6 md:p-12 pt-28">
            <div className="max-w-7xl mx-auto space-y-12">

                <header className="flex items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary text-4xl shadow-inner border border-primary/20">
                        <FaGraduationCap />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter">Instructor <span className="text-primary">Hub</span></h1>
                        <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-[0.5em] mt-1">Academic Content Management</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <aside className="lg:col-span-1">
                        <Card className="p-8 bg-card/20 backdrop-blur-3xl border-white/5 rounded-[3rem] shadow-2xl sticky top-28 border-t-white/10">
                            <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                                <span className="p-2 bg-primary/20 rounded-lg"><FaPlus className="text-primary text-[10px]" /></span>
                                New Course
                            </h2>
                            <form className="space-y-5" onSubmit={handlePublish}>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-2">Title</label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="Course Name"
                                        className="h-14 rounded-2xl bg-black/40 border-white/5 focus:border-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-2">Code</label>
                                    <Input
                                        value={formData.code}
                                        onChange={(e) => setFormData({...formData, code: e.target.value})}
                                        placeholder="e.g. CS101"
                                        className="h-14 rounded-2xl bg-black/40 border-white/5 focus:border-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-2">Image URL</label>
                                    <Input
                                        value={formData.image}
                                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                                        placeholder="https://..."
                                        className="h-14 rounded-2xl bg-black/40 border-white/5 focus:border-primary/50"
                                    />
                                </div>
                                <Button type="submit" className="w-full h-14 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                    Publish Course
                                </Button>
                            </form>
                        </Card>
                    </aside>

                    <main className="lg:col-span-3 space-y-8">
                        <div className="flex flex-col md:flex-row gap-4 bg-card/10 p-3 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
                            <div className="relative flex-1 group">
                                <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Search your library..."
                                    className="h-14 pl-16 rounded-[2rem] bg-black/20 border-none font-bold"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="h-14 px-8 rounded-[2rem] bg-black/30 border border-white/5 text-[10px] font-black uppercase text-foreground outline-none cursor-pointer hover:bg-black/50 transition-all"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="code">Sort by Code</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredCourses.length > 0 ? filteredCourses.map(course => (
                                <Card
                                    key={course.id}
                                    onClick={() => navigate("corscom", { state: { courseId: course.id } })}
                                    className="group relative bg-card/30 backdrop-blur-xl border-white/5 rounded-[3rem] overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-xl cursor-pointer"
                                >
                                    <div className="h-52 w-full relative overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.name}
                                            className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800"; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                                        <div className="absolute top-6 left-6">
                                            <span className="px-5 py-2 rounded-xl bg-black/60 backdrop-blur-md text-primary text-[10px] font-black uppercase border border-white/10 tracking-widest">
                                                {course.code}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-5">
                                        <h3 className="text-2xl font-black tracking-tighter uppercase italic group-hover:text-primary transition-colors">{course.name}</h3>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
                                                <FaPlayCircle className="text-primary/70 text-sm" /> {course.lessons} Lessons
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
                                                <FaFileAlt className="text-primary/70 text-sm" /> {course.type}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            <a
                                                href={course.pdfUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex-1"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Button className="w-full h-12 rounded-2xl bg-white/5 hover:bg-white/10 font-black uppercase text-[10px] tracking-widest border border-white/10">
                                                    <FaFilePdf className="mr-2 text-primary" /> View PDF
                                                </Button>
                                            </a>
                                            <Button
                                                onClick={(e) => handleDelete(e, course.id)}
                                                variant="ghost"
                                                className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"
                                            >
                                                <FaTrash />
                                            </Button>
                                        </div>
                                    </div>
                                    <FaBook className="absolute -bottom-6 -right-6 text-primary/5 text-9xl rotate-12 pointer-events-none" />
                                </Card>
                            )) : (
                                <div className="col-span-full py-20 text-center bg-card/5 rounded-[3rem] border border-dashed border-white/10">
                                    <p className="text-muted-foreground font-black uppercase tracking-[0.3em] text-xs">Library is empty</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CorsePadge;
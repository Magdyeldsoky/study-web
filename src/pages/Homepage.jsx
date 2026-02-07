import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { FaBrain, FaHome } from "react-icons/fa";

const Homepage= () => {
    const lineData = [10, 15, 12, 20];
    const barData = [85, 90, 78, 92];
    const subjects = ["Math", "Physics", "Chemistry", "Biology"];
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

    const maxLine = Math.max(...lineData);
    const maxBar = Math.max(...barData);

    return (
        <div className="w-full max-w-5xl mr-auto flex flex-col gap-6 h-full">
            <Breadcrumb className="text-sm text-muted-foreground">
                <BreadcrumbList className="flex items-center gap-1">
                    <BreadcrumbItem>
                        <BreadcrumbLink className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                            <FaHome className="text-base" />
                            <span className="hidden sm:inline">Home</span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-muted-foreground">/</BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="flex items-center gap-1 text-primary font-semibold">
                            <FaBrain className="text-base" />
                            <span className="hidden sm:inline">Smarter Study Starts Here</span>
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <section className="bg-gradient-to-r from-primary/10 to-primary/30 p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 mr-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    Smarter Study Starts Here
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    Stop struggling. Start studying smarter. Get help from top students in your college—real explanations, straight to the point. Pay for what you need, skip the confusion, and pass with confidence.
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 auto-rows-fr">
                <Card className="p-6 rounded-2xl shadow-md flex flex-col flex-1 min-h-[220px] animate-in fade-in slide-in-from-bottom-2">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">Weekly Study Hours</h2>
                    <div className="flex-1 flex items-end gap-2">
                        {lineData.map((val, idx) => (
                            <div
                                key={idx}
                                className="bg-primary rounded-t-md w-full transition-all"
                                style={{ height: `${(val / maxLine) * 100}%` }}
                            ></div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        {weeks.map((w, i) => (
                            <span key={i}>{w}</span>
                        ))}
                    </div>
                </Card>

                <Card className="p-6 rounded-2xl shadow-md flex flex-col flex-1 min-h-[220px] animate-in fade-in slide-in-from-bottom-2">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">Subject Scores</h2>
                    <div className="flex-1 flex items-end gap-2">
                        {barData.map((val, idx) => (
                            <div
                                key={idx}
                                className="bg-destructive rounded-t-md w-full transition-all"
                                style={{ height: `${(val / maxBar) * 100}%` }}
                            ></div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        {subjects.map((s, i) => (
                            <span key={i}>{s}</span>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="flex flex-col gap-6 mt-6 flex-1"></div>
        </div>
    );
};

export default Homepage;

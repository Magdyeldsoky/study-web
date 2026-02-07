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

const Homepage = () => {
    const lineData = [10, 15, 12, 20];
    const barData = [70, 80, 68, 90];
    const subjects = ["Math", "Physics", "Chemistry", "Biology"];
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

    const maxLine = Math.max(...lineData);
    const maxBar = Math.max(...barData);

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 pb-10 animate-in fade-in duration-700">

            {/* Breadcrumb */}
            <Breadcrumb className="text-sm">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="flex items-center gap-2 hover:text-primary transition-colors">
                            <FaHome />
                            <span>Home</span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="flex items-center gap-2 text-primary font-medium">
                            <FaBrain />
                            <span>Dashboard</span>
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 md:p-12 rounded-2xl border border-primary/10 shadow-lg">
                <div className="max-w-3xl relative z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
                        Smarter Study <span className="text-primary">Starts Here</span>
                    </h1>
                    <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                        Stop struggling. Start studying smarter. Get help from top students in your college—real explanations, straight to the point.
                    </p>
                </div>
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            </section>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Line Chart */}
                <Card className="p-8 rounded-2xl border border-border/20 shadow hover:shadow-lg transition-shadow flex flex-col h-[350px] bg-background/50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-foreground">Weekly Study Hours</h2>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">Activity</span>
                    </div>

                    <div className="flex-1 flex items-end gap-3 px-2 h-full">
                        {lineData.map((val, idx) => (
                            <div key={idx} className="group relative flex-1 flex flex-col items-center h-full">
                                <div
                                    className="bg-gradient-to-t from-blue-400 to-blue-600 group-hover:from-blue-500 group-hover:to-blue-700 rounded-t-lg w-full transition-all duration-300 relative"
                                    style={{ height: `${(val / maxLine) * 100}%` }}
                                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    {val}h
                  </span>
                                </div>
                                <span className="mt-4 text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {weeks[idx]}
                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Bar Chart */}
                <Card className="p-8 rounded-2xl border border-border/20 shadow hover:shadow-lg transition-shadow flex flex-col h-[350px] bg-background/50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-foreground">Subject Scores</h2>
                        <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded-full font-medium">Performance</span>
                    </div>

                    <div className="flex-1 flex items-end gap-3 px-2 h-full">
                        {barData.map((val, idx) => (
                            <div key={idx} className="group relative flex-1 flex flex-col items-center h-full">
                                <div
                                    className="bg-gradient-to-t from-red-400 to-red-600 group-hover:from-red-500 group-hover:to-red-700 rounded-t-lg w-full transition-all duration-300 relative"
                                    style={{ height: `${(val / maxBar) * 100}%` }}
                                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    {val}%
                  </span>
                                </div>
                                <span className="mt-4 text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {subjects[idx]}
                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="h-20" />
        </div>
    );
};

export default Homepage;

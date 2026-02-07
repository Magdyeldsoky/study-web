import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { FaBrain, FaHome } from "react-icons/fa";

const UserHomepage = () => {


    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 pb-10 animate-in fade-in duration-700">

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
                            <span>Start help</span>
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

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



            <div className="h-20" />
        </div>
    );
};

export default UserHomepage;

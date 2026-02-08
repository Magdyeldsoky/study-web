import { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaBrain, FaRocket, FaTerminal } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { getCurrentUser, logout } from "@/data/fakeAuth";

export default function DashboardLayout() {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const [logoutOpen, setLogoutOpen] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!currentUser) return null;

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
                <Sidebar
                    collapsible="icon"
                    className="border-r border-white/5 shadow-2xl transition-all duration-300"
                >
                    <SidebarContent className="flex flex-col py-8">
                        <div className="mb-12 flex items-center justify-center px-4 group-data-[collapsible=icon]:hidden transition-all duration-500">
                            <Logo size="32px" />
                        </div>

                        <SidebarMenu className="gap-4 px-3 group-data-[collapsible=icon]:px-2">

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Control Center">
                                    <NavLink
                                        to="teacheruserHomepage"
                                        className={({ isActive }) =>
                                            `flex text-black items-center gap-3 rounded-2xl px-4 py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                                                isActive
                                                    ? "bg-primary text-primary-foreground shadow-[0_0_25px_rgba(var(--primary),0.4)] scale-[1.05]"
                                                    : "text-muted-foreground hover:bg-white/5 hover:text-primary"
                                            } group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0`
                                        }
                                    >
                                        <FaTerminal className="text-lg shrink-0" />
                                        <span className="group-data-[collapsible=icon]:hidden">Control Center</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Content Lab">
                                    <NavLink
                                        to="corse"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 rounded-2xl px-4 py-3.5 text-xs text-black font-black uppercase tracking-widest transition-all duration-300 ${
                                                isActive
                                                    ? "bg-primary text-primary-foreground shadow-[0_0_25px_rgba(var(--primary),0.4)] scale-[1.05]"
                                                    : "text-muted-foreground hover:bg-white/5 hover:text-primary"
                                            } group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0`
                                        }
                                    >
                                        <FaRocket className="text-lg shrink-0" />
                                        <span className="group-data-[collapsible=icon]:hidden">Content Lab</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                        </SidebarMenu>

                        <div className="mt-auto px-3 pb-6 group-data-[collapsible=icon]:px-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="w-full h-auto py-4 px-3 flex items-center gap-3 justify-start rounded-[1.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:bg-transparent"
                                    >
                                        <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-primary to-primary/50 text-white flex items-center justify-center font-black shadow-lg">
                                            {currentUser.username[0].toUpperCase()}
                                        </div>
                                        <div className="flex flex-col items-start leading-tight overflow-hidden group-data-[collapsible=icon]:hidden">
                                            <span className="text-[10px] font-black uppercase text-primary tracking-tighter italic">Instructor</span>
                                            <span className="text-sm font-bold truncate w-full">@{currentUser.username}</span>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent side="right" align="end" className="w-56 ml-4 rounded-[1.5rem] bg-card/80 backdrop-blur-2xl border-white/10 shadow-3xl">
                                    <DropdownMenuItem onClick={() => navigate("profile")} className="cursor-pointer gap-3 p-3 rounded-xl focus:bg-primary/20">
                                        <FaUser className="text-primary" /> Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/5" />
                                    <DropdownMenuItem onClick={() => setLogoutOpen(true)} className="cursor-pointer gap-3 p-3 rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive">
                                        <FaSignOutAlt />  Loge out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SidebarContent>
                </Sidebar>

                <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                    <header className="h-20 flex items-center justify-between border-b border-white/5 px-8 bg-background/20 backdrop-blur-xl relative z-10">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-all p-2 rounded-xl" />
                        </div>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-500">
                            <Logo size="30px" />
                        </div>


                    </header>

                    <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-[radial-gradient(circle_at_20%_20%,rgba(var(--primary),0.03),transparent)]">
                        <div className="container mx-auto p-6 md:p-10 lg:p-12 max-w-[1600px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>

            <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <AlertDialogContent className="bg-card/90 backdrop-blur-2xl border-white/10 rounded-[2.5rem] p-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Terminate Session?</AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground font-medium">
                            Are you sure you want to log out? All unsaved laboratory progress will be stored in cache.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8 gap-4">
                        <AlertDialogCancel className="rounded-2xl border-white/5 hover:bg-white/5 font-bold uppercase text-[10px] tracking-widest h-12">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="rounded-2xl bg-destructive text-white hover:bg-destructive/90 font-bold uppercase text-[10px] tracking-widest h-12 shadow-lg shadow-destructive/20">
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </SidebarProvider>
    );
}
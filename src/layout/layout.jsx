import { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaBrain } from "react-icons/fa";
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
                    className="border-r border-border/50 shadow-sm transition-all duration-300"
                >
                    <SidebarContent className="flex flex-col py-6">
                        <div className="mb-8 flex items-center justify-center px-4 group-data-[collapsible=icon]:hidden transition-all">
                            <Logo size="24px" className="group-data-[collapsible=icon]:hidden" />
                        </div>

                        <SidebarMenu className="gap-2 px-3 group-data-[collapsible=icon]:px-2">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="First step to top">
                                    <NavLink
                                        to="Homepage"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                                isActive
                                                    ? "bg-primary text-primary-foreground shadow-md"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            } group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0`
                                        }
                                    >
                                        <FaBrain className="text-lg text-primary shrink-0" />
                                        <span className="text-primary group-data-[collapsible=icon]:hidden">First step to top</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>

                        <div className="mt-auto px-3 pb-4 group-data-[collapsible=icon]:px-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="w-full h-auto py-2 px-2 flex items-center gap-3 justify-start rounded-xl hover:bg-muted/80 transition-all group-data-[collapsible=icon]:justify-center"
                                    >
                                        <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20">
                                            {currentUser.firstName[0].toUpperCase()}{currentUser.lastName[0].toUpperCase()}
                                        </div>
                                        <div className="flex flex-col items-start leading-tight overflow-hidden group-data-[collapsible=icon]:hidden">
                                            <span className="text-sm font-semibold truncate w-full">{currentUser.username}</span>
                                            <span className="text-xs text-muted-foreground truncate w-full">{currentUser.email}</span>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent side="right" align="end" className="w-56 ml-2 rounded-xl">
                                    <DropdownMenuItem onClick={() => navigate("profile")} className="cursor-pointer gap-2">
                                        <FaUser className="text-muted-foreground" /> Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setLogoutOpen(true)} className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
                                        <FaSignOutAlt /> Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SidebarContent>
                </Sidebar>

                <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                    <header className="h-16 flex items-center justify-between border-b border-border/40 px-6 bg-background/80 backdrop-blur-md relative z-10">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="hover:bg-muted transition-colors" />
                            <div className="h-6 w-[1px] bg-border mx-2 hidden sm:block" />
                        </div>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Logo size="26px" />
                        </div>

                        <div className="flex items-center gap-4"></div>
                    </header>

                    <main className="flex-1 overflow-y-auto overflow-x-hidden">
                        <div className="container mx-auto p-4 md:p-8 lg:p-10 max-w-[1600px] animate-in fade-in duration-500">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>

            <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <AlertDialogContent className="max-w-[400px]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to end your current session?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </SidebarProvider>
    );
}

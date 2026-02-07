import { useState } from "react";
import { FaAppStore, FaUser, FaSignOutAlt } from "react-icons/fa";
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

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!currentUser) {
        navigate("/login");
        return null;
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background text-foreground">
                {/* Sidebar */}
                <Sidebar
                    collapsible="icon"
                    className="border-r border-border/60 rounded-r-3xl flex flex-col transition-all duration-300 w-56 group-data-[collapsible=icon]:w-16"
                >
                    <SidebarContent className="flex flex-col py-5 gap-2">
                        <div className="mb-4 flex justify-center group-data-[collapsible=icon]:hidden transition-all">
                            <Logo size="24px" />
                        </div>

                        <SidebarMenu className="w-full items-center px-2">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <NavLink
                                        to="Homepage"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted/70 ${
                                                isActive ? "bg-muted text-primary shadow-sm" : "text-muted-foreground"
                                            } group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2`
                                        }
                                    >
                                        <FaAppStore className="text-lg shrink-0" />
                                        <span className="group-data-[collapsible=icon]:hidden">First step to top</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>

                        <div className="mt-auto px-2 pb-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="w-full h-13 px-3 flex items-center gap-3 justify-start rounded-2xl hover:bg-muted/70 transition-all duration-200 hover:scale-[1.02] group-data-[collapsible=icon]:justify-center"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center font-semibold shadow-sm group-data-[collapsible=icon]:text-xs group-data-[collapsible=icon]:h-6">
                                            {currentUser.firstName[0].toUpperCase()}
                                            {currentUser.lastName[0].toUpperCase()}
                                        </div>

                                        <div className="flex flex-col items-start leading-tight overflow-hidden group-data-[collapsible=icon]:hidden">
                                            <span className="text-sm font-medium truncate">{currentUser.username}</span>
                                            <span className="text-xs text-muted-foreground truncate">{currentUser.email}</span>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    side="right"
                                    align="end"
                                    className="w-56 p-2 rounded-2xl border border-border/60 bg-popover/95 backdrop-blur shadow-lg animate-in fade-in zoom-in-95 slide-in-from-right-2"
                                >
                                    <DropdownMenuItem
                                        onClick={() => navigate("profile")}
                                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm cursor-pointer hover:bg-muted/70"
                                    >
                                        <FaUser className="text-muted-foreground" />
                                        Profile
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator className="my-1" />

                                    <DropdownMenuItem
                                        onSelect={(e) => {
                                            e.preventDefault();
                                            setLogoutOpen(true);
                                        }}
                                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm cursor-pointer text-destructive hover:bg-destructive/10"
                                    >
                                        <FaSignOutAlt />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SidebarContent>
                </Sidebar>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    <header className="h-14 flex items-center gap-4 border-b border-border/60 px-4 bg-card/80 backdrop-blur">
                        <SidebarTrigger />
                        <Logo size="30px" />
                    </header>
                    <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 overflow-auto">
                        <Outlet/>
                    </main>
                </div>
            </div>

            <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <AlertDialogContent className="rounded-2xl animate-in fade-in zoom-in-95">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm logout</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to log out?</AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleLogout}
                            className="rounded-xl bg-destructive text-destructive-foreground hover:opacity-90"
                        >
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </SidebarProvider>
    );
}

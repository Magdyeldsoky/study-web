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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { getCurrentUser, logout } from "@/data/fakeAuth";

export default function DashboardLayout() {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();

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

                {/* ================= Sidebar ================= */}
                <Sidebar
                    collapsible="icon"
                    className="border-r border-border flex flex-col"
                >
                    <SidebarContent className="flex flex-col py-6">

                        {/* Logo */}
                        <div className="mb-8 flex justify-center group-data-[collapsible=icon]:hidden">
                            <Logo size="26px" />
                        </div>

                        {/* Menu */}
                        <SidebarMenu className="w-full px-2">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <NavLink
                                        to="myapp"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
                       hover:bg-muted ${
                                                isActive ? "bg-muted text-primary" : ""
                                            }
                       group-data-[collapsible=icon]:justify-center
                       group-data-[collapsible=icon]:px-2`
                                        }
                                    >
                                        <FaAppStore className="text-lg" />
                                        <span className="group-data-[collapsible=icon]:hidden">
                      My App
                    </span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>

                        {/* ================= User Menu ================= */}
                        <div className="mt-auto px-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="
                      w-full h-14
                      flex items-center gap-3 justify-start
                      rounded-xl
                      hover:bg-muted/70
                      transition-colors
                      group-data-[collapsible=icon]:justify-center
                    "
                                    >
                                        <div className="
                      w-9 h-9
                      rounded-full
                      bg-primary/90
                      text-primary-foreground
                      flex items-center justify-center
                      font-semibold
                    ">
                                            {currentUser.firstName[0].toUpperCase()}
                                            {currentUser.lastName[0].toUpperCase()}
                                        </div>

                                        <div className="flex flex-col items-start leading-tight overflow-hidden group-data-[collapsible=icon]:hidden">
                      <span className="text-sm font-medium truncate">
                        {currentUser.username}
                      </span>
                                            <span className="text-xs text-muted-foreground truncate">
                        {currentUser.email}
                      </span>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    side="right"
                                    align="end"
                                    className="
                    w-56 p-2
                    rounded-xl
                    border border-border
                    bg-popover
                    shadow-md
                  "
                                >
                                    <DropdownMenuItem
                                        onClick={() => navigate("profile")}
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                                    >
                                        <FaUser className="text-muted-foreground" />
                                        Profile
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer
                                   text-destructive hover:bg-destructive/10 focus:text-destructive"
                                            >
                                                <FaSignOutAlt />
                                                Logout
                                            </DropdownMenuItem>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent className="rounded-xl">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Confirm logout
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to log out?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={handleLogout}
                                                    className="bg-destructive text-destructive-foreground hover:opacity-90"
                                                >
                                                    Logout
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SidebarContent>
                </Sidebar>

                {/* ================= Main ================= */}
                <div className="flex-1 flex flex-col">
                    <header className="h-14 flex items-center gap-4 border-b border-border px-4 bg-card">
                        <SidebarTrigger />
                        <Logo size="30px" />
                    </header>

                    <main className="flex-1 p-6 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}

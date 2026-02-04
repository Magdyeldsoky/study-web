import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "@/components/logo";
import { logout, getCurrentUser } from "@/data/fakeAuth";

import { FaUser, FaAppStore } from "react-icons/fa";

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
      <div className="flex min-h-screen w-full bg-background text-foreground transition-colors">
        <Sidebar className="bg-card border-r border-border flex flex-col justify-between">
          <SidebarContent className="flex flex-col items-center py-6">
            <div className="mb-8 flex justify-center w-full">
              <Logo size="25px" />
            </div>

            <SidebarMenu className="w-full space-y-4 flex flex-col items-center">
              <SidebarMenuItem className="w-full flex justify-center">
                <SidebarMenuButton className="w-full flex items-center justify-center space-x-2">
                  <FaUser className="text-xl" />
                  <NavLink
                    to="profile"
                    className={({ isActive }) =>
                      `block text-lg font-medium text-foreground hover:text-primary transition-colors ${
                        isActive ? "text-primary font-semibold" : ""
                      }`
                    }
                  >
                    Profile
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="w-full flex justify-center">
                <SidebarMenuButton className="w-full flex items-center justify-center space-x-2">
                  <FaAppStore className="text-xl" />
                  <NavLink
                    to="myapp"
                    className={({ isActive }) =>
                      `block text-lg font-medium text-foreground hover:text-primary transition-colors ${
                        isActive ? "text-primary font-semibold" : ""
                      }`
                    }
                  >
                    My App
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="mt-auto flex gap-2 items-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold">
                <div className="text-[15px]">
                  {currentUser.firstName[0].toUpperCase() +
                    currentUser.lastName[0].toUpperCase()}
                </div>
              </div>
              <span className="text-sm text-foreground">
                {currentUser.username}
              </span>
            </div>

            <div className="mt-4 w-full flex justify-center">
              <button
                onClick={handleLogout}
                className="w-3/4 bg-destructive text-destructive-foreground p-3 rounded-md hover:opacity-90 transition"
              >
                Logout
              </button>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card">
            <SidebarTrigger className="text-foreground" />
            <div className="ml-4">
              <Logo size="32px" />
            </div>
          </header>

          <main className="p-6 flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

import React from "react";
import {
  Bell,
  Search,
  User,
  Home,
  PhoneCall,
  FileText,
  BarChart2,
  Boxes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export interface NavbarProps {
  notificationCount?: number;
  userInitials?: string;
  userEmail?: string;
  userName?: string;
  onLogout?: () => void;
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "Call Queue",
    path: "/call-queue",
    icon: <PhoneCall className="h-5 w-5" />,
  },
  {
    name: "Scripts",
    path: "/scripts",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <BarChart2 className="h-5 w-5" />,
  },
  {
    name: "Integrations",
    path: "/integrations",
    icon: <Boxes className="h-5 w-5" />,
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  notificationCount = 0,
  userInitials = "US",
  userEmail = "user@example.com",
  userName = "User",
  onLogout = () => console.log("Logout clicked"),
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="border-b bg-[#2B3990] text-white">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white p-1">
            <img
              src="/logo-placeholder.svg"
              alt="Caantin AI"
              className="h-full w-full"
            />
          </div>
          <h2 className="text-lg font-bold">Caantin AI</h2>
        </div>

        <div className="mx-8 flex flex-1 items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-2 px-2 py-1 font-medium transition-colors hover:text-blue-200",
                currentPath.startsWith(item.path)
                  ? "text-white"
                  : "text-blue-200/80"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] rounded-full bg-blue-800/40 border-none pl-8 text-white placeholder:text-gray-400 md:w-[240px]"
            />
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-200/80 hover:text-white hover:bg-blue-800/40"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full bg-blue-800/40 hover:bg-blue-700/40"
              >
                <Avatar className="h-8 w-8 border border-blue-200/20">
                  <AvatarImage src="/avatar-placeholder.png" alt={userName} />
                  <AvatarFallback className="bg-blue-700 text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

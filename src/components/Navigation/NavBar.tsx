import React, { useState } from "react";
import {
  Bell,
  Search,
  User,
  Home,
  PhoneCall,
  FileText,
  BarChart2,
  Boxes,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b bg-[#2B3990] text-white">
      <div className="flex h-12 sm:h-14 md:h-16 items-center px-2 md:px-6">
        <div className="flex items-center gap-1 md:gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white h-7 w-7 px-0"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[240px] bg-[#2B3990] text-white p-0"
            >
              <SheetHeader className="p-4 border-b border-blue-800">
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 hover:bg-blue-800/40",
                      currentPath.startsWith(item.path)
                        ? "bg-blue-800/60"
                        : "text-blue-200/80"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-white p-1 shrink-0">
            <img
              src="/logo-placeholder.svg"
              alt="Caantin AI"
              className="h-full w-full"
            />
          </div>
          <h2 className="text-sm sm:text-base md:text-lg font-bold truncate max-w-[100px] sm:max-w-[140px] md:max-w-none">
            Caantin AI
          </h2>
        </div>

        <div className="hidden sm:flex mx-2 md:mx-4 lg:mx-8 flex-1 items-center space-x-2 md:space-x-4 lg:space-x-6 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-1 md:gap-2 px-1 md:px-2 py-1 font-medium transition-colors hover:text-blue-200 whitespace-nowrap text-sm md:text-base",
                currentPath.startsWith(item.path)
                  ? "text-white"
                  : "text-blue-200/80"
              )}
            >
              {item.icon}
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1 md:gap-2 lg:gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[160px] xl:w-[200px] rounded-full bg-blue-800/40 border-none pl-8 text-white placeholder:text-gray-400 text-sm"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-blue-200/80 hover:text-white hover:bg-blue-800/40 h-7 w-7 sm:h-8 sm:w-8"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-3 w-3 sm:h-4 sm:w-4 rounded-full p-0 flex items-center justify-center text-[8px] sm:text-[10px]"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-800/40 hover:bg-blue-700/40 p-0"
              >
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-blue-200/20">
                  <AvatarImage src="/avatar-placeholder.png" alt={userName} />
                  <AvatarFallback className="bg-blue-700 text-white text-[10px] sm:text-xs">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 sm:w-56"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-xs sm:text-sm font-medium leading-none">
                    {userName}
                  </p>
                  <p className="text-[10px] sm:text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs sm:text-sm">
                <User className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-xs sm:text-sm"
                onClick={onLogout}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

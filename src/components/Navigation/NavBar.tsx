import React, { useState, useRef, useEffect } from "react";
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
  LogOut,
  Settings,
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
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle search expansion
  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchExpanded]);

  // Handle clicking outside search bar to collapse it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchExpanded &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchExpanded]);

  return (
    <div className="border-b bg-[#2B3990] text-white sticky top-0 z-50 shadow-md">
      <div className="flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white h-8 w-8 hover:bg-blue-800/50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[260px] bg-[#2B3990] text-white p-0"
            >
              <SheetHeader className="p-4 border-b border-blue-700">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white p-1 shrink-0">
                    <img
                      src="/logo-placeholder.svg"
                      alt="Caantin AI"
                      className="h-full w-full"
                    />
                  </div>
                  <SheetTitle className="text-white">Caantin AI</SheetTitle>
                </div>
              </SheetHeader>
              <div className="flex flex-col py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 hover:bg-blue-700/50 transition-colors",
                      currentPath.startsWith(item.path)
                        ? "bg-[#4A60CA] text-white border-l-4 border-[#8BAFF3]"
                        : "text-blue-100/90"
                    )}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <div className="h-8 w-8 rounded-full bg-white p-1 shrink-0">
            <img
              src="/logo-placeholder.svg"
              alt="Caantin AI"
              className="h-full w-full"
            />
          </div>
          <h2 className="text-lg font-bold tracking-tight">Caantin AI</h2>
        </div>

        <div className="hidden sm:flex mx-6 lg:mx-8 flex-1 items-center space-x-1 lg:space-x-2 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors hover:bg-blue-700/50 whitespace-nowrap text-sm",
                currentPath.startsWith(item.path)
                  ? "bg-[#4A60CA] text-white border-b-2 border-[#8BAFF3]"
                  : "text-blue-100/90"
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:gap-4">
          <div className="relative">
            {searchExpanded ? (
              <div className="flex items-center relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] lg:w-[250px] rounded-full bg-blue-800/40 border-none pl-8 text-white placeholder:text-gray-400 text-sm"
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-100/90 hover:text-white hover:bg-blue-700/50 h-8 w-8 rounded-full"
                onClick={() => setSearchExpanded(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-blue-100/90 hover:text-white hover:bg-blue-700/50 h-8 w-8 rounded-full relative"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] font-bold"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full bg-blue-700/40 hover:bg-blue-600/50 p-0"
              >
                <Avatar className="h-8 w-8 border border-blue-200/30">
                  <AvatarImage src="/avatar-placeholder.png" alt={userName} />
                  <AvatarFallback className="bg-blue-700 text-white text-xs">
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
              <DropdownMenuItem className="text-sm cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-sm cursor-pointer"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

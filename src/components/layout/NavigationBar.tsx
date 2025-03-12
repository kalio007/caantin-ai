import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  LayoutDashboard,
  Phone,
  ScrollText,
  BarChart,
  Grid,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NavigationBarProps {
  username: string;
  notificationCount?: number;
}

export const NavigationBar = ({
  username,
  notificationCount = 0,
}: NavigationBarProps) => {
  return (
    <nav className="bg-[#2A3990] text-white p-2 md:p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8 md:space-x-6 ">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-1">
              <img src="/logo.svg" alt="AI" className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <span className="text-lg md:text-xl font-semibold">Caantin AI</span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:flex ">
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  className="text-white hover:text-white/90 hover:bg-blue-600"
                  asChild
                >
                  <Link to="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  className="text-white hover:text-white/90 hover:bg-blue-600"
                  asChild
                >
                  <Link to="/call-queue">
                    <Phone className="h-4 w-4" />
                    Call Queue
                  </Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  className="text-white hover:text-white/90 hover:bg-blue-600"
                  asChild
                >
                  <Link to="/scripts">
                    <ScrollText className="h-4 w-4" />
                    Scripts
                  </Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  className="text-white hover:text-white/90"
                  asChild
                >
                  <Link to="/analytics">
                    <BarChart className=" h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  className="text-white hover:text-white/90"
                  asChild
                >
                  <Link to="/integrations">
                    <Grid className=" h-4 w-4" />
                    Integrations
                  </Link>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 bg-red-500">
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Avatar */}
          <Avatar>
            <AvatarImage src={`https://avatar.vercel.sh/${username}`} />
            <AvatarFallback>
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block">{username}</span>
        </div>
      </div>
    </nav>
  );
};

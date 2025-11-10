"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { User, LogOut, LayoutDashboard, Shield, ChevronDown } from "lucide-react";
import Link from "next/link";

export function UserDropdown() {
  const [user, setUser] = useState<any>(null);
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUser(user);

        // Get member data
        const { data: memberData } = await supabase
          .from("members")
          .select("*")
          .eq("id", user.id)
          .single();

        if (memberData) {
          setMember(memberData);
        }
      }
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        checkUser();
      } else {
        setUser(null);
        setMember(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const getDashboardLink = () => {
    if (member?.role === "pastor" || member?.role === "admin") {
      return "/admin/dashboard";
    }
    return "/member/dashboard";
  };

  const getDisplayName = () => {
    if (member?.full_name) return member.full_name;
    if (user?.email) {
      const emailName = user.email.split("@")[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return "User";
  };

  // Show skeleton while loading to maintain layout
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="hidden sm:block h-4 w-20" />
      </div>
    );
  }

  // Not logged in - show login button
  if (!user) {
    return (
      <Button asChild variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
        <Link href="/auth/login">
          <User className="h-4 w-4 mr-2" />
          Login
        </Link>
      </Button>
    );
  }

  // Logged in - show dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-full">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="hidden sm:inline font-medium">{getDisplayName()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            {(member?.role === "pastor" || member?.role === "admin") && (
              <div className="flex items-center gap-1 mt-2">
                <Shield className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-semibold text-blue-600">
                  {member.role.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={getDashboardLink()} className="cursor-pointer flex items-center">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

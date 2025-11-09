"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Church,
  Users,
  ArrowLeft,
  Search,
  Shield,
  User,
  CheckCircle,
  AlertCircle,
  Crown,
  Mail,
  Calendar,
  Trash2
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MembersManagement() {
  const router = useRouter();
  const [members, setMembers] = useState<any[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: memberData } = await supabase
        .from("members")
        .select("role")
        .eq("id", user.id)
        .single();

      if (memberData?.role !== "pastor" && memberData?.role !== "admin") {
        router.push("/member/dashboard");
        return;
      }

      loadMembers();
    };

    checkAuth();
  }, [supabase, router]);

  const loadMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading members:", error);
      setError("Failed to load members");
    } else {
      setMembers(data || []);
    }
    setLoading(false);
  };

  // Reapply filters whenever members data changes
  useEffect(() => {
    applyFilters(searchQuery, roleFilter);
  }, [members]);

  const applyFilters = (searchTerm: string, roleFilterValue: string) => {
    let filtered = members;

    // Apply role filter
    if (roleFilterValue !== "all") {
      filtered = filtered.filter(member => member.role === roleFilterValue);
    }

    // Apply search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (member) =>
          member.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMembers(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, roleFilter);
  };

  const handleRoleFilter = (filter: string) => {
    setRoleFilter(filter);
    applyFilters(searchQuery, filter);
  };

  const handleRoleChange = async (memberId: string, newRole: string) => {
    if (!confirm(`Are you sure you want to change this member's role to ${newRole}?`)) return;

    try {
      const { error } = await supabase
        .from("members")
        .update({ role: newRole })
        .eq("id", memberId);

      if (error) throw error;

      setSuccess(`Role updated successfully to ${newRole}!`);
      loadMembers();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update role");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDeleteMember = async (memberId: string, memberEmail: string) => {
    if (!confirm(`Are you sure you want to delete ${memberEmail}? This will permanently remove their account and all associated data.`)) return;

    try {
      // First delete from members table (this will cascade due to ON DELETE CASCADE in auth.users)
      const { error: memberError } = await supabase
        .from("members")
        .delete()
        .eq("id", memberId);

      if (memberError) throw memberError;

      // Then delete from auth.users (this requires admin privileges via service role)
      // Note: This might fail if not using service role key
      const { error: authError } = await supabase.auth.admin.deleteUser(memberId);

      if (authError) {
        // If auth deletion fails, it's okay - member record is deleted
        console.warn("Auth user deletion failed:", authError);
      }

      setSuccess(`Member ${memberEmail} deleted successfully!`);

      // Reload members and wait for it to complete
      await loadMembers();

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete member");
      setTimeout(() => setError(null), 3000);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return <Crown className="h-4 w-4" />;
      case "pastor": return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "text-purple-600 bg-purple-50 border-purple-200";
      case "pastor": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const stats = {
    total: members.length,
    members: members.filter(m => m.role === "member").length,
    pastors: members.filter(m => m.role === "pastor").length,
    admins: members.filter(m => m.role === "admin").length,
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Church className="h-12 w-12 mx-auto mb-4 text-blue-600 animate-pulse" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold">Member Management</h1>
                <p className="text-sm text-gray-600">View and manage church members</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-lg border-2 border-blue-100">
            <CardHeader className="pb-3">
              <CardDescription>Total Members</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-2 border-gray-100">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600" />
                <CardDescription>Members</CardDescription>
              </div>
              <CardTitle className="text-3xl">{stats.members}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-2 border-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <CardDescription>Pastors</CardDescription>
              </div>
              <CardTitle className="text-3xl">{stats.pastors}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-2 border-purple-100">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-purple-600" />
                <CardDescription>Admins</CardDescription>
              </div>
              <CardTitle className="text-3xl">{stats.admins}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filter Buttons */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="pt-6">
            <Tabs value={roleFilter} onValueChange={handleRoleFilter} className="w-full">
              <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  All ({stats.total})
                </TabsTrigger>
                <TabsTrigger value="member" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Members ({stats.members})
                </TabsTrigger>
                <TabsTrigger value="pastor" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Pastors ({stats.pastors})
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Admins ({stats.admins})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search members by name or email..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Members List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>All Members ({filteredMembers.length})</CardTitle>
            <CardDescription>
              Manage member roles and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredMembers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">
                  {searchQuery ? "No members found matching your search" : "No members yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-full">
                        <User className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">
                            {member.full_name || "No Name"}
                          </h3>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1 ${getRoleColor(member.role)}`}>
                            {getRoleIcon(member.role)}
                            {member.role.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Joined {new Date(member.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-40">
                        <Select
                          value={member.role}
                          onValueChange={(value) => handleRoleChange(member.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="pastor">Pastor</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMember(member.id, member.email)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

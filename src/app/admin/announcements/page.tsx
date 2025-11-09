"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Church,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Megaphone,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AnnouncementsManagement() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "normal",
    category: "general",
    is_published: true,
    send_notification: false,
  });
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

      loadAnnouncements();
    };

    checkAuth();
  }, [supabase, router]);

  const loadAnnouncements = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("announcements")
      .select(`
        *,
        author:members(full_name, email)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading announcements:", error);
    } else {
      setAnnouncements(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const shouldSendNotification = formData.send_notification && formData.is_published;
      let announcementId = editingId;

      if (editingId) {
        // Update existing announcement
        const { error } = await supabase
          .from("announcements")
          .update({
            title: formData.title,
            content: formData.content,
            priority: formData.priority,
            category: formData.category,
            is_published: formData.is_published,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId);

        if (error) throw error;
        setSuccess("Announcement updated successfully!");
      } else {
        // Create new announcement
        const { data: newAnnouncement, error } = await supabase
          .from("announcements")
          .insert({
            title: formData.title,
            content: formData.content,
            priority: formData.priority,
            category: formData.category,
            is_published: formData.is_published,
            author_id: user?.id,
          })
          .select()
          .single();

        if (error) throw error;
        announcementId = newAnnouncement.id;
        setSuccess("Announcement created successfully!");
      }

      // Send push notification if checkbox was checked
      if (shouldSendNotification && announcementId) {
        try {
          const notifResponse = await fetch('/api/push/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              announcementId,
              title: formData.title,
              body: formData.content.substring(0, 100) + (formData.content.length > 100 ? '...' : ''),
              priority: formData.priority,
            }),
          });

          if (notifResponse.ok) {
            const result = await notifResponse.json();
            setSuccess(`Announcement saved! Notifications sent to ${result.sent} members.`);
          }
        } catch (notifError) {
          console.error('Error sending notifications:', notifError);
          setSuccess('Announcement saved, but failed to send notifications.');
        }
      }

      // Reset form
      setFormData({
        title: "",
        content: "",
        priority: "normal",
        category: "general",
        is_published: true,
        send_notification: false,
      });
      setEditingId(null);
      setShowForm(false);
      loadAnnouncements();
    } catch (err: any) {
      setError(err.message || "Failed to save announcement");
    }
  };

  const handleEdit = (announcement: any) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
      category: announcement.category,
      is_published: announcement.is_published,
      send_notification: false,
    });
    setEditingId(announcement.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setSuccess("Announcement deleted successfully!");
      loadAnnouncements();
    } catch (err: any) {
      setError(err.message || "Failed to delete announcement");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-600 bg-red-50 border-red-200";
      case "high": return "text-orange-600 bg-orange-50 border-orange-200";
      case "normal": return "text-blue-600 bg-blue-50 border-blue-200";
      case "low": return "text-gray-600 bg-gray-50 border-gray-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
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
              <Megaphone className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold">Announcements</h1>
                <p className="text-sm text-gray-600">Manage church announcements</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                title: "",
                content: "",
                priority: "normal",
                category: "general",
                is_published: true,
                send_notification: false,
              });
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Announcement
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
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

        {/* Create/Edit Form */}
        {showForm && (
          <Card className="mb-8 shadow-lg border-2 border-purple-100">
            <CardHeader>
              <CardTitle>
                {editingId ? "Edit Announcement" : "Create New Announcement"}
              </CardTitle>
              <CardDescription>
                Share important updates with your congregation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Special Service This Sunday"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your announcement details here..."
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="prayer">Prayer</SelectItem>
                        <SelectItem value="update">Update</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="published">Status</Label>
                    <Select
                      value={formData.is_published ? "published" : "draft"}
                      onValueChange={(value) => setFormData({ ...formData, is_published: value === "published" })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Push Notification Toggle */}
                <div className="flex items-center space-x-2 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="send_notification"
                    checked={formData.send_notification}
                    onChange={(e) => setFormData({ ...formData, send_notification: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="send_notification" className="flex items-center gap-2 cursor-pointer">
                    <span className="text-sm font-medium">📱 Send Push Notification</span>
                    <span className="text-xs text-gray-600">(Members will receive instant notification)</span>
                  </Label>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {editingId ? "Update Announcement" : "Create Announcement"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setFormData({
                        title: "",
                        content: "",
                        priority: "normal",
                        category: "general",
                        is_published: true,
                        send_notification: false,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Announcements List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">All Announcements ({announcements.length})</h2>

          {announcements.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="py-12 text-center">
                <Megaphone className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">No announcements yet</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Announcement
                </Button>
              </CardContent>
            </Card>
          ) : (
            announcements.map((announcement) => (
              <Card key={announcement.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority.toUpperCase()}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                          {announcement.category.toUpperCase()}
                        </span>
                        {!announcement.is_published && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 border border-yellow-200">
                            DRAFT
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                      <CardDescription className="mt-1">
                        By {announcement.author?.full_name || "Unknown"} • {new Date(announcement.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(announcement)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(announcement.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

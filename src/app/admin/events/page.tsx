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
  Calendar as CalendarIcon,
  AlertCircle,
  CheckCircle,
  MapPin,
  Clock,
  Repeat
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EventsManagement() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    event_date: "",
    event_time: "",
    is_recurring: false,
    recurrence_pattern: "",
    category: "service",
    is_published: true,
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

      loadEvents();
    };

    checkAuth();
  }, [supabase, router]);

  const loadEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select(`
        *,
        creator:members(full_name, email)
      `)
      .order("event_date", { ascending: true });

    if (error) {
      console.error("Error loading events:", error);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Prepare event data
      const eventData: any = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        event_date: formData.event_date,
        event_time: formData.event_time,
        is_recurring: formData.is_recurring,
        category: formData.category,
        is_published: formData.is_published,
      };

      // Only add recurrence pattern if it's a recurring event
      if (formData.is_recurring && formData.recurrence_pattern) {
        eventData.recurrence_pattern = formData.recurrence_pattern;
      }

      if (editingId) {
        // Update existing event
        const { error } = await supabase
          .from("events")
          .update({
            ...eventData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId);

        if (error) throw error;
        setSuccess("Event updated successfully!");
      } else {
        // Create new event
        const { error } = await supabase
          .from("events")
          .insert({
            ...eventData,
            created_by: user?.id,
          });

        if (error) throw error;
        setSuccess("Event created successfully!");
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        event_date: "",
        event_time: "",
        is_recurring: false,
        recurrence_pattern: "",
        category: "service",
        is_published: true,
      });
      setEditingId(null);
      setShowForm(false);
      loadEvents();
    } catch (err: any) {
      setError(err.message || "Failed to save event");
    }
  };

  const handleEdit = (event: any) => {
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      event_date: event.event_date?.split('T')[0] || "",
      event_time: event.event_time || "",
      is_recurring: event.is_recurring,
      recurrence_pattern: event.recurrence_pattern || "",
      category: event.category,
      is_published: event.is_published,
    });
    setEditingId(event.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setSuccess("Event deleted successfully!");
      loadEvents();
    } catch (err: any) {
      setError(err.message || "Failed to delete event");
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "service": return "text-blue-600 bg-blue-50 border-blue-200";
      case "prayer": return "text-purple-600 bg-purple-50 border-purple-200";
      case "bible-study": return "text-green-600 bg-green-50 border-green-200";
      case "fellowship": return "text-orange-600 bg-orange-50 border-orange-200";
      case "special-event": return "text-rose-600 bg-rose-50 border-rose-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "service": return "⛪";
      case "prayer": return "🙏";
      case "bible-study": return "📖";
      case "fellowship": return "🤝";
      case "special-event": return "🎉";
      default: return "📅";
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
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold">Events Management</h1>
                <p className="text-sm text-gray-600">Manage church events</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                title: "",
                description: "",
                location: "",
                event_date: "",
                event_time: "",
                is_recurring: false,
                recurrence_pattern: "",
                category: "service",
                is_published: true,
              });
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Event
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
          <Card className="mb-8 shadow-lg border-2 border-blue-100">
            <CardHeader>
              <CardTitle>
                {editingId ? "Edit Event" : "Create New Event"}
              </CardTitle>
              <CardDescription>
                Add events to your church calendar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Special Worship Night"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the event details..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Sunnyvale High School"
                      required
                    />
                  </div>

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
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="prayer">Prayer</SelectItem>
                        <SelectItem value="bible-study">Bible Study</SelectItem>
                        <SelectItem value="fellowship">Fellowship</SelectItem>
                        <SelectItem value="special-event">Special Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event_date">Event Date *</Label>
                    <Input
                      id="event_date"
                      type="date"
                      value={formData.event_date}
                      onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event_time">Time</Label>
                    <Input
                      id="event_time"
                      value={formData.event_time}
                      onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                      placeholder="e.g., 10:30 AM - 12:00 PM"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_recurring"
                      checked={formData.is_recurring}
                      onChange={(e) => setFormData({ ...formData, is_recurring: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <Label htmlFor="is_recurring" className="cursor-pointer">
                      This is a recurring event
                    </Label>
                  </div>
                  {formData.is_recurring && (
                    <Select
                      value={formData.recurrence_pattern}
                      onValueChange={(value) => setFormData({ ...formData, recurrence_pattern: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select recurrence pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly-sunday">Every Sunday</SelectItem>
                        <SelectItem value="weekly-monday">Every Monday</SelectItem>
                        <SelectItem value="weekly-tuesday">Every Tuesday</SelectItem>
                        <SelectItem value="weekly-wednesday">Every Wednesday</SelectItem>
                        <SelectItem value="weekly-thursday">Every Thursday</SelectItem>
                        <SelectItem value="weekly-friday">Every Friday</SelectItem>
                        <SelectItem value="weekly-saturday">Every Saturday</SelectItem>
                        <SelectItem value="monthly-first-friday">First Friday of Month</SelectItem>
                        <SelectItem value="monthly-first-saturday">First Saturday of Month</SelectItem>
                        <SelectItem value="monthly-first-sunday">First Sunday of Month</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
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

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {editingId ? "Update Event" : "Create Event"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setFormData({
                        title: "",
                        description: "",
                        location: "",
                        event_date: "",
                        event_time: "",
                        is_recurring: false,
                        recurrence_pattern: "",
                        category: "service",
                        is_published: true,
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

        {/* Events List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">All Events ({events.length})</h2>

          {events.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="py-12 text-center">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">No events yet</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Event
                </Button>
              </CardContent>
            </Card>
          ) : (
            events.map((event) => (
              <Card key={event.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{getCategoryIcon(event.category)}</span>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(event.category)}`}>
                          {event.category.toUpperCase().replace('-', ' ')}
                        </span>
                        {event.is_recurring && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 border border-indigo-200 flex items-center gap-1">
                            <Repeat className="h-3 w-3" />
                            RECURRING
                          </span>
                        )}
                        {!event.is_published && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 border border-yellow-200">
                            DRAFT
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="mt-2 flex flex-col gap-1">
                        <span className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          {new Date(event.event_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        {event.event_time && (
                          <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {event.event_time}
                          </span>
                        )}
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(event)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(event.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
                  {event.is_recurring && event.recurrence_pattern && (
                    <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <p className="text-sm text-indigo-700 font-medium flex items-center gap-2">
                        <Repeat className="h-4 w-4" />
                        Repeats: {event.recurrence_pattern.replace('-', ' ').replace('weekly', 'Every').replace('monthly', '')}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, BellOff, CheckCircle, AlertCircle, Megaphone, Calendar, Heart } from "lucide-react";

interface NotificationPreferences {
  announcements: boolean;
  events: boolean;
  prayer_requests: boolean;
}

export function NotificationSettings() {
  const { isSupported, isSubscribed, loading: pushLoading, subscribe, unsubscribe } = usePushNotifications();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    announcements: true,
    events: true,
    prayer_requests: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: memberData, error } = await supabase
        .from("members")
        .select("notification_preferences")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading preferences:", error);
      } else if (memberData?.notification_preferences) {
        setPreferences(memberData.notification_preferences as NotificationPreferences);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSubscription = async () => {
    try {
      setError(null);
      setSuccess(null);

      if (isSubscribed) {
        await unsubscribe();
        setSuccess("Push notifications disabled");
      } else {
        await subscribe();
        setSuccess("Push notifications enabled! You'll receive notifications for new announcements.");
      }

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update notification subscription");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handlePreferenceChange = async (key: keyof NotificationPreferences, value: boolean) => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("members")
        .update({ notification_preferences: newPreferences })
        .eq("id", user.id);

      if (error) throw error;

      setSuccess("Preferences updated successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update preferences");
      setTimeout(() => setError(null), 3000);
      // Revert on error
      loadPreferences();
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Manage how you receive updates from The Serving Church
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Alerts */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Browser Support Warning */}
        {!isSupported && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Push notifications are not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.
            </AlertDescription>
          </Alert>
        )}

        {/* Push Notification Toggle */}
        {isSupported && (
          <div className="border-2 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {isSubscribed ? (
                  <Bell className="h-6 w-6 text-blue-600" />
                ) : (
                  <BellOff className="h-6 w-6 text-gray-400" />
                )}
                <div>
                  <h3 className="font-semibold text-lg">Push Notifications</h3>
                  <p className="text-sm text-gray-600">
                    Receive instant notifications on this device
                  </p>
                </div>
              </div>

              <Button
                onClick={handleToggleSubscription}
                disabled={pushLoading}
                variant={isSubscribed ? "destructive" : "default"}
                className={isSubscribed ? "" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"}
              >
                {pushLoading ? "Loading..." : isSubscribed ? "Disable" : "Enable"}
              </Button>
            </div>

            {isSubscribed && (
              <div className="p-3 bg-green-100 border border-green-300 rounded-md">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  You're subscribed to push notifications on this device
                </p>
              </div>
            )}
          </div>
        )}

        {/* Notification Preferences */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Notification Preferences</h3>
            <p className="text-sm text-gray-600 mb-4">
              Choose which types of announcements you want to receive
            </p>
          </div>

          {/* General Announcements */}
          <div className="flex items-center justify-between p-4 border-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Megaphone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <Label htmlFor="announcements" className="text-base font-medium cursor-pointer">
                  General Announcements
                </Label>
                <p className="text-sm text-gray-500">
                  Church updates, news, and general information
                </p>
              </div>
            </div>
            <Switch
              id="announcements"
              checked={preferences.announcements}
              onCheckedChange={(checked) => handlePreferenceChange("announcements", checked)}
              disabled={saving}
            />
          </div>

          {/* Event Announcements */}
          <div className="flex items-center justify-between p-4 border-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <Label htmlFor="events" className="text-base font-medium cursor-pointer">
                  Event Announcements
                </Label>
                <p className="text-sm text-gray-500">
                  Upcoming events, services, and gatherings
                </p>
              </div>
            </div>
            <Switch
              id="events"
              checked={preferences.events}
              onCheckedChange={(checked) => handlePreferenceChange("events", checked)}
              disabled={saving}
            />
          </div>

          {/* Prayer Requests */}
          <div className="flex items-center justify-between p-4 border-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <Label htmlFor="prayer_requests" className="text-base font-medium cursor-pointer">
                  Prayer Requests
                </Label>
                <p className="text-sm text-gray-500">
                  Community prayer requests and updates
                </p>
              </div>
            </div>
            <Switch
              id="prayer_requests"
              checked={preferences.prayer_requests}
              onCheckedChange={(checked) => handlePreferenceChange("prayer_requests", checked)}
              disabled={saving}
            />
          </div>
        </div>

        {/* Info Note */}
        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> These preferences apply to all notification channels. To enable push notifications on this device, use the toggle above.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

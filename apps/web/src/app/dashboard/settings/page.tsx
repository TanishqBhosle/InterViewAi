"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully");
    }, 1000);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Rahul Sharma" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="rahul@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Mumbai, India" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Career Info</CardTitle>
            <CardDescription>Set your target role and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="targetRole">Target Role</Label>
                <Input id="targetRole" placeholder="e.g. SDE-2, Product Manager" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentCompany">Current Company</Label>
                <Input id="currentCompany" placeholder="Current or last company" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input id="linkedin" placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="gap-2" disabled={saving}>
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

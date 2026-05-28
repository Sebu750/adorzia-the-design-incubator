import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdateEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Current password is required");
      return;
    }
    
    setLoading(true);
    try {
      // Re-authenticate first
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || "",
        password: currentPassword,
      });
      
      if (signInError) throw new Error("Current password is incorrect");

      const { error } = await supabase.auth.updateUser({
        email: email,
      });
      
      if (error) throw error;
      
      toast.success("Email update request sent. Check your new email for confirmation.");
      setEmail("");
      setCurrentPassword("");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-12">
      <div>
        <div className="eyebrow">Account Settings</div>
        <h1 className="mt-3 font-display text-4xl mb-8">Manage your admin account</h1>
      </div>

      {/* Update Email */}
      <div className="border border-hairline p-8">
        <h2 className="font-display text-2xl mb-6">Update Email</h2>
        <form onSubmit={handleUpdateEmail} className="space-y-6">
          <div>
            <label className="eyebrow block mb-2">New Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full border border-hairline p-3 focus:border-gold outline-none" 
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="eyebrow block mb-2">Current Password</label>
            <input 
              type="password" 
              required 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              className="w-full border border-hairline p-3 focus:border-gold outline-none" 
            />
          </div>
          <button 
            disabled={loading} 
            className="border border-ink bg-ink text-cream px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-cream hover:text-ink transition-colors disabled:opacity-50"
          >
            {loading ? "Updating…" : "Update Email"}
          </button>
        </form>
      </div>

      {/* Update Password */}
      <div className="border border-hairline p-8">
        <h2 className="font-display text-2xl mb-6">Update Password</h2>
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div>
            <label className="eyebrow block mb-2">New Password</label>
            <input 
              type="password" 
              required 
              minLength={8}
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className="w-full border border-hairline p-3 focus:border-gold outline-none" 
              placeholder="Minimum 8 characters"
            />
          </div>
          <div>
            <label className="eyebrow block mb-2">Confirm New Password</label>
            <input 
              type="password" 
              required 
              minLength={8}
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="w-full border border-hairline p-3 focus:border-gold outline-none" 
            />
          </div>
          <button 
            disabled={loading} 
            className="border border-ink bg-ink text-cream px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-cream hover:text-ink transition-colors disabled:opacity-50"
          >
            {loading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>

      {/* Security Notice */}
      <div className="bg-gold/5 border border-gold/20 p-6">
        <div className="eyebrow text-gold mb-2">Security Notice</div>
        <p className="text-sm text-ink-soft leading-relaxed">
          • Email changes require verification via the new email address<br/>
          • Password changes take effect immediately<br/>
          • Use a strong password with at least 8 characters<br/>
          • Keep your credentials secure and do not share them
        </p>
      </div>
    </div>
  );
}

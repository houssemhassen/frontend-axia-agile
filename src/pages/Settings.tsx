
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    marketing: false,
  });

  const [appearance, setAppearance] = useState({
    darkMode: false,
    compactView: false,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast.success(`Setting updated`);
  };

  const handleAppearanceChange = (key: keyof typeof appearance) => {
    setAppearance(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast.success(`Setting updated`);
  };

  return (
    <>
      <Helmet>
        <title>Settings | Axia Agile</title>
        <meta name="description" content="Manage your application settings" />
      </Helmet>
      <DashboardLayout>
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how you want to be notified
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange('email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={() => handleNotificationChange('push')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Digest</p>
                      <p className="text-sm text-muted-foreground">
                        Get a weekly summary of your team's activity
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.weekly}
                      onCheckedChange={() => handleNotificationChange('weekly')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and offers
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.marketing}
                      onCheckedChange={() => handleNotificationChange('marketing')}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize how the application looks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark theme
                      </p>
                    </div>
                    <Switch 
                      checked={appearance.darkMode}
                      onCheckedChange={() => handleAppearanceChange('darkMode')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact View</p>
                      <p className="text-sm text-muted-foreground">
                        Show more content with less spacing
                      </p>
                    </div>
                    <Switch 
                      checked={appearance.compactView}
                      onCheckedChange={() => handleAppearanceChange('compactView')}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account details and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" onClick={() => toast.info("Password change requested")}>
                    Change Password
                  </Button>
                  
                  <Button variant="outline" onClick={() => toast.info("Two-factor authentication setup")}>
                    Setup Two-Factor Authentication
                  </Button>
                  
                  <div className="pt-4">
                    <Button variant="destructive" onClick={() => toast.info("Account deletion requested")}>
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Settings;


import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  Users, 
  MessageSquare, 
  FileUp, 
  Bell, 
  Plus,
  Send,
  ArrowDown,
  Clock,
  FileText,
  Image,
  Video,
  File,
  ChevronRight,
  Search,
  Calendar,
  Paperclip,
  Archive,
  ThumbsUp,
  MessageCircle,
  UserPlus
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ChatMessage {
  id: number;
  sender: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  attachments?: {
    type: 'image' | 'document' | 'link';
    name: string;
    url: string;
  }[];
  reactions?: {
    emoji: string;
    count: number;
    userReacted?: boolean;
  }[];
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  lastActive?: Date;
}

interface ChatChannel {
  id: number;
  name: string;
  type: 'channel' | 'direct';
  unreadCount: number;
  lastMessage?: {
    content: string;
    timestamp: Date;
  };
  members?: TeamMember[];
  isPrivate: boolean;
}

interface FileItem {
  id: number;
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'spreadsheet' | 'video' | 'other';
  size: string;
  uploadedBy: {
    name: string;
    avatar: string;
  };
  uploadDate: Date;
  url: string;
  thumbnail?: string;
}

interface NotificationItem {
  id: number;
  type: 'message' | 'mention' | 'file' | 'task' | 'meeting';
  content: string;
  timestamp: Date;
  isRead: boolean;
  sender?: {
    name: string;
    avatar: string;
  };
  link?: string;
}

const TeamCollaboration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<"projectManager" | "scrumMaster" | "productOwner" | "developer">("projectManager");
  const [loading, setLoading] = useState(true);
  const [currentChannel, setCurrentChannel] = useState<ChatChannel | null>(null);
  const [channels, setChannels] = useState<ChatChannel[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showNewChannelDialog, setShowNewChannelDialog] = useState(false);
  const [newChannelData, setNewChannelData] = useState({
    name: "",
    isPrivate: false,
    members: [] as number[]
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChannels, setFilteredChannels] = useState<ChatChannel[]>([]);

  useEffect(() => {
    const stateRole = location.state?.role;
    const storedRole = localStorage.getItem("userRole");
    
    if (stateRole) {
      setRole(stateRole as any);
      localStorage.setItem("userRole", stateRole);
    } else if (storedRole) {
      setRole(storedRole as any);
    }
    
    // Simulate API data loading
    setTimeout(() => {
      const mockTeamMembers: TeamMember[] = [
        { id: 1, name: "Jane Cooper", role: "Project Manager", avatar: "JC", status: "online" },
        { id: 2, name: "Michael Brown", role: "Developer", avatar: "MB", status: "online" },
        { id: 3, name: "Alex Johnson", role: "Designer", avatar: "AJ", status: "away" },
        { id: 4, name: "Sarah Wilson", role: "QA Engineer", avatar: "SW", status: "offline", lastActive: new Date(Date.now() - 3600000) },
        { id: 5, name: "Chris Lee", role: "Developer", avatar: "CL", status: "online" },
        { id: 6, name: "Emily Davis", role: "Product Owner", avatar: "ED", status: "away" },
        { id: 7, name: "James Martin", role: "Scrum Master", avatar: "JM", status: "online" }
      ];
      
      const mockChannels: ChatChannel[] = [
        { 
          id: 1, 
          name: "general", 
          type: "channel", 
          unreadCount: 0, 
          isPrivate: false,
          lastMessage: {
            content: "Let's discuss the upcoming sprint planning",
            timestamp: new Date(Date.now() - 1200000)
          }
        },
        { 
          id: 2, 
          name: "random", 
          type: "channel", 
          unreadCount: 3, 
          isPrivate: false,
          lastMessage: {
            content: "Did anyone see that new design tool?",
            timestamp: new Date(Date.now() - 7200000)
          }
        },
        { 
          id: 3, 
          name: "frontend-team", 
          type: "channel", 
          unreadCount: 0, 
          isPrivate: false,
          lastMessage: {
            content: "I've pushed the latest UI changes",
            timestamp: new Date(Date.now() - 86400000)
          }
        },
        { 
          id: 4, 
          name: "backend-team", 
          type: "channel", 
          unreadCount: 0, 
          isPrivate: false,
          lastMessage: {
            content: "API endpoints are ready for testing",
            timestamp: new Date(Date.now() - 172800000)
          }
        },
        { 
          id: 5, 
          name: "Michael Brown", 
          type: "direct", 
          unreadCount: 2, 
          isPrivate: true,
          members: [teamMembers[1]],
          lastMessage: {
            content: "Can you review my PR when you get a chance?",
            timestamp: new Date(Date.now() - 3600000)
          }
        },
        { 
          id: 6, 
          name: "Alex Johnson", 
          type: "direct", 
          unreadCount: 0, 
          isPrivate: true,
          members: [teamMembers[2]],
          lastMessage: {
            content: "I've sent you the design files",
            timestamp: new Date(Date.now() - 259200000)
          }
        }
      ];
      
      const mockMessages: ChatMessage[] = [
        {
          id: 1,
          sender: { name: "Jane Cooper", avatar: "JC" },
          content: "Good morning everyone! Let's discuss the upcoming sprint planning meeting.",
          timestamp: new Date(Date.now() - 3600000),
          reactions: [
            { emoji: "👍", count: 3, userReacted: true },
            { emoji: "🚀", count: 2, userReacted: false }
          ]
        },
        {
          id: 2,
          sender: { name: "Michael Brown", avatar: "MB" },
          content: "I've completed the user authentication feature. Ready for code review.",
          timestamp: new Date(Date.now() - 3400000),
          attachments: [
            { type: 'document', name: 'auth-feature-doc.pdf', url: '#' }
          ],
          reactions: [
            { emoji: "🎉", count: 1, userReacted: false }
          ]
        },
        {
          id: 3,
          sender: { name: "Alex Johnson", avatar: "AJ" },
          content: "Here are the updated UI designs for the dashboard. Let me know your thoughts!",
          timestamp: new Date(Date.now() - 3200000),
          attachments: [
            { type: 'image', name: 'dashboard-ui.png', url: '#' },
            { type: 'image', name: 'mobile-view.png', url: '#' }
          ]
        },
        {
          id: 4,
          sender: { name: "James Martin", avatar: "JM" },
          content: "I've scheduled the sprint planning for tomorrow at 10 AM. Please prepare your estimates.",
          timestamp: new Date(Date.now() - 2800000),
          attachments: [
            { type: 'link', name: 'Sprint Planning Meeting', url: '#' }
          ],
          reactions: [
            { emoji: "👍", count: 5, userReacted: true },
            { emoji: "👀", count: 2, userReacted: false }
          ]
        },
        {
          id: 5,
          sender: { name: "Emily Davis", avatar: "ED" },
          content: "I've updated the product requirements document with the latest feedback from stakeholders.",
          timestamp: new Date(Date.now() - 2400000),
          attachments: [
            { type: 'document', name: 'product-requirements-v2.docx', url: '#' }
          ]
        },
        {
          id: 6,
          sender: { name: "Chris Lee", avatar: "CL" },
          content: "I'm working on fixing the pagination bug. Should be done by EOD.",
          timestamp: new Date(Date.now() - 1800000)
        },
        {
          id: 7,
          sender: { name: "Sarah Wilson", avatar: "SW" },
          content: "I've prepared the test cases for the new features. Let's review them in our next meeting.",
          timestamp: new Date(Date.now() - 1200000),
          reactions: [
            { emoji: "👍", count: 2, userReacted: false }
          ]
        }
      ];
      
      const mockFiles: FileItem[] = [
        {
          id: 1,
          name: "product-requirements-v2.docx",
          type: "doc",
          size: "2.4 MB",
          uploadedBy: { name: "Emily Davis", avatar: "ED" },
          uploadDate: new Date(Date.now() - 2400000),
          url: "#"
        },
        {
          id: 2,
          name: "dashboard-ui.png",
          type: "image",
          size: "3.2 MB",
          uploadedBy: { name: "Alex Johnson", avatar: "AJ" },
          uploadDate: new Date(Date.now() - 3200000),
          url: "#",
          thumbnail: "#"
        },
        {
          id: 3,
          name: "mobile-view.png",
          type: "image",
          size: "2.1 MB",
          uploadedBy: { name: "Alex Johnson", avatar: "AJ" },
          uploadDate: new Date(Date.now() - 3200000),
          url: "#",
          thumbnail: "#"
        },
        {
          id: 4,
          name: "auth-feature-doc.pdf",
          type: "pdf",
          size: "1.8 MB",
          uploadedBy: { name: "Michael Brown", avatar: "MB" },
          uploadDate: new Date(Date.now() - 3400000),
          url: "#"
        },
        {
          id: 5,
          name: "sprint-report-q3.xlsx",
          type: "spreadsheet",
          size: "1.2 MB",
          uploadedBy: { name: "Jane Cooper", avatar: "JC" },
          uploadDate: new Date(Date.now() - 86400000 * 2),
          url: "#"
        },
        {
          id: 6,
          name: "project-demo.mp4",
          type: "video",
          size: "24.6 MB",
          uploadedBy: { name: "Chris Lee", avatar: "CL" },
          uploadDate: new Date(Date.now() - 86400000 * 3),
          url: "#",
          thumbnail: "#"
        }
      ];
      
      const mockNotifications: NotificationItem[] = [
        {
          id: 1,
          type: "mention",
          content: "Michael Brown mentioned you in #frontend-team",
          timestamp: new Date(Date.now() - 1800000),
          isRead: false,
          sender: { name: "Michael Brown", avatar: "MB" },
          link: "#"
        },
        {
          id: 2,
          type: "file",
          content: "Alex Johnson shared design files in #general",
          timestamp: new Date(Date.now() - 3600000),
          isRead: false,
          sender: { name: "Alex Johnson", avatar: "AJ" },
          link: "#"
        },
        {
          id: 3,
          type: "message",
          content: "New message from Emily Davis",
          timestamp: new Date(Date.now() - 7200000),
          isRead: true,
          sender: { name: "Emily Davis", avatar: "ED" },
          link: "#"
        },
        {
          id: 4,
          type: "task",
          content: "James Martin assigned you a new task",
          timestamp: new Date(Date.now() - 86400000),
          isRead: true,
          sender: { name: "James Martin", avatar: "JM" },
          link: "#"
        },
        {
          id: 5,
          type: "meeting",
          content: "Sprint Planning meeting starts in 15 minutes",
          timestamp: new Date(Date.now() - 900000),
          isRead: false,
          link: "#"
        }
      ];
      
      setTeamMembers(mockTeamMembers);
      setChannels(mockChannels);
      setFilteredChannels(mockChannels);
      setMessages(mockMessages);
      setFiles(mockFiles);
      setNotifications(mockNotifications);
      setCurrentChannel(mockChannels[0]);
      setLoading(false);
    }, 1000);
  }, [location]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = channels.filter(channel => 
        channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChannels(filtered);
    } else {
      setFilteredChannels(channels);
    }
  }, [searchQuery, channels]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: ChatMessage = {
      id: messages.length + 1,
      sender: { name: "Jane Cooper", avatar: "JC" },
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    toast.success("Message sent", {
      description: "Your message has been delivered"
    });
  };

  const handleFileUpload = () => {
    setShowUploadDialog(false);
    
    toast.success("File uploaded", {
      description: "Your file has been shared with the team"
    });
  };

  const handleCreateChannel = () => {
    if (!newChannelData.name) {
      toast.error("Please enter a channel name");
      return;
    }
    
    const newChannel: ChatChannel = {
      id: channels.length + 1,
      name: newChannelData.name,
      type: "channel",
      unreadCount: 0,
      isPrivate: newChannelData.isPrivate,
      lastMessage: {
        content: "Channel created",
        timestamp: new Date()
      }
    };
    
    setChannels([...channels, newChannel]);
    setFilteredChannels([...channels, newChannel]);
    setCurrentChannel(newChannel);
    setShowNewChannelDialog(false);
    setNewChannelData({
      name: "",
      isPrivate: false,
      members: []
    });
    
    toast.success("Channel created", {
      description: `#${newChannelData.name} has been created`
    });
  };

  const handleSelectChannel = (channel: ChatChannel) => {
    setCurrentChannel(channel);
    
    // Mark as read
    setChannels(
      channels.map(c => c.id === channel.id ? { ...c, unreadCount: 0 } : c)
    );
    setFilteredChannels(
      filteredChannels.map(c => c.id === channel.id ? { ...c, unreadCount: 0 } : c)
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-4 w-4 text-red-500" />;
      case 'image': return <Image className="h-4 w-4 text-blue-500" />;
      case 'doc': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'spreadsheet': return <FileText className="h-4 w-4 text-green-500" />;
      case 'video': return <Video className="h-4 w-4 text-purple-500" />;
      default: return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (loading) {
    return (
      <DashboardLayout role={role as any}>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Team Collaboration Hub | Axia Agile</title>
        <meta name="description" content="Real-time chat, notifications, and file sharing for smooth communication" />
      </Helmet>

      <DashboardLayout role={role as any}>
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Team Collaboration Hub</h1>
              <p className="text-muted-foreground">
                Real-time chat, notifications, and file sharing for smooth communication
              </p>
            </div>
            <div className="mt-4 flex space-x-3 md:mt-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 relative">
                    <Bell size={16} />
                    Notifications
                    {notifications.filter(n => !n.isRead).length > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                        {notifications.filter(n => !n.isRead).length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  </div>
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-2 rounded-md text-sm ${
                            notification.isRead ? "bg-background" : "bg-muted"
                          }`}
                        >
                          <div className="flex gap-2">
                            {notification.sender && (
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{notification.sender.avatar}</AvatarFallback>
                              </Avatar>
                            )}
                            <div className="flex-1">
                              <p className="text-sm">{notification.content}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.timestamp.toLocaleTimeString(undefined, { 
                                  hour: 'numeric', 
                                  minute: '2-digit',
                                  hour12: true 
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <Button 
                className="flex items-center gap-2"
                onClick={() => setShowNewChannelDialog(true)}
              >
                <Plus size={16} />
                New Channel
              </Button>
            </div>
          </div>

          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare size={16} />
                <span>Team Chat</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center gap-2">
                <FileUp size={16} />
                <span>Files & Documents</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users size={16} />
                <span>Team Members</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle>Channels</CardTitle>
                      <Button variant="ghost" size="icon" onClick={() => setShowNewChannelDialog(true)}>
                        <Plus size={16} />
                      </Button>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        placeholder="Search channels..." 
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px]">
                      <div className="divide-y">
                        <div className="px-4 py-2">
                          <h3 className="text-xs font-medium text-muted-foreground mb-2">CHANNELS</h3>
                          <ul className="space-y-1">
                            {filteredChannels
                              .filter(channel => channel.type === "channel")
                              .map(channel => (
                                <li 
                                  key={channel.id}
                                  className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted ${
                                    currentChannel?.id === channel.id ? "bg-muted" : ""
                                  }`}
                                  onClick={() => handleSelectChannel(channel)}
                                >
                                  <div className="flex items-center">
                                    <span className="mr-2 text-muted-foreground">#</span>
                                    <span>{channel.name}</span>
                                    {channel.isPrivate && (
                                      <Badge variant="outline" className="ml-2 text-xs">Private</Badge>
                                    )}
                                  </div>
                                  {channel.unreadCount > 0 && (
                                    <Badge className="bg-primary">{channel.unreadCount}</Badge>
                                  )}
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="px-4 py-2">
                          <h3 className="text-xs font-medium text-muted-foreground mb-2">DIRECT MESSAGES</h3>
                          <ul className="space-y-1">
                            {filteredChannels
                              .filter(channel => channel.type === "direct")
                              .map(channel => (
                                <li 
                                  key={channel.id}
                                  className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted ${
                                    currentChannel?.id === channel.id ? "bg-muted" : ""
                                  }`}
                                  onClick={() => handleSelectChannel(channel)}
                                >
                                  <div className="flex items-center">
                                    {channel.members && channel.members[0] && (
                                      <>
                                        <Avatar className="h-5 w-5 mr-2">
                                          <AvatarFallback>{channel.members[0].avatar}</AvatarFallback>
                                        </Avatar>
                                        <span>
                                          {channel.members[0].name}
                                          <span className={`ml-2 h-2 w-2 rounded-full inline-block ${
                                            channel.members[0].status === 'online' ? 'bg-green-500' :
                                            channel.members[0].status === 'away' ? 'bg-yellow-500' :
                                            'bg-gray-500'
                                          }`}></span>
                                        </span>
                                      </>
                                    )}
                                    {!channel.members && <span>{channel.name}</span>}
                                  </div>
                                  {channel.unreadCount > 0 && (
                                    <Badge className="bg-primary">{channel.unreadCount}</Badge>
                                  )}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-3 flex flex-col">
                  <CardHeader className="pb-2 border-b">
                    {currentChannel && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {currentChannel.type === "channel" ? (
                            <>
                              <span className="mr-2 text-muted-foreground">#</span>
                              <CardTitle>{currentChannel.name}</CardTitle>
                              {currentChannel.isPrivate && (
                                <Badge variant="outline" className="ml-2">Private</Badge>
                              )}
                            </>
                          ) : (
                            <>
                              {currentChannel.members && currentChannel.members[0] && (
                                <>
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarFallback>
                                      {currentChannel.members[0].avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <CardTitle>{currentChannel.members[0].name}</CardTitle>
                                  <span className={`ml-2 h-2.5 w-2.5 rounded-full ${
                                    currentChannel.members[0].status === 'online' ? 'bg-green-500' :
                                    currentChannel.members[0].status === 'away' ? 'bg-yellow-500' :
                                    'bg-gray-500'
                                  }`}></span>
                                </>
                              )}
                              {!currentChannel.members && (
                                <CardTitle>{currentChannel.name}</CardTitle>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <UserPlus size={16} className="mr-1" />
                            Add People
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Search size={16} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-0 flex-grow h-[400px]">
                    <ScrollArea className="h-[400px] py-4">
                      <div className="space-y-4 px-4">
                        {messages.map((message) => (
                          <div key={message.id} className="flex gap-3 group">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{message.sender.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-baseline">
                                <span className="font-semibold">{message.sender.name}</span>
                                <span className="ml-2 text-xs text-muted-foreground">
                                  {formatMessageTime(message.timestamp)}
                                </span>
                              </div>
                              <p className="mt-0.5">{message.content}</p>
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-2 flex gap-2 flex-wrap">
                                  {message.attachments.map((attachment, i) => (
                                    <div 
                                      key={i}
                                      className="border rounded-md p-2 flex items-center gap-2 bg-muted/50"
                                    >
                                      {attachment.type === 'image' ? (
                                        <Image size={16} className="text-blue-500" />
                                      ) : attachment.type === 'document' ? (
                                        <FileText size={16} className="text-red-500" />
                                      ) : (
                                        <File size={16} />
                                      )}
                                      <span className="text-sm">{attachment.name}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {message.reactions && message.reactions.length > 0 && (
                                <div className="mt-2 flex gap-1">
                                  {message.reactions.map((reaction, i) => (
                                    <Badge 
                                      key={i}
                                      variant={reaction.userReacted ? "default" : "outline"}
                                      className="cursor-pointer text-xs"
                                    >
                                      {reaction.emoji} {reaction.count}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 flex flex-col gap-1 self-start">
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ThumbsUp size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MessageCircle size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <div className="flex items-center gap-2 w-full">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setShowUploadDialog(true)}
                      >
                        <Paperclip size={18} />
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button 
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="files">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileUp size={20} />
                      Files & Documents
                    </CardTitle>
                    <Button onClick={() => setShowUploadDialog(true)}>
                      Upload File
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {files.map((file) => (
                      <div key={file.id} className="border rounded-lg overflow-hidden bg-card">
                        {file.type === "image" && file.thumbnail && (
                          <div className="h-32 bg-muted flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Image size={48} className="text-muted-foreground" />
                            </div>
                          </div>
                        )}
                        {file.type === "video" && file.thumbnail && (
                          <div className="h-32 bg-muted flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Video size={48} className="text-muted-foreground" />
                            </div>
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            {getFileIcon(file.type)}
                            <h3 className="font-medium text-sm truncate" title={file.name}>
                              {file.name}
                            </h3>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{file.size}</span>
                            <span>{file.uploadDate.toLocaleDateString()}</span>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{file.uploadedBy.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{file.uploadedBy.name}</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <Button variant="outline" size="sm" className="text-xs">
                              Preview
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs">
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users size={20} />
                      Team Members
                    </CardTitle>
                    <Button variant="outline">
                      <UserPlus size={16} className="mr-1" />
                      Invite Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="border rounded-lg p-4 bg-card">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <Badge 
                            variant="outline"
                            className={
                              member.status === 'online' ? 'text-green-500 border-green-500' :
                              member.status === 'away' ? 'text-yellow-500 border-yellow-500' :
                              'text-gray-500 border-gray-500'
                            }
                          >
                            <span className={`mr-1.5 h-2 w-2 rounded-full inline-block ${
                              member.status === 'online' ? 'bg-green-500' :
                              member.status === 'away' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`}></span>
                            {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                          </Badge>
                          {member.status === 'offline' && member.lastActive && (
                            <span className="text-xs text-muted-foreground">
                              <Clock size={12} className="inline mr-1" />
                              {new Date(member.lastActive).toLocaleTimeString(undefined, { 
                                hour: 'numeric', 
                                minute: '2-digit',
                                hour12: true 
                              })}
                            </span>
                          )}
                        </div>
                        <div className="mt-3 flex justify-between">
                          <Button variant="outline" size="sm">
                            <MessageSquare size={14} className="mr-1" />
                            Message
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Calendar size={14} className="mr-1" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>

      {/* File Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file">Select File</Label>
              <Input id="file" type="file" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea 
                id="description"
                placeholder="Add a description for this file"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="channel">Share in Channel</Label>
              <Select defaultValue={currentChannel?.id.toString() || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  {channels
                    .filter(channel => channel.type === "channel")
                    .map(channel => (
                      <SelectItem key={channel.id} value={channel.id.toString()}>
                        #{channel.name}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleFileUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Channel Dialog */}
      <Dialog open={showNewChannelDialog} onOpenChange={setShowNewChannelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Channel</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="channel-name">Channel Name</Label>
              <Input 
                id="channel-name"
                placeholder="e.g. project-updates"
                value={newChannelData.name}
                onChange={(e) => setNewChannelData({ ...newChannelData, name: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Channel names cannot contain spaces or special characters
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox"
                id="private-channel"
                checked={newChannelData.isPrivate}
                onChange={(e) => setNewChannelData({ ...newChannelData, isPrivate: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="private-channel">Make this channel private</Label>
            </div>
            {newChannelData.isPrivate && (
              <div className="grid gap-2">
                <Label htmlFor="members">Invite Members</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select members" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map(member => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewChannelDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateChannel}>Create Channel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamCollaboration;

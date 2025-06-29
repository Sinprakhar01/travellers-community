"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Heart,
  MessageCircle,
  Users,
  MapPin,
  Calendar,
  Search,
  Bell,
  User,
  Plus,
  Share2,
  X,
  Send,
  ChevronDown,
  ChevronUp,
  Check,
  Menu,
  Home,
  Briefcase,
  Sidebar,
  ArrowLeft,
  Clock,
  DollarSign,
  UserPlus,
  Plane,
  Lightbulb,
} from "lucide-react";

interface AppUser {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}

interface Comment {
  id: string;
  user: AppUser;
  content: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
  timestamp: string;
}

interface TravelPost {
  id: string;
  user: AppUser;
  destination: string;
  state: string;
  description: string;
  image: string;
  departureDate: string;
  duration: string;
  budget: string;
  maxTravelers: number;
  currentTravelers: number;
  tags: string[];
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  postedAt: string;
  hasJoined: boolean;
}

interface Notification {
  id: string;
  type: "join" | "like" | "comment";
  message: string;
  timestamp: string;
  read: boolean;
  postId: string;
}

const currentUser: AppUser = {
  id: "current-user",
  name: "Priya Sharma",
  avatar:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  verified: true,
};

const mockUsers: AppUser[] = [
  {
    id: "1",
    name: "Arjun Patel",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    verified: true,
  },
  {
    id: "2",
    name: "Kavya Reddy",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    verified: false,
  },
  {
    id: "3",
    name: "Rohit Singh",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    verified: true,
  },
  {
    id: "4",
    name: "Ananya Gupta",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    verified: false,
  },
];

const initialPosts: TravelPost[] = [
  {
    id: "1",
    user: mockUsers[0],
    destination: "Goa",
    state: "Goa",
    description:
      "Planning an amazing beach vacation in Goa! Looking for fellow travelers to explore the beautiful beaches, try water sports, and experience the vibrant nightlife. We'll visit Baga Beach, Anjuna, and take a sunset cruise. The trip includes accommodations at a beachfront resort, daily breakfast, and guided tours to local attractions. We'll also explore the Portuguese colonial architecture in Old Goa and visit the famous spice plantations. Perfect for those who love beach activities, cultural experiences, and want to make new friends while traveling!",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
    departureDate: "2024-03-15",
    duration: "5 days",
    budget: "₹15,000 - ₹25,000",
    maxTravelers: 4,
    currentTravelers: 2,
    tags: ["Beach", "Nightlife", "Water Sports", "Cruise"],
    likes: 127,
    comments: [],
    isLiked: false,
    postedAt: "20 hours ago",
    hasJoined: false,
  },
  {
    id: "2",
    user: mockUsers[1],
    destination: "Manali",
    state: "Himachal Pradesh",
    description:
      "Adventure seekers wanted for an epic Himalayan expedition! Planning to trek through beautiful valleys, visit ancient temples, and experience the snow-capped mountains. Perfect for nature lovers and photography enthusiasts. We'll be trekking to Solang Valley, visiting the Hadimba Temple, and exploring the local markets. The package includes mountain camping, professional trekking guide, all meals, and transportation. Great opportunity to disconnect from city life and connect with nature while making lasting friendships with fellow adventurers!",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    departureDate: "2024-04-10",
    duration: "8 days",
    budget: "₹20,000 - ₹35,000",
    maxTravelers: 6,
    currentTravelers: 3,
    tags: ["Mountains", "Trekking", "Photography", "Adventure"],
    likes: 89,
    comments: [],
    isLiked: true,
    postedAt: "5 hours ago",
    hasJoined: false,
  },
  {
    id: "3",
    user: mockUsers[2],
    destination: "Rajasthan",
    state: "Rajasthan",
    description:
      "Royal heritage tour through the land of kings! Exploring magnificent palaces, riding camels in the Thar Desert, and experiencing the rich culture of Jaipur, Udaipur, and Jodhpur. A journey through India's royal history. We'll stay in heritage hotels, enjoy traditional Rajasthani cuisine, attend cultural performances, and shop for authentic handicrafts. The tour includes visits to Amber Fort, City Palace, Mehrangarh Fort, and a memorable camel safari in Jaisalmer. Perfect for history buffs and culture enthusiasts who want to experience the grandeur of royal India!",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
    departureDate: "2024-05-05",
    duration: "12 days",
    budget: "₹30,000 - ₹50,000",
    maxTravelers: 8,
    currentTravelers: 4,
    tags: ["Heritage", "Culture", "Desert", "Palaces"],
    likes: 203,
    comments: [],
    isLiked: false,
    postedAt: "1 day ago",
    hasJoined: false,
  },
  {
    id: "4",
    user: mockUsers[3],
    destination: "Kerala",
    state: "Kerala",
    description:
      "Backwater bliss and spice plantation tour! Seeking travel companions for a peaceful journey through Kerala's serene backwaters, lush tea gardens, and spice plantations. Includes houseboat stays and Ayurvedic treatments. We'll cruise through Alleppey backwaters, visit Munnar tea gardens, explore Periyar Wildlife Sanctuary, and enjoy traditional Kerala cuisine. The trip includes authentic Ayurvedic spa treatments, cooking classes, and cultural performances. Perfect for those seeking relaxation, natural beauty, and wellness experiences in God's Own Country!",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    departureDate: "2024-06-20",
    duration: "10 days",
    budget: "₹25,000 - ₹40,000",
    maxTravelers: 5,
    currentTravelers: 2,
    tags: ["Backwaters", "Nature", "Ayurveda", "Houseboat"],
    likes: 156,
    comments: [],
    isLiked: true,
    postedAt: "3 days ago",
    hasJoined: false,
  },
  {
    id: "5",
    user: mockUsers[1],
    destination: "Leh Ladakh",
    state: "Jammu & Kashmir",
    description:
      "Ultimate high-altitude adventure in the Land of High Passes! Experience breathtaking landscapes, Buddhist monasteries, and the thrill of riding through the world's highest motorable roads. Perfect for adventure enthusiasts! We'll visit Pangong Lake, Nubra Valley, Khardung La Pass, and ancient monasteries like Hemis and Thiksey. The expedition includes acclimatization days, professional guides, oxygen support, and all necessary permits. This is a once-in-a-lifetime journey through one of the most spectacular regions on Earth, ideal for photographers and adventure seekers!",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    departureDate: "2024-07-15",
    duration: "14 days",
    budget: "₹40,000 - ₹60,000",
    maxTravelers: 6,
    currentTravelers: 4,
    tags: ["Mountains", "Adventure", "Biking", "Photography"],
    likes: 298,
    comments: [],
    isLiked: true,
    postedAt: "1 week ago",
    hasJoined: false,
  },
  {
    id: "6",
    user: mockUsers[2],
    destination: "Andaman",
    state: "Andaman",
    description:
      "Pristine beaches and crystal clear waters await! Explore untouched coral reefs, indulge in water sports, and witness stunning sunsets. A perfect tropical getaway for beach lovers and diving enthusiasts. We'll visit Radhanagar Beach, Neil Island, Ross Island, and enjoy snorkeling at Elephant Beach. The package includes scuba diving certification, island hopping, seafood dining experiences, and beachfront accommodations. This tropical paradise offers the perfect escape from city life with white sandy beaches, turquoise waters, and incredible marine life!",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    departureDate: "2024-08-10",
    duration: "7 days",
    budget: "₹35,000 - ₹50,000",
    maxTravelers: 8,
    currentTravelers: 6,
    tags: ["Beach", "Diving", "Island", "Adventure"],
    likes: 167,
    comments: [],
    isLiked: false,
    postedAt: "4 days ago",
    hasJoined: false,
  },
];

export default function TravelSocialPlatform() {
  const [posts, setPosts] = useState<TravelPost[]>(initialPosts);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showCreateTrip, setShowCreateTrip] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [expandedComments, setExpandedComments] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] =
    useState<TravelPost[]>(initialPosts);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [currentView, setCurrentView] = useState<
    "feed" | "mytrips" | "tripDetail"
  >("feed");
  const [selectedTrip, setSelectedTrip] = useState<TravelPost | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [randomStats, setRandomStats] = useState({
    monthlyTrips: 35,
    activeUsers: 75,
    tipNumber: 42,
    userTripCounts: [5, 7, 3],
  });
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const notificationRef = useRef<HTMLDivElement>(null);
  const mobileNotificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileSidebarRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const [newTrip, setNewTrip] = useState({
    destination: "",
    state: "",
    description: "",
    image: null as File | null,
    departureDate: "",
    duration: "",
    budget: "",
    maxTravelers: 1,
    tags: [] as string[],
  });

  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Custom Calendar States
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const userTrips = posts.filter((post) => post.user.id === currentUser.id);

  const [imagePreview, setImagePreview] = useState<string>("");

  const popularDestinations = Array.from(
    new Set(posts.map((post) => post.destination))
  )
    .slice(0, 6)
    .map((dest) => ({
      name: dest,
      count: posts.filter((post) => post.destination === dest).length,
    }))
    .sort((a, b) => b.count - a.count);

  const travelStats = {
    totalTrips: posts.length,
    activeUsers: mockUsers.length,
    totalTravelers: posts.reduce((sum, post) => sum + post.currentTravelers, 0),
    upcomingTrips: posts.filter(
      (post) => new Date(post.departureDate) > new Date()
    ).length,
  };

  const filterOptions = [
    { value: "all", label: "All Trips" },
    { value: "Beach", label: "Beach" },
    { value: "Mountains", label: "Mountains" },
    { value: "Heritage", label: "Heritage" },
    { value: "Adventure", label: "Adventure" },
    { value: "Nature", label: "Nature" },
  ];

  useEffect(() => {
    let filtered = posts;

    console.log("Filtering with:", { searchQuery, selectedFilter });

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (post) =>
          post.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      console.log("After search filter:", filtered.length, "posts");
    }

    if (selectedFilter !== "all") {
      filtered = filtered.filter((post) =>
        post.tags.some((tag) =>
          tag.toLowerCase().includes(selectedFilter.toLowerCase())
        )
      );
      console.log("After category filter:", filtered.length, "posts");
    }

    setFilteredPosts(filtered);
  }, [searchQuery, posts, selectedFilter]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;

      if (target.textContent === "Mark all as read") {
        return;
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        mobileNotificationRef.current &&
        !mobileNotificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
      if (
        mobileSidebarRef.current &&
        !mobileSidebarRef.current.contains(event.target as Node)
      ) {
        setShowMobileSidebar(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showCreateTrip || showMobileSidebar) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
      document.body.style.height = "unset";
      document.body.style.touchAction = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
      document.body.style.height = "unset";
      document.body.style.touchAction = "unset";
    };
  }, [showCreateTrip, showMobileSidebar]);

  useEffect(() => {
    setRandomStats({
      monthlyTrips: Math.floor(Math.random() * 50 + 20),
      activeUsers: Math.floor(Math.random() * 100 + 50),
      tipNumber: Math.floor(Math.random() * 100 + 1),
      userTripCounts: [
        Math.floor(Math.random() * 10 + 1),
        Math.floor(Math.random() * 10 + 1),
        Math.floor(Math.random() * 10 + 1),
      ],
    });
  }, []);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 second loading screen

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addNotification = (
    type: "join" | "like" | "comment",
    message: string,
    postId: string
  ) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: "Just now",
      read: false,
      postId,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewTrip({ ...newTrip, image: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newIsLiked = !post.isLiked;
          if (newIsLiked) {
            addNotification(
              "like",
              `You liked ${post.destination} trip`,
              postId
            );
          }
          const updatedPost = {
            ...post,
            isLiked: newIsLiked,
            likes: newIsLiked ? post.likes + 1 : post.likes - 1,
          };
          if (selectedTrip && selectedTrip.id === postId) {
            setSelectedTrip(updatedPost);
          }
          return updatedPost;
        }
        return post;
      })
    );
  };

  const handleJoin = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (
          post.id === postId &&
          post.currentTravelers < post.maxTravelers &&
          !post.hasJoined
        ) {
          addNotification(
            "join",
            `You joined the ${post.destination} trip!`,
            postId
          );
          showToastMessage("Successfully joined the trip!");
          const updatedPost = {
            ...post,
            currentTravelers: post.currentTravelers + 1,
            hasJoined: true,
          };
          if (selectedTrip && selectedTrip.id === postId) {
            setSelectedTrip(updatedPost);
          }
          return updatedPost;
        }
        return post;
      })
    );
  };

  const handleShare = (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      if (post.currentTravelers >= post.maxTravelers) {
        showToastMessage(`${post.destination} trip is full!`);
      } else {
        showToastMessage(`${post.destination} trip shared successfully!`);
      }
    }
  };

  const handleCreateTrip = () => {
    if (!newTrip.destination || !newTrip.description || !newTrip.image) {
      showToastMessage(
        "Please fill all required fields including uploading an image!"
      );
      return;
    }

    if (newTrip.departureDate) {
      const selectedDate = new Date(newTrip.departureDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        showToastMessage(
          "Departure date cannot be in the past. Please select a future date."
        );
        return;
      }
    }

    const imageUrl =
      imagePreview ||
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop";

    const trip: TravelPost = {
      id: Date.now().toString(),
      user: currentUser,
      destination: newTrip.destination,
      state: newTrip.state,
      description: newTrip.description,
      image: imageUrl,
      departureDate: newTrip.departureDate,
      duration: newTrip.duration,
      budget: newTrip.budget,
      maxTravelers: newTrip.maxTravelers,
      currentTravelers: 1,
      tags: newTrip.tags,
      likes: 0,
      comments: [],
      isLiked: false,
      postedAt: "Just now",
      hasJoined: true,
    };

    setPosts([trip, ...posts]);
    setNewTrip({
      destination: "",
      state: "",
      description: "",
      image: null,
      departureDate: "",
      duration: "",
      budget: "",
      maxTravelers: 1,
      tags: [],
    });
    setImagePreview("");
    setShowCreateTrip(false);
    showToastMessage("Trip created successfully!");
  };

  const handleComment = (postId: string) => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      user: currentUser,
      content: commentText,
      likes: 0,
      isLiked: false,
      replies: [],
      timestamp: "Just now",
    };

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          addNotification(
            "comment",
            `You commented on ${post.destination} trip`,
            postId
          );
          const updatedPost = {
            ...post,
            comments: [...post.comments, newComment],
          };
          if (selectedTrip && selectedTrip.id === postId) {
            setSelectedTrip(updatedPost);
          }
          return updatedPost;
        }
        return post;
      })
    );

    setCommentText("");
  };

  const handleReply = (postId: string, commentId: string) => {
    if (!replyText.trim()) return;

    const newReply: Comment = {
      id: Date.now().toString(),
      user: currentUser,
      content: replyText,
      likes: 0,
      isLiked: false,
      replies: [],
      timestamp: "Just now",
    };

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const updatedPost = {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [...comment.replies, newReply],
                };
              }
              return comment;
            }),
          };
          if (selectedTrip && selectedTrip.id === postId) {
            setSelectedTrip(updatedPost);
          }
          return updatedPost;
        }
        return post;
      })
    );

    setReplyText("");
    setReplyingTo(null);
  };

  const handleCommentLike = (
    postId: string,
    commentId: string,
    isReply = false,
    parentCommentId?: string
  ) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const updatedPost = {
            ...post,
            comments: post.comments.map((comment) => {
              if (isReply && comment.id === parentCommentId) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) => {
                    if (reply.id === commentId) {
                      return {
                        ...reply,
                        isLiked: !reply.isLiked,
                        likes: reply.isLiked
                          ? reply.likes - 1
                          : reply.likes + 1,
                      };
                    }
                    return reply;
                  }),
                };
              } else if (!isReply && comment.id === commentId) {
                return {
                  ...comment,
                  isLiked: !comment.isLiked,
                  likes: comment.isLiked
                    ? comment.likes - 1
                    : comment.likes + 1,
                };
              }
              return comment;
            }),
          };
          if (selectedTrip && selectedTrip.id === postId) {
            setSelectedTrip(updatedPost);
          }
          return updatedPost;
        }
        return post;
      })
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const MAX_TAGS = 5;

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    const normalizedTag = trimmedTag.replace(/^#+/, "").trim();

    if (newTrip.tags.length >= MAX_TAGS) {
      showToastMessage(`Maximum ${MAX_TAGS} tags allowed!`);
      return;
    }

    if (
      normalizedTag &&
      normalizedTag.length > 0 &&
      normalizedTag.length <= 20 &&
      !newTrip.tags.includes(normalizedTag)
    ) {
      setNewTrip({ ...newTrip, tags: [...newTrip.tags, normalizedTag] });
      showToastMessage(`Tag "${normalizedTag}" added!`);
    } else if (newTrip.tags.includes(normalizedTag)) {
      showToastMessage(`Tag "${normalizedTag}" already exists!`);
    } else if (normalizedTag.length > 20) {
      showToastMessage("Tags must be 20 characters or less!");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewTrip({
      ...newTrip,
      tags: newTrip.tags.filter((tag) => tag !== tagToRemove),
    });
    showToastMessage(`Tag "${tagToRemove}" removed!`);
  };

  const handleMyTrips = () => {
    setCurrentView("mytrips");
    setShowUserMenu(false);
    setShowMobileMenu(false);
    setShowNotifications(false);
    setShowMobileSearch(false);
    
    setTimeout(() => {
      const mainElement = document.querySelector('main') || 
                         document.querySelector('.max-w-7xl') ||
                         document.querySelector('[class*="max-w-7xl"]');
      if (mainElement) {
        const navbarHeight = 70;
        const elementTop = mainElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementTop - (navbarHeight),
          behavior: "smooth"
        });
      } else {
        window.scrollTo({
          top: 100,
          behavior: "smooth"
        });
      }
    }, 200);
  };

  const handleFeed = () => {
    setCurrentView("feed");
    setShowMobileMenu(false);
    setShowUserMenu(false);
    setShowNotifications(false);
    setShowMobileSearch(false);
    
    setTimeout(() => {
      const mainElement = document.querySelector('main') || 
                         document.querySelector('.max-w-7xl') ||
                         document.querySelector('[class*="max-w-7xl"]');
      if (mainElement) {
        const navbarHeight = 70;
        const elementTop = mainElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementTop - navbarHeight,
          behavior: "smooth"
        });
      } else {
        window.scrollTo({
          top: 100,
          behavior: "smooth"
        });
      }
    }, 200);
  };

  const handleLogoClick = () => {
    // Reset to home/hero section
    setCurrentView("feed");
    setShowMobileMenu(false);
    setShowUserMenu(false);
    setShowNotifications(false);
    setShowMobileSearch(false);
    setShowCreateTrip(false);
    setSelectedTrip(null);
    setExpandedComments(null);
    setSearchQuery("");
    
    // Scroll to the very top of the page (hero section)
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 100);
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(expandedComments === postId ? null : postId);
  };

  const handleSubscribe = () => {
    if (!subscribeEmail.trim()) {
      showToastMessage("Please enter a valid email address!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscribeEmail)) {
      showToastMessage("Please enter a valid email address!");
      return;
    }

    showToastMessage("Successfully subscribed to newsletter!");
    setSubscribeEmail("");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const incrementMaxTravelers = () => {
    if (newTrip.maxTravelers < 20) {
      setNewTrip({
        ...newTrip,
        maxTravelers: newTrip.maxTravelers + 1,
      });
    }
  };

  const decrementMaxTravelers = () => {
    if (newTrip.maxTravelers > 1) {
      setNewTrip({
        ...newTrip,
        maxTravelers: newTrip.maxTravelers - 1,
      });
    }
  };

  const formatBudget = (budget: string) => {
    const numbers = budget.match(/[\d,]+/g);
    if (!numbers) return budget;

    const formatNumber = (num: string) => {
      const cleanNum = num.replace(/,/g, "");
      const value = parseInt(cleanNum);
      if (value >= 1000) {
        return `${Math.floor(value / 1000)}k`;
      }
      return cleanNum;
    };

    if (numbers.length === 2) {
      return `₹${formatNumber(numbers[0])} - ₹${formatNumber(numbers[1])}`;
    } else if (numbers.length === 1) {
      return `₹${formatNumber(numbers[0])}`;
    }

    return budget;
  };

  const scrollToDestination = (destinationName: string) => {
    setSearchQuery(destinationName);
    setShowMobileSidebar(false);

    if (currentView !== "feed") {
      setCurrentView("feed");
    }

    setTimeout(() => {
      const targetPost = posts.find(
        (post) =>
          post.destination.toLowerCase() === destinationName.toLowerCase()
      );

      if (targetPost) {
        const element = document.querySelector(
          `[data-destination="${destinationName}"]`
        );
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });

          element.classList.add("highlight-destination");
          setTimeout(() => {
            element.classList.remove("highlight-destination");
          }, 2000);
        }
      }
    }, 100);
  };

  const handleTripClick = (trip: TravelPost) => {
    setSelectedTrip(trip);
    setCurrentView("tripDetail");
    setExpandedComments(null);
  };

  const handleBackToFeed = () => {
    setCurrentView("feed");
    setSelectedTrip(null);
    setExpandedComments(null);
  };

  const handleBackToMyTrips = () => {
    setCurrentView("mytrips");
    setSelectedTrip(null);
    setExpandedComments(null);
  };

  // Custom Calendar Helper Functions
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setNewTrip({ ...newTrip, departureDate: formatDate(date) });
    setShowCalendar(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCalendarDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Check if create trip form has any data
  const hasFormData = () => {
    return (
      newTrip.destination.trim() !== '' ||
      newTrip.state.trim() !== '' ||
      newTrip.description.trim() !== '' ||
      newTrip.image !== null ||
      newTrip.departureDate !== '' ||
      newTrip.duration.trim() !== '' ||
      newTrip.budget.trim() !== '' ||
      newTrip.maxTravelers !== 1 ||
      newTrip.tags.length > 0
    );
  };

  // Handle backdrop click for create trip modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (!hasFormData()) {
        setShowCreateTrip(false);
      } else {
        // Optional: Show a toast or confirmation dialog
        showToastMessage("Please save or clear your changes before closing.");
      }
    }
  };

  // Clear all form data
  const clearFormData = () => {
    setNewTrip({
      destination: "",
      state: "",
      description: "",
      image: null,
      departureDate: "",
      duration: "",
      budget: "",
      maxTravelers: 1,
      tags: [],
    });
    setImagePreview("");
    setSelectedDate(null);
    showToastMessage("Form cleared successfully!");
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showCreateTrip) {
        if (!hasFormData()) {
          setShowCreateTrip(false);
        } else {
          showToastMessage("Please save or clear your changes before closing.");
        }
      }
    };

    if (showCreateTrip) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showCreateTrip, newTrip]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleCalendarClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }; 

    if (showCalendar) {
      document.addEventListener('mousedown', handleCalendarClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleCalendarClickOutside);
    };
  }, [showCalendar]);

  // Loading Screen Component
  if (isLoading) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center font-mulish transition-all duration-500 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-[#e0e7ef] via-blue-50 to-[#cbd5e1]"
        }`}
      >
        <div className="flex flex-col items-center space-y-8">
          {/* Main Logo Animation */}
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full opacity-75"></div>
            </div>
            <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Plane className="w-10 h-10 text-white animate-bounce" style={{ transform: 'rotate(45deg)' }} />
            </div>
          </div>

          {/* Brand Name */}
          <div className="text-center space-y-2">
            <h1
              className={`text-4xl md:text-5xl font-extrabold tracking-wider bg-gradient-to-r bg-clip-text text-transparent animate-pulse ${
                isDarkMode
                  ? "from-teal-400 via-cyan-400 to-blue-400"
                  : "from-blue-600 via-teal-600 to-cyan-600"
              }`}
            >
              Yatra
            </h1>
            <p
              className={`text-lg font-medium animate-fade-in ${
                isDarkMode ? "text-gray-300" : "text-[#0B5A99]"
              }`}
            >
              Discover. Connect. Explore.
            </p>
          </div>

          {/* Loading Animation */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              <div
                className={`w-3 h-3 rounded-full animate-bounce ${
                  isDarkMode ? "bg-cyan-400" : "bg-blue-500"
                }`}
                style={{ animationDelay: '0ms' }}
              ></div>
              <div
                className={`w-3 h-3 rounded-full animate-bounce ${
                  isDarkMode ? "bg-teal-400" : "bg-teal-500"
                }`}
                style={{ animationDelay: '150ms' }}
              ></div>
              <div
                className={`w-3 h-3 rounded-full animate-bounce ${
                  isDarkMode ? "bg-blue-400" : "bg-blue-600"
                }`}
                style={{ animationDelay: '300ms' }}
              ></div>
            </div>
            <p
              className={`text-sm font-medium animate-pulse ${
                isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
              }`}
            >
              Loading your travel adventures...
            </p>
          </div>

          {/* Travel Icons Animation */}
          <div className="flex space-x-6 mt-8">
            <div
              className={`p-3 rounded-full animate-float ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/50"
              }`}
              style={{ animationDelay: '0s' }}
            >
              <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <div
              className={`p-3 rounded-full animate-float ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/50"
              }`}
              style={{ animationDelay: '0.5s' }}
            >
              <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div
              className={`p-3 rounded-full animate-float ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/50"
              }`}
              style={{ animationDelay: '1s' }}
            >
              <svg className="w-6 h-6 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen font-mulish transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-[#e0e7ef] to-[#cbd5e1] text-[#0B5A99]"
      }`}
    >
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        /* Webkit Scrollbar Styles */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${isDarkMode 
            ? 'rgba(8, 145, 178, 0.15)' 
            : '#ffffff'};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, #0891b2, #22d3ee)' 
            : 'linear-gradient(135deg, #0F7ACC, #0B5A99)'};
          border-radius: 4px;
          border: 1px solid ${isDarkMode 
            ? 'rgba(8, 145, 178, 0.3)' 
            : 'rgba(15, 122, 204, 0.2)'};
          transition: all 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, #0e7490, #06b6d4)' 
            : 'linear-gradient(135deg, #0B5A99, #083f6b)'};
          transform: scale(1.1);
        }

        ::-webkit-scrollbar-thumb:active {
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, #0c4a6e, #0891b2)' 
            : 'linear-gradient(135deg, #083f6b, #06304f)'};
        }

        ::-webkit-scrollbar-corner {
          background: ${isDarkMode 
            ? 'rgba(8, 145, 178, 0.15)' 
            : '#ffffff'};
        }

        /* Firefox Scrollbar Styles */
        * {
          scrollbar-width: thin;
          scrollbar-color: ${isDarkMode 
            ? '#22d3ee rgba(8, 145, 178, 0.15)' 
            : '#0F7ACC #ffffff'};
        }

        /* Custom scrollbar for specific containers */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDarkMode 
            ? 'rgba(8, 145, 178, 0.1)' 
            : '#ffffff'};
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, #0891b2, #22d3ee)' 
            : 'linear-gradient(135deg, #0F7ACC, #0B5A99)'};
          border-radius: 3px;
        }
      `}</style>
      {showToast && (
        <div
          className={`fixed bottom-4 right-4 z-[9999] text-white px-4 py-2 rounded shadow-lg transition-all ${
            isDarkMode ? "bg-gray-800" : "bg-[#0B5A99]"
          }`}
        >
          {toastMessage}
        </div>
      )}

      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-900 border-gray-700/50"
            : "bg-white border-[#0F7ACC]/20"
        }`}
      >
        <div className="w-full px-4 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 mr-2 sm:mr-4 md:mr-8 cursor-pointer" onClick={handleLogoClick}>
              <div className="relative">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Plane className="w-5 h-5 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white rotate-45" />
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
              </div>
              <h1
                className={`text-lg sm:text-xl md:text-2xl font-extrabold tracking-wider bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode
                    ? "from-teal-400 to-cyan-400"
                    : "from-blue-600 to-teal-600"
                }`}
              >
                Yatra
              </h1>
            </div>

            <div className="items-center hidden ml-auto space-x-4 md:flex">
              <div className="relative">
                <Search
                  className={`absolute z-10 w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 w-64 rounded-full backdrop-blur-sm border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/60 border-gray-600/30 focus:ring-cyan-400/50 text-gray-100 placeholder-gray-400"
                      : "bg-white/60 border-[#0F7ACC]/30 focus:ring-[#0F7ACC]/50 text-[#0B5A99] placeholder-[#0F7ACC]"
                  }`}
                />
              </div>

              <div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full backdrop-blur-sm border transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-gray-800/60 border-gray-600/30 text-gray-100 hover:bg-gray-700/50"
                    : "bg-white/60 border-[#0F7ACC]/30 text-[#0B5A99] hover:bg-[#0F7ACC]/10"
                }`}
                title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              </div>

              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-full backdrop-blur-sm border transition-all relative cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-800/60 border-gray-600/30 text-gray-100 hover:bg-gray-700/50"
                      : "bg-white/60 border-[#0F7ACC]/30 text-[#0B5A99] hover:bg-[#0F7ACC]/10"
                  }`}
                >
                  <Bell className="w-4 h-4"/>
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#0F7ACC] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div
                    className={`absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] backdrop-blur-lg rounded-2xl shadow-2xl border z-50 animate-fade-in transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/95 border-gray-700/50"
                        : "bg-white/95 border-white/50"
                    }`}
                  >
                    <div
                      className={`p-4 border-b flex justify-between items-center transition-colors duration-300 ${
                        isDarkMode
                          ? "border-gray-700/20"
                          : "border-[#0F7ACC]/20"
                      }`}
                    >
                      <h3
                        className={`font-semibold transition-colors duration-300 ${
                          isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                        }`}
                      >
                        Notifications
                      </h3>
                      <button
                        onClick={markAllAsRead}
                        className={`text-sm transition-colors cursor-pointer ${
                          isDarkMode
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-[#0F7ACC] hover:text-[#0B5A99]"
                        }`}
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="overflow-y-auto max-h-96">
                      {notifications.length === 0 ? (
                        <p
                          className={`p-4 text-center transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                          }`}
                        >
                          No notifications yet
                        </p>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`relative p-4 border-b transition-colors ${
                              isDarkMode
                                ? `border-gray-700/10 hover:bg-gray-700/20 ${
                                    !notif.read
                                      ? "bg-gray-700/10 cursor-pointer"
                                      : "hover:bg-transparent"
                                  }`
                                : `border-[#0F7ACC]/10 hover:bg-[#0F7ACC]/10 ${
                                    !notif.read
                                      ? "bg-[#0F7ACC]/5 cursor-pointer"
                                      : "hover:bg-transparent"
                                  }`
                            }`}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              markAsRead(notif.id);
                            }}
                          >
                            <p
                              className={`text-sm transition-colors duration-300 ${
                                isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                              }`}
                            >
                              {notif.message}
                            </p>
                            <p
                              className={`text-xs mt-1 transition-colors duration-300 ${
                                isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                              }`}
                            >
                              {notif.timestamp}
                            </p>
                            {!notif.read && (
                              <div
                                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${
                                  isDarkMode ? "bg-cyan-400" : "bg-[#0F7ACC]"
                                }`}
                              ></div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 p-2 rounded-full backdrop-blur-sm border transition-all cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-800/60 border-gray-600/30 text-gray-100 hover:bg-gray-700/50"
                      : "bg-white/60 border-[#0F7ACC]/30 text-[#0B5A99] hover:bg-[#0F7ACC]/10"
                  }`}
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showUserMenu && (
                  <div
                    className={`absolute right-0 z-50 w-64 overflow-hidden border shadow-2xl top-12 backdrop-blur-lg rounded-2xl animate-fade-in transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/95 border-gray-700/50"
                        : "bg-white/95 border-white/50"
                    }`}
                  >
                    <div
                      className={`relative p-6 transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"
                          : "bg-gradient-to-br from-[#0B5A99] via-[#0F7ACC] to-[#0B5A99]"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
                            : "bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
                        }`}
                      ></div>
                      <div className="relative flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={currentUser.avatar || "/placeholder.svg"}
                            alt={currentUser.name}
                            className="object-cover w-12 h-12 rounded-full shadow-lg border-3 border-white/30"
                          />
                          <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm -bottom-1 -right-1"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">
                            {currentUser.name}
                          </h3>
                          <p className="text-sm text-white/80">
                            Travel Enthusiast
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 space-y-1">
                      <button
                        onClick={handleMyTrips}
                        className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer transform hover:translate-x-1 ${
                          isDarkMode
                            ? "text-gray-200 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-gray-700/10"
                            : "text-[#0B5A99] hover:bg-gradient-to-r hover:from-[#0F7ACC]/10 hover:to-[#0B5A99]/10"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-all ${
                            isDarkMode
                              ? "bg-gradient-to-br from-cyan-500/10 to-gray-600/10 group-hover:from-cyan-500/20 group-hover:to-gray-600/20"
                              : "bg-gradient-to-br from-[#0B5A99]/10 to-[#0F7ACC]/10 group-hover:from-[#0B5A99]/20 group-hover:to-[#0F7ACC]/20"
                          }`}
                        >
                          <Briefcase
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isDarkMode ? "text-cyan-400" : "text-[#0B5A99]"
                            }`}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">My Trips</p>
                          <p
                            className={`text-xs transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            {userTrips.length} active trips
                          </p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                            isDarkMode ? "bg-cyan-400" : "bg-[#0F7ACC]"
                          }`}
                        ></div>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView("feed");
                          setShowUserMenu(false);
                        }}
                        className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer transform hover:translate-x-1 ${
                          isDarkMode
                            ? "text-gray-200 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-gray-700/10"
                            : "text-[#0B5A99] hover:bg-gradient-to-r hover:from-[#0F7ACC]/10 hover:to-[#0B5A99]/10"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-all ${
                            isDarkMode
                              ? "bg-gradient-to-br from-cyan-500/10 to-gray-600/10 group-hover:from-cyan-500/20 group-hover:to-gray-600/20"
                              : "bg-gradient-to-br from-[#0B5A99]/10 to-[#0F7ACC]/10 group-hover:from-[#0B5A99]/20 group-hover:to-[#0F7ACC]/20"
                          }`}
                        >
                          <Home
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isDarkMode ? "text-cyan-400" : "text-[#0B5A99]"
                            }`}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">Explore Feed</p>
                          <p
                            className={`text-xs transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            Discover new trips
                          </p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                            isDarkMode ? "bg-cyan-400" : "bg-[#0F7ACC]"
                          }`}
                        ></div>
                      </button>
                    </div>

                    <div
                      className={`border-t p-4 transition-colors duration-300 ${
                        isDarkMode
                          ? "border-gray-700/10 bg-gradient-to-r from-gray-700/5 to-transparent"
                          : "border-[#0F7ACC]/10 bg-gradient-to-r from-[#0F7ACC]/5 to-transparent"
                      }`}
                    >
                      <div className="flex justify-between text-center">
                        <div>
                          <p
                            className={`text-lg font-bold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                            }`}
                          >
                            {userTrips.length}
                          </p>
                          <p
                            className={`text-xs transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            Trips
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-lg font-bold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                            }`}
                          >
                            {posts.filter((post) => post.isLiked).length}
                          </p>
                          <p
                            className={`text-xs transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            Liked
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-lg font-bold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                            }`}
                          >
                            {posts.filter((post) => post.hasJoined).length}
                          </p>
                          <p
                            className={`text-xs transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            Joined
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowCreateTrip(true)}
                className={`px-4 py-2 text-white rounded-full transition-all font-medium flex items-center space-x-2 cursor-pointer ${
                  isDarkMode
                    ? "bg-cyan-600 hover:bg-cyan-700"
                    : "bg-[#0F7ACC] hover:bg-[#0B5A99]"
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Create Trip</span>
              </button>
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <div ref={mobileSearchRef} className="relative">
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className={`p-2 rounded-full backdrop-blur-sm border transition-all cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-800/60 border-gray-600/30 text-gray-100 hover:bg-gray-700/50"
                      : "bg-white/60 border-[#0F7ACC]/30 text-[#0B5A99] hover:bg-[#0F7ACC]/10"
                  }`}
                >
                  <Search className="w-4 h-4" />
                </button>

                {showMobileSearch && (
                  <div
                    className={`fixed left-4 right-4 top-20 rounded-2xl shadow-2xl border backdrop-blur-lg z-50 animate-fade-in transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/95 border-gray-700/50"
                        : "bg-white/95 border-white/50"
                    }`}
                  >
                    <div className="p-4">
                      <div className="relative">
                        <Search
                          className={`absolute z-10 w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-700"
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="Search destinations..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-full border focus:outline-none focus:ring-2 text-sm transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700/60 border-gray-600/50 focus:ring-cyan-400/50 text-gray-100 placeholder-gray-400"
                              : "bg-white/80 border-[#0F7ACC]/30 focus:ring-[#0F7ACC]/50 text-[#0B5A99] placeholder-[#0F7ACC]"
                          }`}
                          autoFocus
                        />
                      </div>
                      {searchQuery && (
                        <div className="mt-3 pt-3 border-t border-gray-200/20">
                          <p
                            className={`text-xs font-medium mb-2 ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {filteredPosts.length} results found
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full backdrop-blur-sm border transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-gray-800/60 border-gray-600/30 text-gray-100 hover:bg-gray-700/50"
                    : "bg-white/60 border-[#0F7ACC]/30 text-[#0B5A99] hover:bg-[#0F7ACC]/10"
                }`}
                title={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              </div>

              <button
                onClick={() => setShowMobileSidebar(true)}
                className={`p-2 rounded-full backdrop-blur-sm border transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-gray-800/60 border-gray-600/30 text-gray-100 hover:bg-gray-700/50"
                    : "bg-white/60 border-[#0F7ACC]/30 text-[#0B5A99] hover:bg-[#0F7ACC]/10"
                }`}
              >
                <Sidebar className="w-4 h-4" />
              </button>

              <div ref={mobileNotificationRef} className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-full backdrop-blur-sm border transition-all relative cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-800/60 border-gray-600/30 text-gray-100 hover:bg-gray-700/50"
                      : "bg-white/60 border-[#0F7ACC]/30 text-[#0B5A99] hover:bg-[#0F7ACC]/10"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#0F7ACC] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div
                    className={`fixed z-50 border shadow-2xl left-4 right-4 top-20 backdrop-blur-lg rounded-2xl animate-fade-in transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/95 border-gray-700/50"
                        : "bg-white/95 border-white/50"
                    }`}
                  >
                    <div
                      className={`p-4 border-b flex justify-between items-center transition-colors duration-300 ${
                        isDarkMode
                          ? "border-gray-700/20"
                          : "border-[#0F7ACC]/20"
                      }`}
                    >
                      <h3
                        className={`font-semibold transition-colors duration-300 ${
                          isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                        }`}
                      >
                        Notifications
                      </h3>
                      <button
                        onClick={markAllAsRead}
                        className={`text-sm transition-colors cursor-pointer ${
                          isDarkMode
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-[#0F7ACC] hover:text-[#0B5A99]"
                        }`}
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="overflow-y-auto max-h-96">
                      {notifications.length === 0 ? (
                        <p
                          className={`p-4 text-center transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                          }`}
                        >
                          No notifications yet
                        </p>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => markAsRead(notif.id)}
                            className={`relative p-4 border-b cursor-pointer transition-colors ${
                              isDarkMode
                                ? `border-gray-700/10 hover:bg-gray-700/20 ${
                                    !notif.read ? "bg-gray-700/10" : ""
                                  }`
                                : `border-[#0F7ACC]/10 hover:bg-[#0F7ACC]/10 ${
                                    !notif.read ? "bg-[#0F7ACC]/5" : ""
                                  }`
                            }`}
                          >
                            <p
                              className={`text-sm pr-4 transition-colors duration-300 ${
                                isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                              }`}
                            >
                              {notif.message}
                            </p>
                            <p
                              className={`text-xs mt-1 transition-colors duration-300 ${
                                isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                              }`}
                            >
                              {notif.timestamp}
                            </p>
                            {!notif.read && (
                              <div
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full transition-colors duration-300 ${
                                  isDarkMode ? "bg-cyan-400" : "bg-[#0F7ACC]"
                                }`}
                              ></div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div ref={mobileMenuRef}>
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className={`p-2 rounded-full backdrop-blur-sm border transition-all cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-800/60 border-gray-600/30 text-gray-100 hover:bg-gray-700/50"
                      : "bg-white/60 border-[#0F7ACC]/30 text-[#0B5A99] hover:bg-[#0F7ACC]/10"
                  }`}
                >
                  <Menu className="w-5 h-5" />
                </button>

                {showMobileMenu && (
                  <div
                    className={`absolute right-4 top-16 w-72 max-w-[calc(100vw-2rem)] backdrop-blur-lg rounded-2xl shadow-2xl border z-[60] overflow-hidden animate-fade-in transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/95 border-gray-700/50"
                        : "bg-white/95 border-white/50"
                    }`}
                  >
                    <div
                      className={`relative p-6 transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"
                          : "bg-gradient-to-br from-[#0B5A99] via-[#0F7ACC] to-[#0B5A99]"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
                            : "bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
                        }`}
                      ></div>
                      <div className="relative flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={currentUser.avatar || "/placeholder.svg"}
                            alt={currentUser.name}
                            className="object-cover w-12 h-12 rounded-full shadow-lg border-3 border-white/30"
                          />
                          <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm -bottom-1 -right-1"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">
                            {currentUser.name}
                          </h3>
                          <p className="text-sm text-white/80">
                            Travel Enthusiast
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 space-y-1">
                      <button
                        onClick={handleFeed}
                        className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer transform hover:translate-x-1 ${
                          isDarkMode
                            ? "text-gray-200 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-gray-700/10"
                            : "text-[#0B5A99] hover:bg-gradient-to-r hover:from-[#0F7ACC]/10 hover:to-[#0B5A99]/10"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-all ${
                            isDarkMode
                              ? "bg-gradient-to-br from-cyan-500/10 to-gray-600/10 group-hover:from-cyan-500/20 group-hover:to-gray-600/20"
                              : "bg-gradient-to-br from-[#0B5A99]/10 to-[#0F7ACC]/10 group-hover:from-[#0B5A99]/20 group-hover:to-[#0F7ACC]/20"
                          }`}
                        >
                          <Home
                            className={`w-4 h-4 ${
                              isDarkMode ? "text-cyan-400" : "text-[#0B5A99]"
                            }`}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">Explore Feed</p>
                          <p
                            className={`text-xs ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            Discover new trips
                          </p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                            isDarkMode ? "bg-cyan-400" : "bg-[#0F7ACC]"
                          }`}
                        ></div>
                      </button>

                      <button
                        onClick={handleMyTrips}
                        className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer transform hover:translate-x-1 ${
                          isDarkMode
                            ? "text-gray-200 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-gray-700/10"
                            : "text-[#0B5A99] hover:bg-gradient-to-r hover:from-[#0F7ACC]/10 hover:to-[#0B5A99]/10"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-all ${
                            isDarkMode
                              ? "bg-gradient-to-br from-cyan-500/10 to-gray-600/10 group-hover:from-cyan-500/20 group-hover:to-gray-600/20"
                              : "bg-gradient-to-br from-[#0B5A99]/10 to-[#0F7ACC]/10 group-hover:from-[#0B5A99]/20 group-hover:to-[#0F7ACC]/20"
                          }`}
                        >
                          <Briefcase
                            className={`w-4 h-4 ${
                              isDarkMode ? "text-cyan-400" : "text-[#0B5A99]"
                            }`}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">My Trips</p>
                          <p
                            className={`text-xs ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            {userTrips.length} active trips
                          </p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                            isDarkMode ? "bg-cyan-400" : "bg-[#0F7ACC]"
                          }`}
                        ></div>
                      </button>

                      <button
                        onClick={() => {
                          setShowCreateTrip(true);
                          setShowMobileMenu(false);
                          setShowNotifications(false);
                          setShowMobileSearch(false);
                        }}
                        className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer transform hover:translate-x-1 ${
                          isDarkMode
                            ? "text-gray-200 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-gray-700/10"
                            : "text-[#0B5A99] hover:bg-gradient-to-r hover:from-[#0F7ACC]/10 hover:to-[#0B5A99]/10"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-all ${
                            isDarkMode
                              ? "bg-gradient-to-br from-cyan-500/10 to-gray-600/10 group-hover:from-cyan-500/20 group-hover:to-gray-600/20"
                              : "bg-gradient-to-br from-[#0B5A99]/10 to-[#0F7ACC]/10 group-hover:from-[#0B5A99]/20 group-hover:to-[#0F7ACC]/20"
                          }`}
                        >
                          <Plus
                            className={`w-4 h-4 ${
                              isDarkMode ? "text-cyan-400" : "text-[#0B5A99]"
                            }`}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">Create Trip</p>
                          <p
                            className={`text-xs ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            Plan your next adventure
                          </p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                            isDarkMode ? "bg-cyan-400" : "bg-[#0F7ACC]"
                          }`}
                        ></div>
                      </button>
                    </div>

                    <div
                      className={`border-t p-4 transition-colors duration-300 ${
                        isDarkMode
                          ? "border-gray-700/10 bg-gradient-to-r from-gray-700/5 to-transparent"
                          : "border-[#0F7ACC]/10 bg-gradient-to-r from-[#0F7ACC]/5 to-transparent"
                      }`}
                    >
                      <div className="flex justify-between text-center">
                        <div>
                          <p
                            className={`text-lg font-bold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                            }`}
                          >
                            {userTrips.length}
                          </p>
                          <p
                            className={`text-xs transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            Trips
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-lg font-bold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                            }`}
                          >
                            {posts.filter((post) => post.isLiked).length}
                          </p>
                          <p
                            className={`text-xs transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            Liked
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-lg font-bold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                            }`}
                          >
                            {posts.filter((post) => post.hasJoined).length}
                          </p>
                          <p
                            className={`text-xs transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            Joined
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {showCreateTrip && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div
            className={`rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`p-6 border-b flex justify-between items-center transition-colors duration-300 ${
                isDarkMode ? "border-gray-700/20" : "border-[#0F7ACC]/20"
              }`}
            >
              <h2
                className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                }`}
              >
                Create New Trip
              </h2>
              <div className="flex items-center space-x-2">
                {hasFormData() && (
                  <button
                    onClick={clearFormData}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer ${
                      isDarkMode
                        ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title="Clear all form data"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => {
                    if (!hasFormData()) {
                      setShowCreateTrip(false);
                    } else {
                      showToastMessage("Please save or clear your changes before closing.");
                    }
                  }}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isDarkMode
                      ? "hover:bg-gray-700/10 text-gray-400"
                      : "hover:bg-[#0F7ACC]/10 text-[#0F7ACC]"
                  }`}
                  title={hasFormData() ? "Clear changes first to close" : "Close modal"}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0B5A99] mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={newTrip.destination}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, destination: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#0F7ACC]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F7ACC]/50 text-[#0B5A99] placeholder-[#0F7ACC]"
                    placeholder="e.g., Goa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B5A99] mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={newTrip.state}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, state: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#0F7ACC]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F7ACC]/50 text-[#0B5A99] placeholder-[#0F7ACC]"
                    placeholder="e.g., Goa"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B5A99] mb-2">
                  Description
                </label>
                <textarea
                  value={newTrip.description}
                  onChange={(e) =>
                    setNewTrip({ ...newTrip, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-[#0F7ACC]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F7ACC]/50 text-[#0B5A99] placeholder-[#0F7ACC]"
                  placeholder="Describe your trip plans..."
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                  }`}
                >
                  Upload Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 ${
                    isDarkMode
                      ? "border-gray-600/30 focus:ring-cyan-500/50 bg-gray-700/50 text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 file:cursor-pointer"
                      : "border-[#0F7ACC]/30 focus:ring-[#0F7ACC]/50 bg-white text-[#0B5A99] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0B5A99] file:text-white hover:file:bg-[#331D2C] file:cursor-pointer"
                  }`}
                  required
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className={`w-full h-48 object-cover rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "border-gray-600/30"
                          : "border-[#0F7ACC]/30"
                      }`}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                    }`}
                  >
                    Departure Date
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 text-left flex items-center justify-between ${
                        isDarkMode
                          ? "border-gray-600/30 focus:ring-cyan-500/50 bg-gray-700/50 text-gray-200 hover:bg-gray-600/50"
                          : "border-[#0F7ACC]/30 focus:ring-[#0F7ACC]/50 bg-white text-[#0B5A99] hover:bg-[#0F7ACC]/5"
                      }`}
                    >
                      <span className={newTrip.departureDate ? '' : (isDarkMode ? 'text-gray-400' : 'text-[#0F7ACC]')}>
                        {newTrip.departureDate 
                          ? new Date(newTrip.departureDate).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : 'Select departure date'
                        }
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    
                    {showCalendar && (
                      <div
                        ref={calendarRef}
                        className={`absolute top-full left-0 mt-2 z-50 border rounded-xl shadow-2xl backdrop-blur-lg transition-colors duration-300 ${
                      isDarkMode
                            ? "bg-gray-800/95 border-gray-700/50"
                            : "bg-white/95 border-[#0F7ACC]/20"
                        }`}
                      >
                        <div className="p-4 w-80">
                          {/* Calendar Header */}
                          <div className="flex items-center justify-between mb-4">
                            <button
                              type="button"
                              onClick={() => navigateMonth('prev')}
                              className={`p-2 rounded-lg transition-colors duration-300 cursor-pointer ${
                                isDarkMode
                                  ? "hover:bg-gray-700/50 text-gray-300"
                                  : "hover:bg-[#0F7ACC]/10 text-[#0B5A99]"
                              }`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <h3 className={`font-semibold text-lg transition-colors duration-300 ${
                              isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                            }`}>
                              {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                            </h3>
                            <button
                              type="button"
                              onClick={() => navigateMonth('next')}
                              className={`p-2 rounded-lg transition-colors duration-300 cursor-pointer ${
                                isDarkMode
                                  ? "hover:bg-gray-700/50 text-gray-300"
                                  : "hover:bg-[#0F7ACC]/10 text-[#0B5A99]"
                              }`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>

                          {/* Day Names Header */}
                          <div className="grid grid-cols-7 gap-1 mb-2">
                            {dayNames.map((day) => (
                              <div
                                key={day}
                                className={`text-center text-sm font-medium py-2 transition-colors duration-300 ${
                                  isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                                }`}
                              >
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Calendar Days */}
                          <div className="grid grid-cols-7 gap-1">
                            {/* Empty cells for days before month starts */}
                            {Array.from({ length: getFirstDayOfMonth(calendarDate) }).map((_, index) => (
                              <div key={`empty-${index}`} className="h-10"></div>
                            ))}
                            
                            {/* Days of the month */}
                            {Array.from({ length: getDaysInMonth(calendarDate) }).map((_, index) => {
                              const day = index + 1;
                              const currentDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
                              const isSelected = selectedDate && isSameDate(currentDate, selectedDate);
                              const isTodayDate = isToday(currentDate);
                              const isPast = isPastDate(currentDate);

                              return (
                                <button
                                  key={day}
                                  type="button"
                                  onClick={() => !isPast && handleDateSelect(currentDate)}
                                  disabled={isPast}
                                  className={`h-10 w-10 text-sm rounded-lg transition-all duration-200 ${
                                    isPast
                                      ? isDarkMode
                                        ? "text-gray-600 cursor-not-allowed"
                                        : "text-gray-400 cursor-not-allowed"
                                      : isSelected
                                      ? isDarkMode
                                        ? "bg-cyan-600 text-white shadow-lg cursor-pointer"
                                        : "bg-[#0F7ACC] text-white shadow-lg cursor-pointer"
                                      : isTodayDate
                                      ? isDarkMode
                                        ? "bg-gray-700/50 text-cyan-400 border border-cyan-400/50 cursor-pointer"
                                        : "bg-[#0F7ACC]/10 text-[#0B5A99] border border-[#0F7ACC]/50 cursor-pointer"
                                      : isDarkMode
                                      ? "text-gray-300 hover:bg-gray-700/50 cursor-pointer"
                                      : "text-[#0B5A99] hover:bg-[#0F7ACC]/10 cursor-pointer"
                                  }`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>

                          {/* Calendar Footer */}
                          <div className="flex justify-between mt-4 pt-3 border-t border-gray-200/20">
                            <button
                              type="button"
                              onClick={() => setShowCalendar(false)}
                              className={`px-4 py-2 text-sm rounded-lg transition-colors duration-300 cursor-pointer ${
                                isDarkMode
                                  ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
                                  : "text-[#0F7ACC] hover:text-[#0B5A99] hover:bg-[#0F7ACC]/10"
                              }`}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const today = new Date();
                                setCalendarDate(today);
                                if (!isPastDate(today)) {
                                  handleDateSelect(today);
                                }
                              }}
                              className={`px-4 py-2 text-sm rounded-lg transition-colors duration-300 cursor-pointer ${
                                isDarkMode
                                  ? "bg-cyan-600 text-white hover:bg-cyan-700"
                                  : "bg-[#0F7ACC] text-white hover:bg-[#0B5A99]"
                              }`}
                            >
                              Today
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                    }`}
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newTrip.duration}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, duration: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 ${
                      isDarkMode
                        ? "border-gray-600/30 focus:ring-cyan-500/50 bg-gray-700/50 text-gray-200 placeholder-gray-400"
                        : "border-[#0F7ACC]/30 focus:ring-[#0F7ACC]/50 bg-white text-[#0B5A99] placeholder-[#0F7ACC]"
                    }`}
                    placeholder="e.g., 5 days"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                    }`}
                  >
                    Budget
                  </label>
                  <input
                    type="text"
                    value={newTrip.budget}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, budget: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 ${
                      isDarkMode
                        ? "border-gray-600/30 focus:ring-cyan-500/50 bg-gray-700/50 text-gray-200 placeholder-gray-400"
                        : "border-[#0F7ACC]/30 focus:ring-[#0F7ACC]/50 bg-white text-[#0B5A99] placeholder-[#0F7ACC]"
                    }`}
                    placeholder="e.g., ₹15,000 - ₹25,000"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                    }`}
                  >
                    Max Travelers
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newTrip.maxTravelers}
                      readOnly
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 cursor-pointer ${
                        isDarkMode
                          ? "border-gray-600/30 focus:ring-cyan-500/50 bg-gray-700/50 text-gray-200"
                          : "border-[#0F7ACC]/30 focus:ring-[#0F7ACC]/50 bg-white text-[#0B5A99]"
                      }`}
                    />
                    <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                      <button
                        type="button"
                        onClick={incrementMaxTravelers}
                        disabled={newTrip.maxTravelers >= 20}
                        className={`flex-1 px-1 rounded-t border-l transition-colors duration-300 ${
                          newTrip.maxTravelers >= 20
                            ? isDarkMode
                              ? "bg-gray-800 text-gray-500 border-gray-600/30 cursor-not-allowed"
                              : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                            : isDarkMode
                            ? "bg-gray-600 text-gray-200 border-gray-500/30 hover:bg-gray-500 cursor-pointer"
                            : "bg-[#0F7ACC] text-white border-[#0B5A99] hover:bg-[#0B5A99] cursor-pointer"
                        }`}
                      >
                        <ChevronUp className="w-3 h-3 mx-auto" />
                      </button>
                      <button
                        type="button"
                        onClick={decrementMaxTravelers}
                        disabled={newTrip.maxTravelers <= 1}
                        className={`flex-1 px-1 rounded-b border-l border-t transition-colors duration-300 ${
                          newTrip.maxTravelers <= 1
                            ? isDarkMode
                              ? "bg-gray-800 text-gray-500 border-gray-600/30 cursor-not-allowed"
                              : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                            : isDarkMode
                            ? "bg-gray-600 text-gray-200 border-gray-500/30 hover:bg-gray-500 cursor-pointer"
                            : "bg-[#0F7ACC] text-white border-[#0B5A99] hover:bg-[#0B5A99] cursor-pointer"
                        }`}
                      >
                        <ChevronDown className="w-3 h-3 mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                  }`}
                >
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {newTrip.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1.5 rounded-full text-sm flex items-center space-x-2 border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-cyan-500/20 text-gray-300 border-cyan-500/30"
                          : "bg-[#0F7ACC]/20 text-[#0B5A99] border-[#0F7ACC]/30"
                      }`}
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className={`transition-colors cursor-pointer ${
                          isDarkMode
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-[#0F7ACC] hover:text-[#0B5A99]"
                        }`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="tag-input"
                      placeholder="Type a tag and press Enter or click Add..."
                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 ${
                        isDarkMode
                          ? "border-gray-600/30 focus:ring-cyan-500/50 bg-gray-700/50 text-gray-200 placeholder-gray-400"
                          : "border-[#0F7ACC]/30 focus:ring-[#0F7ACC]/50 bg-white text-[#0B5A99] placeholder-[#0F7ACC]"
                      }`}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          const tagValue = input.value.trim();
                          if (tagValue) {
                            addTag(tagValue);
                            input.value = "";
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById(
                          "tag-input"
                        ) as HTMLInputElement;
                        const tagValue = input.value.trim();
                        if (tagValue) {
                          addTag(tagValue);
                          input.value = "";
                        }
                      }}
                      disabled={newTrip.tags.length >= MAX_TAGS}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                        newTrip.tags.length >= MAX_TAGS
                          ? isDarkMode
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : isDarkMode
                          ? "bg-cyan-600 text-white hover:bg-cyan-700"
                          : "bg-[#0B5A99] text-white hover:bg-[#331D2C]"
                      }`}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span
                      className={`text-xs font-medium ${
                        isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                      }`}
                    >
                      Quick tags:
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full border ${
                        newTrip.tags.length >= MAX_TAGS
                          ? isDarkMode
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : "bg-red-100 text-red-600 border-red-200"
                          : isDarkMode
                          ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                          : "bg-[#0F7ACC]/10 text-[#0B5A99] border-[#0F7ACC]/30"
                      }`}
                    >
                      {newTrip.tags.length}/{MAX_TAGS} tags
                    </span>
                    {[
                      "Beach",
                      "Mountains",
                      "Adventure",
                      "Culture",
                      "Food",
                      "Photography",
                      "Nature",
                      "Wildlife",
                      "Backpacking",
                    ].map((quickTag) => (
                      <button
                        key={quickTag}
                        type="button"
                        onClick={() => addTag(quickTag)}
                        disabled={
                          newTrip.tags.includes(quickTag) ||
                          newTrip.tags.length >= MAX_TAGS
                        }
                        className={`px-2 py-1 text-xs rounded-full border transition-colors cursor-pointer ${
                          newTrip.tags.includes(quickTag)
                            ? isDarkMode
                              ? "bg-gray-700/50 text-gray-500 border-gray-600/30 cursor-not-allowed"
                              : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                            : newTrip.tags.length >= MAX_TAGS
                            ? isDarkMode
                              ? "bg-red-500/10 text-red-400 border-red-500/30 cursor-not-allowed"
                              : "bg-red-50 text-red-400 border-red-200 cursor-not-allowed"
                            : isDarkMode
                            ? "bg-gray-700/30 text-gray-300 border-gray-600/30 hover:bg-gray-700/50"
                            : "bg-white/50 text-[#0B5A99] border-[#0F7ACC]/30 hover:bg-[#0F7ACC]/10"
                        }`}
                      >
                        {quickTag}
                      </button>
                    ))}
                  </div>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                    }`}
                  >
                    <Lightbulb className="inline w-3 h-3 mr-1" /> Press Enter after typing or use quick tags above. You can
                    add up to {MAX_TAGS} tags to help others find your trip!
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 space-x-3">
                <button
                  onClick={() => setShowCreateTrip(false)}
                  className="px-4 py-2 text-[#0F7ACC] hover:text-[#0B5A99] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTrip}
                  className="px-6 py-2 bg-[#0F7ACC] text-white rounded-lg hover:bg-[#0B5A99] transition-colors cursor-pointer"
                >
                  Create Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMobileSidebar && (
        <div
          className={`fixed inset-0 z-50 ${isDarkMode ? "bg-black" : "bg-black/30 backdrop-blur-sm"} lg:hidden`}
          style={{ touchAction: "none" }}
        >
          <div className="flex h-full">
            <div
              className="flex-1"
              onClick={() => setShowMobileSidebar(false)}
            ></div>

            <div
              ref={mobileSidebarRef}
              className={`w-80 max-w-[calc(100vw-2rem)] shadow-2xl h-full flex flex-col animate-slide-in-right transition-colors duration-300`}
              style={{
                touchAction: "auto",
                background: isDarkMode
                  ? "rgb(4, 8, 18)"
                  : "rgba(255,255,255,0.98)",
                borderLeft: isDarkMode ? "2px solid rgba(107,114,128,0.25)" : "2px solid rgba(15,122,204,0.10)",
              }}
            >
              <div
                className={`flex-shrink-0 p-6 border-b text-white transition-colors duration-300 ${
                  isDarkMode
                    ? "border-gray-700/20 bg-gradient-to-r from-gray-800 to-gray-900"
                    : "border-[#0F7ACC]/20 bg-gradient-to-r from-[#0B5A99] to-[#5A4A5A]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Explore</h2>
                  <button
                    onClick={() => setShowMobileSidebar(false)}
                    className="p-2 transition-colors rounded-full cursor-pointer hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#0F7ACC]/50 scrollbar-track-transparent min-h-0">
                <div className="min-h-full p-6 pb-8 space-y-6">
                  <div>
                    <h3
                      className={`text-lg font-bold mb-4 flex items-center transition-colors duration-300 ${
                        isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                      }`}
                    >
                      <MapPin
                        className={`w-5 h-5 mr-2 transition-colors duration-300 ${
                          isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"
                        }`}
                      />
                      Trending Destinations
                    </h3>
                    <div className="space-y-3">
                      {popularDestinations.map((dest, index) => (
                        <button
                          key={dest.name}
                          onClick={() => scrollToDestination(dest.name)}
                          className={`flex items-center justify-between w-full p-3 transition-colors cursor-pointer rounded-xl group ${
                            isDarkMode
                              ? "bg-gray-700/50 hover:bg-gray-700/70"
                              : "bg-white/50 hover:bg-white/70"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                index === 0
                                  ? "bg-yellow-500"
                                  : index === 1
                                  ? "bg-gray-400"
                                  : "bg-orange-500"
                              }`}
                            ></div>
                            <span
                              className={`font-medium transition-colors duration-300 ${
                                isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                              }`}
                            >
                              {dest.name}
                            </span>
                          </div>
                          <span
                            className={`text-sm transition-colors ${
                              isDarkMode
                                ? "text-gray-400 group-hover:text-gray-200"
                                : "text-[#0F7ACC] group-hover:text-[#0B5A99]"
                            }`}
                          >
                            {dest.count} trips
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`text-lg font-bold mb-4 flex items-center transition-colors duration-300 ${
                        isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                      }`}
                    >
                      <Users
                        className={`w-5 h-5 mr-2 transition-colors duration-300 ${
                          isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"
                        }`}
                      />
                      Community Stats
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                          }`}
                        >
                          This Month
                        </span>
                        <span
                          className={`font-bold transition-colors duration-300 ${
                            isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                          }`}
                        >
                          +{randomStats.monthlyTrips} trips
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                          }`}
                        >
                          Active Now
                        </span>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span
                            className={`font-bold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                            }`}
                          >
                            {randomStats.activeUsers} users
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                          }`}
                        >
                          Success Rate
                        </span>
                        <span className="font-bold text-green-600">94%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`text-lg font-bold mb-4 flex items-center transition-colors duration-300 ${
                        isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                      }`}
                    >
                      <Bell
                        className={`w-5 h-5 mr-2 transition-colors duration-300 ${
                          isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"
                        }`}
                      />
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          action: "joined",
                          user: "Priya",
                          trip: "Goa Beach",
                          time: "2h ago",
                        },
                        {
                          action: "created",
                          user: "Rahul",
                          trip: "Himalayan Trek",
                          time: "4h ago",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className={`flex items-start p-3 space-x-3 transition-colors rounded-xl ${
                            isDarkMode
                              ? "bg-gray-700/30 hover:bg-gray-700/50"
                              : "bg-white/30 hover:bg-white/50"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-2 transition-colors duration-300 ${
                              isDarkMode ? "bg-cyan-400" : "bg-[#0F7ACC]"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <p
                              className={`text-sm transition-colors duration-300 ${
                                isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                              }`}
                            >
                              <span className="font-medium">
                                {activity.user}
                              </span>{" "}
                              {activity.action}{" "}
                              <span className="font-medium">
                                {activity.trip}
                              </span>
                            </p>
                            <p
                              className={`text-xs transition-colors duration-300 ${
                                isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                              }`}
                            >
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`rounded-2xl p-6 relative overflow-hidden transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gradient-to-br from-cyan-500/10 to-gray-700/10"
                        : "bg-gradient-to-br from-[#0F7ACC]/10 to-[#0B5A99]/10"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold mb-4 flex items-center transition-colors duration-300 ${
                        isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-lg transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gradient-to-br from-cyan-500 to-cyan-700"
                            : "bg-gradient-to-br from-[#0F7ACC] to-[#0B5A99]"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      Travel Tip
                    </h3>
                    <p
                      className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-300" : "text-[#0B5A99]"
                      }`}
                    >
                      &ldquo;Book accommodations 2-3 weeks in advance for the best
                      deals. Popular destinations fill up quickly during peak
                      seasons!&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <div
                        className={`text-xs px-3 py-1 rounded-full border transition-colors duration-300 ${
                          isDarkMode
                            ? "text-white bg-cyan-500/10 border-cyan-500/20"
                            : "text-[#0F7ACC] bg-[#0F7ACC]/10 border-[#0F7ACC]/20"
                        }`}
                      >
                        <Lightbulb className="inline w-3 h-3 mr-1" /> Tip #{randomStats.tipNumber} of 100
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-300 ${
                          isDarkMode ? "bg-cyan-400" : "bg-[#0F7ACC]"
                        }`}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-[#0B5A99]"
                      }`}
                    >
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setShowCreateTrip(true);
                          setShowMobileSidebar(false);
                        }}
                        className={`w-full p-3 text-white rounded-xl hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                          isDarkMode
                            ? "bg-gradient-to-r from-cyan-600 to-cyan-700"
                            : "bg-gradient-to-r from-[#0F7ACC] to-[#0B5A99]"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Create Trip</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView !== "tripDetail" && (
        <div
          className={`relative transition-colors duration-300 min-h-[520px] flex items-center justify-center overflow-hidden ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          {isDarkMode ? (
            <>
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#101c2c] via-[#16243a] to-[#18344a] opacity-100" />
              <div className="absolute inset-0 z-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
              <div className="absolute left-[-10%] top-[-10%] w-[400px] h-[400px] bg-cyan-900 rounded-full blur-3xl opacity-30 z-0" />
              <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-cyan-800 rounded-full blur-3xl opacity-20 z-0" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-800 via-blue-700 to-teal-800 opacity-95" />
              <div className="absolute left-[-10%] top-[-10%] w-[400px] h-[400px] bg-blue-600 rounded-full blur-3xl opacity-40 z-0" />
              <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-teal-400 rounded-full blur-3xl opacity-30 z-0" />
            </>
          )}
          <div className="w-full px-4 py-20 mx-auto max-w-7xl z-10 relative flex flex-col items-center justify-center">
            <div className="mb-8 flex justify-center">
              <span className={`px-6 py-2 rounded-full border text-base font-semibold tracking-wide shadow-lg backdrop-blur-md ${isDarkMode ? "bg-[#18263a]/80 border-[#2e415a] text-white/90" : "bg-white/10 border-white/20 text-white/90"}`}>
                <span>Explore</span>
                <span className="mx-2 text-white/40">•</span>
                <span>Connect</span>
                <span className="mx-2 text-white/40">•</span>
                <span>Adventure</span>
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight mb-2 drop-shadow-xl text-white">
              Discover Your Next
              </h1>
            <h2 className={`text-4xl sm:text-6xl md:text-7xl font-extrabold text-center mb-6 bg-clip-text text-transparent drop-shadow-xl ${isDarkMode ? "bg-gradient-to-r from-[#3ee7fa] via-[#3ecbfa] to-[#3ecbfa]" : "bg-gradient-to-r from-teal-200  to-cyan-200"}`}>
              Adventure
            </h2>
            <p className={`text-lg sm:text-xl md:text-2xl text-center max-w-2xl mx-auto mb-12 ${isDarkMode ? "text-gray-300" : "text-white"}`}>
              Connect with fellow travelers and explore the world together. Create memories that last a lifetime.
              </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto">
              <div className={`flex flex-col items-center justify-center rounded-2xl p-8 shadow-lg backdrop-blur-md border ${isDarkMode ? "bg-[#1a2636]/90 border-[#2e415a]" : "bg-white/10 border-white/20"}`}>
                <div className="text-4xl font-extrabold mb-2 text-white">{travelStats.totalTrips}</div>
                <div className={`text-base font-semibold mb-2 text-white`}>Total Trips</div>
                <div className="w-12 h-1 rounded-full mt-2" style={{background: isDarkMode ? "#3ee7fa" : "rgba(34,211,238,0.8)"}} />
            </div>
              <div className={`flex flex-col items-center justify-center rounded-2xl p-8 shadow-lg backdrop-blur-md border ${isDarkMode ? "bg-[#1a2636]/90 border-[#2e415a]" : "bg-white/10 border-white/20"}`}>
                <div className="text-4xl font-extrabold mb-2 text-white">{travelStats.activeUsers}</div>
                <div className={`text-base font-semibold mb-2 text-white`}>Active Users</div>
                <div className="w-12 h-1 rounded-full mt-2" style={{background: isDarkMode ? "#3ee7fa" : "rgba(34,211,238,0.8)"}} />
                </div>
              <div className={`flex flex-col items-center justify-center rounded-2xl p-8 shadow-lg backdrop-blur-md border ${isDarkMode ? "bg-[#1a2636]/90 border-[#2e415a]" : "bg-white/10 border-white/20"}`}>
                <div className="text-4xl font-extrabold mb-2 text-white">{travelStats.totalTravelers}</div>
                <div className={`text-base font-semibold mb-2 text-white`}>Total Travelers</div>
                <div className="w-12 h-1 rounded-full mt-2" style={{background: isDarkMode ? "#3ee7fa" : "rgba(34,211,238,0.8)"}} />
              </div>
              <div className={`flex flex-col items-center justify-center rounded-2xl p-8 shadow-lg backdrop-blur-md border ${isDarkMode ? "bg-[#1a2636]/90 border-[#2e415a]" : "bg-white/10 border-white/20"}`}>
                <div className="text-4xl font-extrabold mb-2 text-white">{travelStats.upcomingTrips}</div>
                <div className={`text-base font-semibold mb-2 text-white`}>Upcoming Trips</div>
                <div className="w-12 h-1 rounded-full mt-2" style={{background: isDarkMode ? "#3ee7fa" : "rgba(34,211,238,0.8)"}} />
                </div>
              </div>
          </div>
        </div>
      )}

      <main className="w-full px-4 py-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {currentView !== "tripDetail" && (
            <aside className="sticky hidden space-y-6 lg:block lg:col-span-3 top-24 h-fit">
              {/* LEFT SIDEBAR: Trending Destinations & Community Stats */}
              <div
                className={`p-6 border shadow-lg backdrop-blur-lg rounded-2xl transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/60 border-gray-700/50"
                    : "bg-white border border-blue-100"
                }`}
              >
                <h3
                  className={`text-lg font-bold mb-4 flex items-center transition-colors duration-300 ${
                    isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                  }`}
                >
                  <MapPin
                    className={`w-5 h-5 mr-2 transition-colors duration-300 ${
                      isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"
                    }`}
                  />
                  Trending Destinations
                </h3>
                <div className="space-y-3">
                  {popularDestinations.map((dest, index) => (
                    <button
                      key={dest.name}
                      onClick={() => scrollToDestination(dest.name)}
                      className={`flex items-center justify-between w-full p-3 transition-colors cursor-pointer rounded-xl group ${
                        isDarkMode
                          ? "bg-gray-700/50 hover:bg-gray-700/70"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                              ? "bg-gray-400"
                              : "bg-orange-500"
                          }`}
                        ></div>
                        <span
                          className={`font-medium transition-colors duration-300 ${
                            isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                          }`}
                        >
                          {dest.name}
                        </span>
                      </div>
                      <span
                        className={`text-sm transition-colors ${
                          isDarkMode
                            ? "text-gray-400 group-hover:text-gray-200"
                            : "text-[#0F7ACC] group-hover:text-[#0B5A99]"
                        }`}
                      >
                        {dest.count} trips
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`p-6 border shadow-lg backdrop-blur-lg rounded-2xl transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/60 border-gray-700/50"
                    : "bg-white border border-blue-100"
                }`}
              >
                <h3
                  className={`text-lg font-bold mb-4 flex items-center transition-colors duration-300 ${
                    isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                  }`}
                >
                  <Users
                    className={`w-5 h-5 mr-2 transition-colors duration-300 ${
                      isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"
                    }`}
                  />
                  Community Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                      }`}
                    >
                      This Month
                    </span>
                    <span
                      className={`font-bold transition-colors duration-300 ${
                        isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                      }`}
                    >
                      +{randomStats.monthlyTrips} trips
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                      }`}
                    >
                      Active Now
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span
                        className={`font-bold transition-colors duration-300 ${
                          isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                        }`}
                      >
                        {randomStats.activeUsers} users
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                      }`}
                    >
                      Success Rate
                    </span>
                    <span className="font-bold text-green-600">94%</span>
                  </div>
                </div>
              </div>
            </aside>
          )}

          <div
            className={
              currentView === "tripDetail"
                ? "col-span-1 lg:col-span-12"
                : "col-span-1 lg:col-span-6"
            }
          >
            {currentView === "tripDetail" && selectedTrip ? (
              <div className="space-y-6">
                <div className="flex items-center mb-6 space-x-4">
                  <button
                    onClick={() => {
                      if (selectedTrip.user.id === currentUser.id) {
                        handleBackToMyTrips();
                      } else {
                        handleBackToFeed();
                      }
                    }}
                    className={`flex items-center px-4 py-2 space-x-2 transition-all rounded-full cursor-pointer backdrop-blur-lg ${
                      isDarkMode
                        ? "bg-gray-800/60 hover:bg-gray-800/80"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                  >
                    <ArrowLeft
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                      }`}
                    />
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                      }`}
                    >
                      Back
                    </span>
                  </button>
                  <div className="flex-1">
                    <h1
                      className={`text-2xl font-bold transition-colors duration-300 ${
                        isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                      }`}
                    >
                      {selectedTrip.destination}
                    </h1>
                    <p
                      className={`transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                      }`}
                    >
                      {selectedTrip.state}
                    </p>
                  </div>
                </div>

                <div
                  className={`overflow-hidden border shadow-lg backdrop-blur-lg rounded-3xl transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/60 border-gray-700/50"
                      : "bg-white border border-blue-100"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={selectedTrip.image || "/placeholder.svg"}
                      alt={selectedTrip.destination}
                      className="object-cover w-full h-64 md:h-96"
                    />
                    <div className="absolute top-4 right-4 flex flex-col items-center">
                      {selectedTrip.currentTravelers >=
                      selectedTrip.maxTravelers ? (
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full shadow-lg">
                          Full
                        </span>
                      ) : selectedTrip.hasJoined ? (
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full shadow-lg">
                          Joined
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full shadow-lg">
                          Open
                        </span>
                      )}
                      <button
                        onClick={() => handleShare(selectedTrip.id)}
                        className={`mt-1 p-1 transition-all rounded-full cursor-pointer border ${
                          isDarkMode
                            ? "bg-gray-800/80 border-gray-700 hover:bg-gray-700/80"
                            : "bg-white/80 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <Share2
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isDarkMode ? "text-gray-300" : "text-[#0F7ACC]"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={selectedTrip.user.avatar || "/placeholder.svg"}
                          alt={selectedTrip.user.name}
                          className="object-cover w-12 h-12 border-2 rounded-full border-white/60"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3
                              className={`font-semibold transition-colors duration-300 ${
                                isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                              }`}
                            >
                              {selectedTrip.user.name}
                            </h3>
                            {selectedTrip.user.verified && (
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                  isDarkMode
                                    ? "bg-cyan-500"
                                    : "bg-[#0F7ACC]"
                                }`}
                              >
                                <Check className="w-2 h-2 text-white" />
                              </div>
                            )}
                          </div>
                          <p
                            className={`text-sm transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            {selectedTrip.postedAt}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h2
                        className={`text-2xl font-bold tracking-wide mb-4 transition-colors duration-300 ${
                          isDarkMode ? "text-gray-100" : "text-[#0B5A99]"
                        }`}
                      >
                        {selectedTrip.destination}, {selectedTrip.state}
                      </h2>
                      <p
                        className={`leading-relaxed text-lg transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-[#0B5A99]"
                        }`}
                      >
                        {selectedTrip.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                      <div
                        className={`p-6 border backdrop-blur-sm rounded-2xl transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-white/10 border-white/60"
                            : "bg-[#f3f6fa] border-white/60"
                        }`}
                      >
                        <div className="flex items-center mb-3 space-x-3">
                          <Calendar
                            className={`w-4 h-4 ${isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"}`}
                          />
                          <span
                            className={`font-semibold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                            }`}
                          >
                            Departure
                          </span>
                        </div>
                        <p
                          className={`transition-colors duration-300 ${
                            isDarkMode ? "text-gray-300" : "text-[#0B5A99]"
                          }`}
                        >
                          {new Date(
                            selectedTrip.departureDate
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div
                        className={`p-6 border backdrop-blur-sm rounded-2xl transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-white/10 border-white/60"
                            : "bg-[#f3f6fa] border-white/60"
                        }`}
                      >
                        <div className="flex items-center mb-3 space-x-3">
                          <Clock
                            className={`w-4 h-4 ${isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"}`}
                          />
                          <span
                            className={`font-semibold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                            }`}
                          >
                            Duration
                          </span>
                        </div>
                        <p
                          className={`transition-colors duration-300 ${
                            isDarkMode ? "text-gray-300" : "text-[#0B5A99]"
                          }`}
                        >
                          {selectedTrip.duration}
                        </p>
                      </div>
                      <div
                        className={`p-6 border backdrop-blur-sm rounded-2xl transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-white/10 border-white/60"
                            : "bg-[#f3f6fa] border-white/60"
                        }`}
                      >
                        <div className="flex items-center mb-3 space-x-3">
                          <DollarSign
                            className={`w-4 h-4 ${isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"}`}
                          />
                          <span
                            className={`font-semibold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                            }`}
                          >
                            Budget
                          </span>
                        </div>
                        <p
                          className={`transition-colors duration-300 ${
                            isDarkMode ? "text-gray-300" : "text-[#0B5A99]"
                          }`}
                        >
                          {formatBudget(selectedTrip.budget)}
                        </p>
                      </div>
                      <div
                        className={`p-6 border backdrop-blur-sm rounded-2xl transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-white/10 border-white/60"
                            : "bg-[#f3f6fa] border-white/60"
                        }`}
                      >
                        <div className="flex items-center mb-3 space-x-3">
                          <UserPlus
                            className={`w-4 h-4 ${isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"}`}
                          />
                          <span
                            className={`font-semibold transition-colors duration-300 ${
                              isDarkMode ? "text-gray-200" : "text-[#0B5A99]"
                            }`}
                          >
                            Travelers
                          </span>
                        </div>
                        <p
                          className={`mb-3 transition-colors duration-300 ${
                            isDarkMode ? "text-gray-300" : "text-[#0B5A99]"
                          }`}
                        >
                          {selectedTrip.currentTravelers}/
                          {selectedTrip.maxTravelers} joined
                        </p>
                        <div
                          className={`w-full rounded-full h-3 transition-colors duration-300 ${
                            isDarkMode ? "bg-gray-600/20" : "bg-[#0F7ACC]/20"
                          }`}
                        >
                          <div
                            className={`h-3 rounded-full transition-all duration-500 ${
                              isDarkMode
                                ? "bg-cyan-600"
                                : "bg-cyan-600"
                            }`}
                            style={{
                              width: `${
                                (selectedTrip.currentTravelers /
                                  selectedTrip.maxTravelers) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-8">
                      {selectedTrip.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-4 py-2 rounded-full font-medium border transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-cyan-500/20 text-gray-300 border-cyan-500/30"
                              : "bg-[#0F7ACC]/20 text-[#0B5A99] border-[#0F7ACC]/30"
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`flex sm:flex-row flex-col gap-4 sm:gap-0 items-center justify-between mb-8 pb-6 border-b transition-colors duration-300 ${
                        isDarkMode
                          ? "border-gray-600/20"
                          : "border-[#0F7ACC]/20"
                      }`}
                    >
                      <div className="flex items-center space-x-8">
                        <button
                          onClick={() => handleLike(selectedTrip.id)}
                          className={`flex items-center space-x-3 transition-all cursor-pointer ${
                            isDarkMode
                              ? "text-gray-400 hover:text-gray-200"
                              : "text-[#0F7ACC] hover:text-[#0B5A99]"
                          }`}
                        >
                          <Heart
                            className={`w-6 h-6 ${
                              selectedTrip.isLiked
                                ? "fill-red-500 text-red-500"
                                : ""
                            }`}
                          />
                          <span className="text-lg font-semibold">
                            {selectedTrip.likes}
                          </span>
                        </button>
                        <button
                          onClick={() => toggleComments(selectedTrip.id)}
                          className={`flex items-center space-x-3 transition-all cursor-pointer ${
                            isDarkMode
                              ? "text-gray-400 hover:text-gray-200"
                              : "text-[#0F7ACC] hover:text-[#0B5A99]"
                          }`}
                        >
                          <MessageCircle className="w-6 h-6" />
                          <span className="text-lg font-semibold">
                            {selectedTrip.comments.length}
                          </span>
                        </button>
                      </div>

                      {selectedTrip.user.id === currentUser.id ? (
                        <div
                          className={`px-8 py-4 rounded-full font-semibold text-lg ${
                            isDarkMode
                              ? "bg-cyan-600 text-white"
                              : "bg-[#0F7ACC] text-white"
                          }`}
                        >
                          Your Trip
                        </div>
                      ) : (
                        <button
                          onClick={() => handleJoin(selectedTrip.id)}
                          disabled={
                            selectedTrip.currentTravelers >=
                              selectedTrip.maxTravelers ||
                            selectedTrip.hasJoined
                          }
                          className={`px-8 py-4 rounded-full font-semibold transition-all cursor-pointer text-lg ${
                            selectedTrip.hasJoined
                              ? "bg-[#0F7ACC] text-white cursor-default"
                              : selectedTrip.currentTravelers >=
                                selectedTrip.maxTravelers
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-[#0F7ACC] text-white hover:bg-[#0B5A99] shadow-lg hover:shadow-xl"
                          }`}
                        >
                          {selectedTrip.hasJoined
                            ? "Joined"
                            : selectedTrip.currentTravelers >=
                              selectedTrip.maxTravelers
                            ? "Trip Full"
                            : "Join Trip"}
                        </button>
                      )}
                    </div>

                    {expandedComments === selectedTrip.id && (
                      <div className="min-w-0 w-full">
                        <div className="flex min-w-0 w-full mb-6 space-x-3">
                          <img
                            src={currentUser.avatar || "/placeholder.svg"}
                            alt={currentUser.name}
                            className="object-cover w-8 h-8 md:w-10 md:h-10 rounded-full"
                          />
                          <div className="flex flex-1 min-w-0 w-full space-x-3">
                            <input
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Write a comment..."
                              className={`flex-1 min-w-0 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors duration-300 ${
                                isDarkMode
                                  ? "border-gray-600/30 focus:ring-cyan-500/50 bg-gray-700/50 text-gray-200 placeholder-gray-400"
                                  : "border-[#0F7ACC]/30 focus:ring-[#0F7ACC]/50 bg-white/50 text-[#0B5A99] placeholder-[#0F7ACC]"
                              }`}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleComment(selectedTrip.id);
                                }
                              }}
                            />
                            <button
                              onClick={() => handleComment(selectedTrip.id)}
                              className={`px-2 py-1 md:px-4 md:py-2 text-white rounded-xl transition-colors cursor-pointer ${
                                isDarkMode
                                  ? "bg-cyan-600 hover:bg-cyan-700"
                                  : "bg-[#0F7ACC] hover:bg-[#0B5A99]"
                              }`}
                            >
                              <Send className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {selectedTrip.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="flex items-start space-x-4"
                            >
                              <img
                                src={comment.user.avatar || "/placeholder.svg"}
                                alt={comment.user.name}
                                className="object-cover w-8 h-8 md:w-10 md:h-10 rounded-full"
                              />
                              <div className="flex-1">
                                <div
                                  className={`p-4 rounded-xl transition-colors duration-300 ${
                                    isDarkMode
                                      ? "bg-gray-700/70 border border-gray-500/20"
                                      : "bg-white/70 border border-[#0F7ACC]/20"
                                  }`}
                                >
                                  <div className="flex items-center mb-2 space-x-3">
                                    <span
                                      className={`font-semibold transition-colors duration-300 ${
                                        isDarkMode
                                          ? "text-gray-200"
                                          : "text-[#0B5A99]"
                                      }`}
                                    >
                                      {comment.user.name}
                                    </span>
                                    <span
                                      className={`text-sm transition-colors duration-300 ${
                                        isDarkMode
                                          ? "text-gray-400"
                                          : "text-[#0F7ACC]"
                                      }`}
                                    >
                                      {comment.timestamp}
                                    </span>
                                  </div>
                                  <p
                                    className={`transition-colors duration-300 ${
                                      isDarkMode
                                        ? "text-gray-300"
                                        : "text-[#0B5A99]"
                                    }`}
                                  >
                                    {comment.content}
                                  </p>
                                </div>
                                <div className="flex items-center mt-1 space-x-6">
                                  <button
                                    onClick={() =>
                                      handleCommentLike(
                                        selectedTrip.id,
                                        comment.id
                                      )
                                    }
                                    className={`flex items-center space-x-2 text-sm transition-colors cursor-pointer ${
                                      isDarkMode
                                        ? "text-gray-400 hover:text-gray-200"
                                        : "text-[#0F7ACC] hover:text-[#0B5A99]"
                                    }`}
                                  >
                                    <Heart
                                      className={`w-4 h-4 ml-4 ${
                                        comment.isLiked
                                          ? "fill-red-500 text-red-500"
                                          : ""
                                      }`}
                                    />
                                    <span>{comment.likes}</span>
                                  </button>
                                  <button
                                    onClick={() => setReplyingTo(comment.id)}
                                    className={`text-sm transition-colors cursor-pointer ${
                                      isDarkMode
                                        ? "text-gray-400 hover:text-gray-200"
                                        : "text-[#0F7ACC] hover:text-[#0B5A99]"
                                    }`}
                                  >
                                    Reply
                                  </button>
                                </div>

                                {comment.replies.map((reply) => (
                                  <div
                                    key={reply.id}
                                    className="flex items-start mt-4 ml-8 space-x-3"
                                  >
                                    <img
                                      src={
                                        reply.user.avatar || "/placeholder.svg"
                                      }
                                      alt={reply.user.name}
                                      className="object-cover w-8 h-8 rounded-full"
                                    />
                                    <div className="flex-1">
                                      <div
                                        className={`rounded-xl p-3 border transition-colors duration-300 ${
                                          isDarkMode
                                            ? "bg-gray-600 border-gray-500/20"
                                            : "bg-white border-[#0F7ACC]/20"
                                        }`}
                                      >
                                        <div className="flex items-center mb-1 space-x-2">
                                          <span
                                            className={`font-semibold text-sm transition-colors duration-300 ${
                                              isDarkMode
                                                ? "text-gray-200"
                                                : "text-[#0B5A99]"
                                            }`}
                                          >
                                            {reply.user.name}
                                          </span>
                                          <span
                                            className={`text-xs transition-colors duration-300 ${
                                              isDarkMode
                                                ? "text-gray-400"
                                                : "text-[#0F7ACC]"
                                            }`}
                                          >
                                            {reply.timestamp}
                                          </span>
                                        </div>
                                        <p
                                          className={`text-sm transition-colors duration-300 ${
                                            isDarkMode
                                              ? "text-gray-300"
                                              : "text-[#0B5A99]"
                                          }`}
                                        >
                                          {reply.content}
                                        </p>
                                      </div>
                                      <button
                                        onClick={() =>
                                          handleCommentLike(
                                            selectedTrip.id,
                                            reply.id,
                                            true,
                                            comment.id
                                          )
                                        }
                                        className={`flex items-center space-x-1 text-xs transition-colors mt-2 cursor-pointer ${
                                          isDarkMode
                                            ? "text-gray-400 hover:text-gray-200"
                                            : "text-[#0F7ACC] hover:text-[#0B5A99]"
                                        }`}
                                      >
                                        <Heart
                                          className={`w-3 h-3 ml-4 ${
                                            reply.isLiked
                                              ? "fill-red-500 text-red-500"
                                              : ""
                                          }`}
                                        />
                                        <span>{reply.likes}</span>
                                      </button>
                                    </div>
                                  </div>
                                ))}

                                {replyingTo === comment.id && (
                                  <div className="flex mt-4 ml-8 space-x-3">
                                    <input
                                      type="text"
                                      value={replyText}
                                      onChange={(e) =>
                                        setReplyText(e.target.value)
                                      }
                                      placeholder="Write a reply..."
                                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-colors duration-300 ${
                                        isDarkMode
                                          ? "border-gray-600/30 focus:ring-cyan-500/50 bg-gray-700/50 text-gray-200 placeholder-gray-400"
                                          : "border-[#0F7ACC]/30 focus:ring-[#0F7ACC]/50 bg-white/50 text-[#0B5A99] placeholder-[#0F7ACC]"
                                      }`}
                                      onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                          handleReply(
                                            selectedTrip.id,
                                            comment.id
                                          );
                                        }
                                      }}
                                    />
                                    <button
                                      onClick={() =>
                                        handleReply(selectedTrip.id, comment.id)
                                      }
                                      className={`px-4 py-2 text-white rounded-lg transition-colors cursor-pointer ${
                                        isDarkMode
                                          ? "bg-cyan-600 hover:bg-cyan-700"
                                          : "bg-[#0F7ACC] hover:bg-[#0B5A99]"
                                      }`}
                                    >
                                      <Send className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : currentView === "feed" ? (
              <div>
                {currentView === "feed" && (
                  <div
                    className={`p-4 mb-6 border shadow-lg backdrop-blur-lg rounded-2xl transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/60 border-gray-700/50"
                        : "bg-white/60 border-white/50"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="relative">
                        <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide">
                          <div className="flex space-x-2 min-w-max">
                            {filterOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  if (option.value === "all") {
                                    setSearchQuery("");
                                    setSelectedFilter("all");
                                  } else {
                                    setSelectedFilter(option.value);
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                                  selectedFilter === option.value
                                    ? isDarkMode
                                      ? "bg-cyan-600 text-white shadow-lg"
                                      : "bg-[#0B5A99] text-white shadow-lg"
                                    : isDarkMode
                                    ? "bg-gray-700/60 text-gray-200 hover:bg-gray-700/80"
                                    : "bg-white/60 text-[#0B5A99] hover:bg-[#0F7ACC]/20"
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div
                          className={`absolute top-0 bottom-0 right-0 w-6 pointer-events-none transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gradient-to-l from-gray-800/60 to-transparent"
                              : "bg-gradient-to-l from-white/60 to-transparent"
                          }`}
                        ></div>
                      </div>

                      {(searchQuery.trim() !== "" || selectedFilter !== "all") && (
                        <div className="flex items-center space-x-2 text-xs">
                          <span
                            className={`font-medium transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-[#0F7ACC]"
                            }`}
                          >
                            Active filters:
                          </span>
                          {searchQuery.trim() !== "" && (
                            <span
                              className={`px-2 py-1 rounded-full border transition-colors duration-300 ${
                                isDarkMode
                                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                                  : "bg-[#0F7ACC]/20 text-[#0B5A99] border-[#0F7ACC]/30"
                              }`}
                            >
                              Search: &quot;{searchQuery}&quot;
                            </span>
                          )}
                          {selectedFilter !== "all" && (
                            <span
                              className={`px-2 py-1 rounded-full border transition-colors duration-300 ${
                                isDarkMode
                                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                                  : "bg-[#0F7ACC]/20 text-[#0B5A99] border-[#0F7ACC]/30"
                              }`}
                            >
                              Category: {selectedFilter}
                            </span>
                          )}
                          <button
                            onClick={() => {
                              setSearchQuery("");
                              setSelectedFilter("all");
                            }}
                            className={`px-2 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                              isDarkMode
                                ? "text-gray-400 hover:text-gray-200"
                                : "text-[#0F7ACC] hover:text-[#0B5A99]"
                            }`}
                          >
                            Clear all
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {filteredPosts.length === 0 ? (
                    <div className="py-16 text-center">
                      <div className="mb-6">
                        <div className="w-24 h-24 mx-auto bg-[#0F7ACC]/20 rounded-full flex items-center justify-center mb-4">
                          <MapPin className="w-12 h-12 text-[#0F7ACC]" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#0B5A99] mb-2">
                          No trips found
                        </h3>
                        <p className="text-[#0F7ACC] text-lg mb-6">
                          Try adjusting your search or filters to find more
                          trips
                        </p>
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setSelectedFilter("all");
                          }}
                          className="px-6 py-3 bg-[#0B5A99] text-white rounded-full hover:bg-[#331D2C] transition-colors cursor-pointer"
                        >
                          Clear Filters
                        </button>
                      </div>
                    </div>
                ) : (
                  <div className="space-y-8">
                    {filteredPosts.map((post) => (
                      <article
                        key={post.id}
                        data-destination={post.destination}
                        className={`overflow-hidden transition-all duration-300 border shadow-lg cursor-pointer backdrop-blur-lg rounded-3xl hover:shadow-xl animate-fade-in ${
                          isDarkMode
                            ? "bg-gray-800/60 border-gray-700/50"
                            : "bg-white border border-blue-100"
                        }`}
                        onClick={() => handleTripClick(post)}
                      >
                        <div className="p-6 pb-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={post.user.avatar || "/placeholder.svg"}
                                alt={post.user.name}
                                className="object-cover w-12 h-12 border-2 rounded-full border-white/60"
                              />
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3
                                    className={`font-semibold transition-colors duration-300 ${
                                      isDarkMode
                                        ? "text-gray-200"
                                        : "text-[#0B5A99]"
                                    }`}
                                  >
                                    {post.user.name}
                                  </h3>
                                  {post.user.verified && (
                                    <div
                                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                        isDarkMode
                                          ? "bg-cyan-500"
                                          : "bg-[#0F7ACC]"
                                      }`}
                                    >
                                      <Check className="w-2 h-2 text-white" />
                                    </div>
                                  )}
                                </div>
                                <p
                                  className={`text-sm transition-colors duration-300 ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-[#0F7ACC]"
                                  }`}
                                >
                                  {post.postedAt}
                                </p>
                              </div>
                            </div>
                            <div className="absolute z-10 top-4 right-4 flex flex-col items-center">
                              {post.currentTravelers >= post.maxTravelers ? (
                                <span className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full shadow-lg">
                                  Full
                                </span>
                              ) : post.hasJoined ? (
                                <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full shadow-lg">
                                  Joined
                                </span>
                              ) : (
                                <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full shadow-lg">
                                  Open
                                </span>
                              )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(post.id);
                              }}
                                className="mt-3 p-2 transition-all rounded-full cursor-pointer hover:bg-white/40"
                              >
                                <Share2 className="w-5 h-5 text-[#0F7ACC]" />
                            </button>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center mb-2 space-x-2">
                              <MapPin
                                className={`w-5 h-5 transition-colors duration-300 ${
                                  isDarkMode
                                    ? "text-cyan-400"
                                    : "text-[#0F7ACC]"
                                }`}
                              />
                              <h2
                                className={`text-xl font-bold transition-colors duration-300 ${
                                  isDarkMode
                                    ? "text-gray-200"
                                    : "text-[#0B5A99]"
                                }`}
                              >
                                {post.destination}
                              </h2>
                              <span
                                className={`transition-colors duration-300 ${
                                  isDarkMode
                                    ? "text-gray-400"
                                    : "text-[#0F7ACC]"
                                }`}
                              >
                                , {post.state}
                              </span>
                            </div>
                            <p
                              className={`leading-relaxed line-clamp-2 overflow-hidden text-ellipsis transition-colors duration-300 ${
                                isDarkMode ? "text-gray-300" : "text-[#0B5A99]"
                              }`}
                            >
                              {post.description}
                            </p>
                          </div>
                        </div>

                        <div className="relative">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.destination}
                            className="object-cover w-full h-80"
                          />
                        </div>

                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
                            <div className={`p-4 border backdrop-blur-sm rounded-2xl border-white/60 ${!isDarkMode ? 'bg-[#f3f6fa]' : ''}`}>
                              <div className="flex items-center mb-1 space-x-2">
                                <Calendar
                                  className={`w-4 h-4 ${isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"}`}
                                />
                                <span className="text-sm font-medium text-[#0B5A99]">
                                  Departure
                                </span>
                              </div>
                              <p className="text-sm text-[#0B5A99]">
                                {post.departureDate}
                              </p>
                            </div>
                            <div className={`p-4 border backdrop-blur-sm rounded-2xl border-white/60 ${!isDarkMode ? 'bg-[#f3f6fa]' : ''}`}>
                              <div className="flex items-center mb-1 space-x-2">
                                <span className="text-sm font-medium text-[#0B5A99]">
                                  Duration
                                </span>
                              </div>
                              <p className="text-sm text-[#0B5A99]">
                                {post.duration}
                              </p>
                            </div>
                            <div className={`p-4 border backdrop-blur-sm rounded-2xl border-white/60 ${!isDarkMode ? 'bg-[#f3f6fa]' : ''}`}>
                              <div className="flex items-center mb-1 space-x-2">
                                <span className="text-sm font-medium text-[#0B5A99]">
                                  Budget
                                </span>
                              </div>
                              <p className="text-sm text-[#0B5A99]">
                                {formatBudget(post.budget)}
                              </p>
                            </div>
                            <div className={`p-4 border backdrop-blur-sm rounded-2xl border-white/60 ${!isDarkMode ? 'bg-[#f3f6fa]' : ''}`}>
                              <div className="flex items-center mb-2 space-x-2">
                                <Users
                                  className={`w-4 h-4 ${isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"}`}
                                />
                                <span className="text-sm font-medium text-[#0B5A99]">
                                  Travelers
                                </span>
                              </div>
                              <p className="text-sm text-[#0B5A99] mb-2">
                                {post.currentTravelers}/{post.maxTravelers}
                              </p>
                              <div className="w-full bg-[#0F7ACC]/20 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-[#0B5A99] to-[#0F7ACC] h-2 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${
                                      (post.currentTravelers /
                                        post.maxTravelers) *
                                      100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-300 ${
                                  isDarkMode
                                    ? "bg-cyan-500/20 text-gray-300 border-cyan-500/30"
                                    : "bg-[#0F7ACC]/20 text-[#0B5A99] border-[#0F7ACC]/30"
                                }`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLike(post.id);
                                }}
                                className="flex items-center space-x-2 text-[#0F7ACC] hover:text-[#0B5A99] transition-all cursor-pointer"
                              >
                                <Heart
                                  className={`w-5 h-5 ${
                                    post.isLiked
                                      ? "fill-red-500 text-red-500"
                                      : ""
                                  }`}
                                />
                                <span className="font-medium">
                                  {post.likes}
                                </span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTripClick(post);
                                  setTimeout(
                                    () => toggleComments(post.id),
                                    100
                                  );
                                }}
                                className="flex items-center space-x-2 text-[#0F7ACC] hover:text-[#0B5A99] transition-all cursor-pointer"
                              >
                                <MessageCircle className="w-5 h-5" />
                                <span className="font-medium">
                                  {post.comments.length}
                                </span>
                              </button>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJoin(post.id);
                              }}
                              disabled={
                                post.currentTravelers >= post.maxTravelers ||
                                post.hasJoined
                              }
                              className={`px-6 py-3 rounded-full font-semibold transition-all cursor-pointer ${
                                post.hasJoined
                                  ? "bg-[#0F7ACC] text-white cursor-default"
                                  : post.currentTravelers >= post.maxTravelers
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-[#0F7ACC] text-white hover:bg-[#0B5A99] shadow-lg hover:shadow-xl"
                              }`}
                            >
                              {post.hasJoined
                                ? "Joined"
                                : post.currentTravelers >= post.maxTravelers
                                ? "Trip Full"
                                : "Join Trip"}
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-4xl font-extrabold tracking-wide text-[#0B5A99] mb-6">
                    My Trips
                  </h1>
                  <button
                    onClick={handleFeed}
                    className="px-4 py-2 text-[#0F7ACC] hover:text-[#0B5A99] transition-colors cursor-pointer"
                  >
                    Back to Feed
                  </button>
                </div>
                <div className="space-y-8">
                  {userTrips.length === 0 ? (
                    <div className="py-16 text-center">
                      <div className="mb-8">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#0B5A99] to-[#0F7ACC] rounded-full flex items-center justify-center mb-6 shadow-xl">
                          <Briefcase className="w-16 h-16 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0B5A99] mb-4">
                          Start Your Travel Journey
                        </h3>
                        <p className="text-[#0F7ACC] text-lg mb-8 max-w-md mx-auto">
                          Create your first trip and connect with fellow
                          travelers to explore the world together.
                        </p>
                        <div className="space-y-4">
                          <button
                            onClick={() => setShowCreateTrip(true)}
                            className="px-8 py-4 bg-gradient-to-r from-[#0B5A99] to-[#0F7ACC] text-white rounded-full hover:shadow-lg transition-all font-medium cursor-pointer transform hover:scale-105"
                          >
                            <Plus className="inline w-5 h-5 mr-2" />
                            Create Your First Trip
                          </button>
                          <div className="flex sm:flex-row flex-col justify-center sm:space-x-8 text-sm text-[#0F7ACC]">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>Connect with travelers</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>Explore destinations</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Heart className="w-4 h-4" />
                              <span>Share experiences</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    userTrips.map((post) => (
                      <article
                        key={post.id}
                        data-destination={post.destination}
                        className={`relative w-full overflow-hidden transition-all duration-300 border shadow-lg cursor-pointer bg-white/60 backdrop-blur-lg rounded-3xl border-white/50 hover:shadow-xl animate-fade-in group ${
                          isDarkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border border-blue-100"
                        }`}
                        onClick={() => handleTripClick(post)}
                      >
                        <div className="absolute z-10 top-4 right-4 flex flex-col items-center">
                          {post.currentTravelers >= post.maxTravelers ? (
                            <span className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full shadow-lg">
                              Full
                            </span>
                          ) : post.hasJoined ? (
                            <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full shadow-lg">
                              Joined
                            </span>
                          ) : (
                            <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full shadow-lg">
                              Open
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(post.id);
                            }}
                            className="mt-3 p-2 transition-all rounded-full cursor-pointer hover:bg-white/40"
                          >
                            <Share2 className="w-5 h-5 text-[#0F7ACC]" />
                          </button>
                        </div>
                        <div className="p-6 pb-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={post.user.avatar || "/placeholder.svg"}
                                alt={post.user.name}
                                className="object-cover w-12 h-12 border-2 rounded-full border-white/60"
                              />
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold text-[#0B5A99]">
                                    {post.user.name}
                                  </h3>
                                  {post.user.verified && (
                                    <div className="w-4 h-4 bg-[#0F7ACC] rounded-full flex items-center justify-center">
                                      <Check className="w-2 h-2 text-white" />
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-[#0F7ACC]">
                                  {post.postedAt}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center mb-2 space-x-2">
                              <MapPin className="w-5 h-5 text-[#0F7ACC]" />
                              <h2 className="text-xl font-bold text-[#0B5A99]">
                                {post.destination}
                              </h2>
                              <span className="text-[#0F7ACC]">
                                , {post.state}
                              </span>
                            </div>
                            <p className="text-[#0B5A99] leading-relaxed line-clamp-1 overflow-hidden text-ellipsis">
                              {post.description}
                            </p>
                          </div>
                        </div>

                        <div className="relative overflow-hidden">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.destination}
                            className="object-cover w-full transition-transform duration-500 h-80 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:opacity-100"></div>
                          <div className="absolute text-white transition-opacity duration-300 opacity-0 bottom-4 left-4 group-hover:opacity-100">
                            <p className="text-sm font-medium">
                              Explore {post.destination}
                            </p>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
                            <div className={`p-4 border backdrop-blur-sm rounded-2xl border-white/60 ${!isDarkMode ? 'bg-[#f3f6fa]' : ''}`}>
                              <div className="flex items-center mb-1 space-x-2">
                                <Calendar
                                  className={`w-4 h-4 ${isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"}`}
                                />
                                <span className="text-sm font-medium text-[#0B5A99]">
                                  Departure
                                </span>
                              </div>
                              <p className="text-sm text-[#0B5A99]">
                                {post.departureDate}
                              </p>
                            </div>
                            <div className={`p-4 border backdrop-blur-sm rounded-2xl border-white/60 ${!isDarkMode ? 'bg-[#f3f6fa]' : ''}`}>
                              <div className="flex items-center mb-1 space-x-2">
                                <span className="text-sm font-medium text-[#0B5A99]">
                                  Duration
                                </span>
                              </div>
                              <p className="text-sm text-[#0B5A99]">
                                {post.duration}
                              </p>
                            </div>
                            <div className={`p-4 border backdrop-blur-sm rounded-2xl border-white/60 ${!isDarkMode ? 'bg-[#f3f6fa]' : ''}`}>
                              <div className="flex items-center mb-1 space-x-2">
                                <span className="text-sm font-medium text-[#0B5A99]">
                                  Budget
                                </span>
                              </div>
                              <p className="text-sm text-[#0B5A99]">
                                {formatBudget(post.budget)}
                              </p>
                            </div>
                            <div className={`p-4 border backdrop-blur-sm rounded-2xl border-white/60 ${!isDarkMode ? 'bg-[#f3f6fa]' : ''}`}>
                              <div className="flex items-center mb-2 space-x-2">
                                <Users
                                  className={`w-4 h-4 ${isDarkMode ? "text-cyan-400" : "text-[#0F7ACC]"}`}
                                />
                                <span className="text-sm font-medium text-[#0B5A99]">
                                  Travelers
                                </span>
                              </div>
                              <p className="text-sm text-[#0B5A99] mb-2">
                                {post.currentTravelers}/{post.maxTravelers}
                              </p>
                              <div className="w-full bg-[#0F7ACC]/20 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-[#0B5A99] to-[#0F7ACC] h-2 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${
                                      (post.currentTravelers /
                                        post.maxTravelers) *
                                      100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-300 ${
                                  isDarkMode
                                    ? "bg-cyan-500/20 text-gray-300 border-cyan-500/30"
                                    : "bg-[#0F7ACC]/20 text-[#0B5A99] border-[#0F7ACC]/30"
                                }`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLike(post.id);
                                }}
                                className={`flex items-center space-x-2 transition-all cursor-pointer ${
                                  isDarkMode
                                    ? "text-gray-400 hover:text-gray-200"
                                    : "text-[#0F7ACC] hover:text-[#0B5A99]"
                                }`}
                              >
                                <Heart
                                  className={`w-5 h-5 ${
                                    post.isLiked
                                      ? "fill-red-500 text-red-500"
                                      : ""
                                  }`}
                                />
                                <span className="font-medium">
                                  {post.likes}
                                </span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTripClick(post);
                                  setTimeout(
                                    () => toggleComments(post.id),
                                    100
                                  );
                                }}
                                className={`flex items-center space-x-2 transition-all cursor-pointer ${
                                  isDarkMode
                                    ? "text-gray-400 hover:text-gray-200"
                                    : "text-[#0F7ACC] hover:text-[#0B5A99]"
                                }`}
                              >
                                <MessageCircle className="w-5 h-5" />
                                <span className="font-medium">
                                  {post.comments.length}
                                </span>
                              </button>
                            </div>

                            <div
                              className={`px-6 py-3 rounded-full font-semibold ${
                                isDarkMode
                                  ? "bg-cyan-600 text-white"
                                  : "bg-[#0F7ACC] text-white"
                              }`}
                            >
                              Your Trip
                            </div>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {currentView !== "tripDetail" && (
            <aside className="sticky hidden space-y-6 lg:block lg:col-span-3 top-24 h-fit">
              {/* Travel Tip */}
              <div className={`rounded-2xl p-6 relative overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-gradient-to-br from-cyan-500/10 to-gray-700/10" : "bg-white border border-blue-100"}`}>
                <h3 className={`text-lg font-bold mb-4 flex items-center transition-colors duration-300 ${isDarkMode ? "text-gray-100" : "text-[#0B5A99]"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-lg transition-colors duration-300 ${isDarkMode ? "bg-gradient-to-br from-cyan-500 to-cyan-700" : "bg-[#0F7ACC]"}`}>
                    <Lightbulb className="w-4 h-4 text-white" />
                      </div>
                  Travel Tip
                  </h3>
                <p className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-[#0B5A99]"}`}>
                  &ldquo;Book accommodations 2-3 weeks in advance for the best deals. Popular destinations fill up quickly during peak seasons!&rdquo;
                </p>
                  <div className="flex items-center justify-between">
                  <div className={`text-xs px-3 py-1 rounded-full border transition-colors duration-300 ${isDarkMode ? "text-gray-400 bg-cyan-500/10 border-cyan-500/20" : "text-[#0F7ACC] bg-[#0F7ACC]/10 border-[#0F7ACC]/20"}`}>
                    <Lightbulb className="inline w-3 h-3 mr-1" /> Tip #{randomStats.tipNumber} of 100
                    </div>
                  <div className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-300 ${isDarkMode ? "bg-cyan-400" : "bg-[#0F7ACC]"}`}></div>
                    </div>
                  </div>

              {/* Quick Actions */}
              <div className={`p-6 border shadow-lg backdrop-blur-lg rounded-2xl transition-colors duration-300 ${isDarkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border border-blue-100"}`}>
                <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${isDarkMode ? "text-gray-100" : "text-[#0B5A99]"}`}>Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowCreateTrip(true);
                    }}
                    className={`w-full p-3 text-white rounded-xl hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2 ${isDarkMode ? "bg-gradient-to-r from-cyan-600 to-cyan-700" : "bg-gradient-to-r from-[#0F7ACC] to-[#0B5A99]"}`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Trip</span>
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>

      <footer
        className={`text-white transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-900 to-gray-800"
            : "bg-gradient-to-r from-[#062042] to-[#0B5A99]"
        }`}
      >
        <div className="w-full px-4 py-8 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold tracking-wide mb-2">Yatra</h3>
              <p className="text-sm leading-relaxed text-white/80">
                Connect with fellow travelers and explore the world together.
                Create memories, share experiences, and discover amazing
                destinations.
              </p>
            </div>

            

            

            <div className="space-y-4">
              <h4 className="text-2xl font-bold tracking-wide mb-2">Stay Updated</h4>
              <p className="text-sm text-white/80">
                Get the latest travel tips and destination updates.
              </p>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubscribe();
                      }
                    }}
                    className="flex-1 px-4 py-2 text-white border rounded-lg bg-white/10 border-white/20 placeholder-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={!subscribeEmail.trim()}
                    className="px-6 py-2 bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:opacity-100 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 cursor-pointer border border-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-white/60">
                  By subscribing, you agree to our Privacy Policy and consent to
                  receive updates.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-8 border-t border-white/20">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-white/80">Yatra trips</div>
              
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap");

        .font-mulish {
          font-family: "Mulish", sans-serif;
          font-optical-sizing: auto;
          font-style: normal;
        }

        .dark .bg-card {
          background: rgba(75, 85, 99, 0.6) !important;
        }

        .dark .bg-card-hover {
          background: rgba(75, 85, 99, 0.8) !important;
        }

        .dark .text-primary {
          color: #f3f4f6 !important;
        }

        .dark .text-secondary {
          color: #d1d5db !important;
        }

        .dark .text-muted {
          color: #9ca3af !important;
        }

        .dark .border-primary {
          border-color: rgba(107, 114, 128, 0.3) !important;
        }

        .dark .bg-input {
          background: rgba(55, 65, 81, 0.6) !important;
          border-color: rgba(107, 114, 128, 0.3) !important;
          color: #f3f4f6 !important;
        }

        .dark .bg-input::placeholder {
          color: #9ca3af !important;
        }

        .dark .bg-button-primary {
          background: #0891b2 !important;
        }

        .dark .bg-button-primary:hover {
          background: #0e7490 !important;
        }

        .dark .bg-notification {
          background: rgba(31, 41, 55, 0.95) !important;
          border-color: rgba(107, 114, 128, 0.5) !important;
        }

        .dark .bg-sidebar {
          background: rgba(31, 41, 55, 0.95) !important;
        }

        .dark [class*="text-[#0B5A99]"] {
          color: #f3f4f6 !important;
        }

        .dark [class*="text-[#0F7ACC]"] {
          color: #d1d5db !important;
        }

        .dark [class*="bg-white/60"] {
          background: rgba(75, 85, 99, 0.6) !important;
        }

        .dark [class*="bg-white/95"] {
          background: rgba(31, 41, 55, 0.95) !important;
        }

        .dark [class*="bg-white/50"] {
          background: rgba(75, 85, 99, 0.5) !important;
        }

        .dark [class*="bg-white/30"] {
          background: rgba(55, 65, 81, 0.3) !important;
        }

        .dark [class*="bg-white/70"] {
          background: rgba(75, 85, 99, 0.7) !important;
        }

        .dark [class*="bg-white/40"] {
          background: rgba(55, 65, 81, 0.4) !important;
        }

        .dark [class*="border-[#0F7ACC]"] {
          border-color: rgba(107, 114, 128, 0.3) !important;
        }

        .dark [class*="border-white/50"] {
          border-color: rgba(107, 114, 128, 0.5) !important;
        }

        .dark [class*="border-white/60"] {
          border-color: rgba(107, 114, 128, 0.6) !important;
        }

        .dark [class*="bg-[#0B5A99]"] {
          background: #0e7490 !important;
        }

        .dark [class*="hover:bg-white/40"] {
          background: rgba(55, 65, 81, 0.4) !important;
        }

        .dark [class*="hover:bg-white/70"] {
          background: rgba(75, 85, 99, 0.7) !important;
        }

        .dark [class*="bg-gradient-to-r from-[#0B5A99] to-[#0F7ACC]"] {
          background: linear-gradient(to right, #0e7490, #0891b2) !important;
        }

        .dark input,
        .dark textarea {
          background: rgba(55, 65, 81, 0.6) !important;
          border-color: rgba(107, 114, 128, 0.3) !important;
          color: #f3f4f6 !important;
        }

        .dark input::placeholder,
        .dark textarea::placeholder {
          color: #9ca3af !important;
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Custom Scrollbar Styles - Theme Matched */
        * {
          scrollbar-width: thin;
          scrollbar-color: #0F7ACC rgba(248, 250, 252, 0.8);
        }

        *::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }

        *::-webkit-scrollbar-track {
          background: rgba(248, 250, 252, 0.6);
          border-radius: 12px;
          border: 1px solid rgba(226, 232, 240, 0.5);
          margin: 2px;
        }

        *::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #0F7ACC 0%, #0B5A99 50%, #0F7ACC 100%);
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 2px 4px rgba(15, 122, 204, 0.2),
            inset 0 1px 2px rgba(255, 255, 255, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: 40px;
        }

        *::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #1e90ff 0%, #0F7ACC 50%, #0B5A99 100%);
          transform: scale(1.05);
          box-shadow: 
            0 4px 12px rgba(15, 122, 204, 0.4),
            inset 0 1px 2px rgba(255, 255, 255, 0.4);
          border-color: rgba(255, 255, 255, 0.5);
        }

        *::-webkit-scrollbar-thumb:active {
          background: linear-gradient(135deg, #0B5A99 0%, #083d66 50%, #0B5A99 100%);
          transform: scale(0.98);
          box-shadow: 
            0 2px 6px rgba(11, 90, 153, 0.6),
            inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        *::-webkit-scrollbar-corner {
          background: rgba(248, 250, 252, 0.6);
          border-radius: 12px;
        }

        /* Dark theme scrollbar */
        .dark * {
          scrollbar-color: #0891b2 rgba(31, 41, 55, 0.8);
        }

        .dark *::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.6);
          border: 1px solid rgba(75, 85, 99, 0.4);
        }

        .dark *::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #0891b2 0%, #0e7490 50%, #0891b2 100%);
          border: 2px solid rgba(156, 163, 175, 0.2);
          box-shadow: 
            0 2px 4px rgba(8, 145, 178, 0.3),
            inset 0 1px 2px rgba(156, 163, 175, 0.2);
        }

        .dark *::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%);
          box-shadow: 
            0 4px 12px rgba(8, 145, 178, 0.5),
            inset 0 1px 2px rgba(156, 163, 175, 0.3);
          border-color: rgba(156, 163, 175, 0.4);
        }

        .dark *::-webkit-scrollbar-thumb:active {
          background: linear-gradient(135deg, #0e7490 0%, #0c5f73 50%, #0e7490 100%);
          box-shadow: 
            0 2px 6px rgba(14, 116, 144, 0.6),
            inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .dark *::-webkit-scrollbar-corner {
          background: rgba(31, 41, 55, 0.6);
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(15, 122, 204, 0.5) transparent;
          -webkit-overflow-scrolling: touch;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(15, 122, 204, 0.5);
          border-radius: 20px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(15, 122, 204, 0.7);
        }

        .scrollbar-hide {
          scroll-behavior: smooth;
        }

        .cursor-pointer {
          cursor: pointer;
        }

        button {
          cursor: pointer;
        }

        input[type="text"],
        input[type="url"],
        input[type="date"],
        input[type="number"],
        textarea {
          cursor: text;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}



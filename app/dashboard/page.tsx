import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  User,
  Users,
  Activity,
  ChevronRight,
  Bell,
  Brain,
  Sparkles,
} from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session?.user.role !== "DOCTOR") {
    redirect("/");
  }

  const appointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:00 AM",
      type: "Check-up",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Mike Peterson",
      time: "10:30 AM",
      type: "Follow-up",
      status: "In Progress",
    },
    {
      id: 3,
      patient: "Emma Wilson",
      time: "11:45 AM",
      type: "Consultation",
      status: "Pending",
    },
    {
      id: 4,
      patient: "James Brown",
      time: "02:15 PM",
      type: "Check-up",
      status: "Confirmed",
    },
    {
      id: 5,
      patient: "Lisa Anderson",
      time: "03:30 PM",
      type: "Emergency",
      status: "Confirmed",
    },
  ];

  const stats = [
    { title: "Total Patients", value: "147", icon: Users },
    { title: "Today's Appointments", value: "12", icon: Calendar },
    { title: "Pending Reviews", value: "8", icon: Clock },
    { title: "Patient Recovery", value: "94%", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>

        {/* Main content */}
        <div className="relative max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Welcome back, {session?.user?.name || "Doctor"}
              </h1>
              <p className="text-gray-400 text-lg">
                Here's your practice overview
              </p>
            </div>
            <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
              <Bell className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
                >
                  <CardContent className="flex items-center p-6">
                    <div className="rounded-full p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <Icon className="h-8 w-8 text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-400 text-sm font-medium">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Appointments */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="border-b border-gray-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                  Today's Appointments
                  <Sparkles className="h-5 w-5 text-blue-400" />
                </CardTitle>
                <span className="text-sm text-gray-400">View all</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-700">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="py-6 flex items-center justify-between hover:bg-gray-800/50 transition-colors rounded-lg px-4"
                  >
                    <div className="flex items-center">
                      <div className="rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3">
                        <User className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-white font-semibold text-lg">
                          {appointment.patient}
                        </p>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.time}
                          <span className="mx-2">•</span>
                          {appointment.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          appointment.status === "Confirmed"
                            ? "bg-green-500/10 text-green-400"
                            : appointment.status === "In Progress"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {appointment.status}
                      </span>
                      <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;

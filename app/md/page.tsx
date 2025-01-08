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
} from "lucide-react";

const Page = () => {
  // Mock data
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
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, Dr. Smith
          </h1>
          <p className="text-gray-400">Here&apos;s your practice overview</p>
        </div>
        <button className="p-2 bg-gray-800 rounded-full">
          <Bell className="h-6 w-6 text-gray-400" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="flex items-center p-6">
                <div className="rounded-full p-3 bg-gray-700">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Appointments */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">
            Today&apos;s Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-700">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-700 p-2">
                    <User className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-medium">
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
                <div className="flex items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === "Confirmed"
                        ? "bg-green-900 text-green-300"
                        : appointment.status === "In Progress"
                        ? "bg-blue-900 text-blue-300"
                        : "bg-yellow-900 text-yellow-300"
                    }`}
                  >
                    {appointment.status}
                  </span>
                  <ChevronRight className="h-5 w-5 text-gray-500 ml-4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

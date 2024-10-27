import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Clock, MapPin, Star } from "lucide-react";

const SpecialistCard = ({ specialist }: any) => (
  <Card className="flex-1 min-w-[300px] bg-slate-800 border-slate-700 hover:bg-slate-700/50 transition-colors">
    <CardHeader className="flex flex-row items-start gap-4">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-700 flex-shrink-0 border-2 border-blue-400/20">
        <img
          src={specialist.imageUrl}
          alt={specialist.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg text-slate-50">
            {specialist.name}
          </CardTitle>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm ml-1">{specialist.rating}</span>
          </div>
        </div>
        <CardDescription className="text-blue-400 font-medium">
          {specialist.specialty}
        </CardDescription>
        <div className="mt-2 space-y-1">
          <div className="flex items-center text-sm text-slate-300">
            <Clock className="w-4 h-4 mr-2 text-slate-400" />
            Next available: {specialist.nextAvailable}
          </div>
          <div className="flex items-center text-sm text-slate-300">
            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
            {specialist.location}
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-slate-300 mb-4">{specialist.description}</p>
      <div className="flex gap-2">
        <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule
        </Button>
        <Button variant="outline" className="bg-slate-700 hover:bg-slate-600">
          <Phone className="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const SpecialistRecommendations = ({ diagnoses }: any) => {
  // Mock data with placeholder profile images
  const recommendedSpecialists = [
    {
      name: "Dr. Sarah Chen",
      specialty: "Neurologist",
      description:
        "Specializes in headaches and migraines with 15+ years of experience in treating complex neurological conditions.",
      nextAvailable: "Tomorrow, 2:00 PM",
      location: "Medical Center, Building A",
      rating: "4.9",
      imageUrl: "/api/placeholder/80/80?text=SC",
    },
    {
      name: "Dr. Michael Rodriguez",
      specialty: "Internal Medicine",
      description:
        "Expert in managing chronic conditions including hypertension with a holistic approach to patient care.",
      nextAvailable: "Wednesday, 10:30 AM",
      location: "Downtown Clinic",
      rating: "4.8",
      imageUrl: "/api/placeholder/80/80?text=MR",
    },
    {
      name: "Dr. Emma Thompson",
      specialty: "Allergist/Immunologist",
      description:
        "Focused on treating severe allergies and implementing comprehensive management plans for allergic conditions.",
      nextAvailable: "Thursday, 3:15 PM",
      location: "Westside Medical Plaza",
      rating: "4.9",
      imageUrl: "/api/placeholder/80/80?text=ET",
    },
  ];

  return (
    <Card className="w-full mb-8 bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-50">
          Recommended Specialists
        </CardTitle>
        <CardDescription className="text-slate-400">
          Based on your symptoms and medical history, we recommend consulting
          these specialists
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-2">
          {recommendedSpecialists.map((specialist, index) => (
            <SpecialistCard key={index} specialist={specialist} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialistRecommendations;

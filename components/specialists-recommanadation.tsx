import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Phone,
  Clock,
  MapPin,
  Star,
  Shield,
  Award,
  Video,
  MessageSquare,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const SpecialistCard = ({ specialist }: any) => (
  <Card className="flex-1 min-w-[350px] bg-slate-800 border-slate-700 hover:bg-slate-700/50 transition-colors">
    <CardHeader className="flex flex-row items-start gap-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-700 flex-shrink-0 border-2 border-blue-400/20">
          <Image
            src={specialist.imageUrl}
            alt={specialist.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        {specialist.verified && (
          <Shield className="w-5 h-5 text-blue-400 absolute bottom-0 right-0 bg-slate-800 rounded-full p-1" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <CardTitle className="text-lg text-slate-50">
            {specialist.name}
          </CardTitle>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm ml-1">{specialist.rating}</span>
            <span className="text-slate-400 text-sm ml-1">
              ({specialist.reviewCount})
            </span>
          </div>
        </div>
        <CardDescription className="text-blue-400 font-medium flex items-center gap-2">
          {specialist.specialty}
          {specialist.awards && <Award className="w-4 h-4 text-yellow-400" />}
        </CardDescription>
        <div className="flex flex-wrap gap-1 mt-2">
          {specialist.languages.map((lang: string) => (
            <Badge
              key={lang}
              variant="secondary"
              className="bg-slate-700 text-xs"
            >
              {lang}
            </Badge>
          ))}
        </div>
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
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="text-sm text-slate-300">
          <span className="text-slate-400">Experience:</span>{" "}
          {specialist.experience}
        </div>
        <div className="text-sm text-slate-300">
          <span className="text-slate-400">Consultation:</span> $
          {specialist.consultationFee}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule
        </Button>
        <Button variant="outline" className="bg-slate-700 hover:bg-slate-600">
          <Video className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="bg-slate-700 hover:bg-slate-600">
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="bg-slate-700 hover:bg-slate-600">
          <Phone className="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
    <CardFooter className="border-t border-slate-700 mt-4">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <FileText className="w-4 h-4" />
        {specialist.insuranceAccepted ? "Insurance Accepted" : "Self-Pay Only"}
      </div>
    </CardFooter>
  </Card>
);

const SpecialistRecommendations = ({ diagnoses }: any) => {
  // Mock data with placeholder profile images
  const recommendedSpecialists = [
    {
      name: "Dr. Sarah Chen",
      specialty: "Neurologist",
      description:
        "Specializes in headaches and migraines with 15+ years of experience in treating complex neurological conditions. Board-certified neurologist offering personalized treatment plans and advanced diagnostic services.",
      nextAvailable: "Tomorrow, 2:00 PM",
      location: "Medical Center, Building A",
      rating: "4.9",
      reviewCount: "328",
      imageUrl: "https://i.pravatar.cc/300",
      verified: true,
      awards: true,
      languages: ["English", "Mandarin"],
      experience: "15+ years",
      consultationFee: 150,
      insuranceAccepted: true,
    },
    {
      name: "Dr. Michael Rodriguez",
      specialty: "Internal Medicine",
      description:
        "Expert in managing chronic conditions including hypertension with a holistic approach to patient care. Focuses on preventive medicine and comprehensive health assessments.",
      nextAvailable: "Wednesday, 10:30 AM",
      location: "Downtown Clinic",
      rating: "4.8",
      reviewCount: "256",
      imageUrl: "https://i.pravatar.cc/300",
      verified: true,
      awards: false,
      languages: ["English", "Spanish"],
      experience: "12 years",
      consultationFee: 120,
      insuranceAccepted: true,
    },
    {
      name: "Dr. Emma Thompson",
      specialty: "Allergist/Immunologist",
      description:
        "Focused on treating severe allergies and implementing comprehensive management plans for allergic conditions. Pioneer in innovative allergy treatment protocols.",
      nextAvailable: "Thursday, 3:15 PM",
      location: "Westside Medical Plaza",
      rating: "4.9",
      reviewCount: "189",
      imageUrl: "https://i.pravatar.cc/300",
      verified: true,
      awards: true,
      languages: ["English", "French"],
      experience: "10+ years",
      consultationFee: 140,
      insuranceAccepted: true,
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

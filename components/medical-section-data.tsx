"use client";
import React, { useState } from "react";
import { PatientTable } from "@/components/patient-table";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon, Settings } from "lucide-react";

const MedicalDataSection = ({ title, description, data, icon: Icon }: any) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`${
        isEditing ? "border-2 border-purple-500 border-dashed  rounded-2xl" : ""
      } `}
    >
      <Card className="w-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700 overflow-hidden relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="rounded-full p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {title}
              </span>
            </CardTitle>
            <CardDescription className="text-slate-400">
              {description}
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-slate-800/50 hover:bg-slate-700 border-slate-700"
              onClick={() => setIsEditing(true)}
            >
              <Settings className="w-4 h-4 mr-1" />
              Manage
            </Button>
          )}
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              className={`text-xs ${
                isEditing ? "bg-purple-700 border-purple-700" : "bg-green-500"
              }`}
              onClick={() => setIsEditing(false)}
            >
              <CheckIcon className="w-4 h-4 mr-1" />
              Done
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <PatientTable data={data} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MedicalDataSection;

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Clock, Brain, Users, Check, Sparkles } from "lucide-react";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small practices",
      price: isAnnual ? 29 : 39,
      features: [
        "Basic patient management",
        "Appointment scheduling",
        "Medical history tracking",
        "Email support",
        "Basic analytics",
      ],
      icon: Clock,
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing medical practices",
      price: isAnnual ? 79 : 99,
      features: [
        "Everything in Starter",
        "AI-powered diagnostics",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "Team collaboration tools",
      ],
      icon: Brain,
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large healthcare organizations",
      price: isAnnual ? 199 : 249,
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom AI model training",
        "HIPAA compliance",
        "24/7 phone support",
        "Advanced security features",
        "Multi-location support",
      ],
      icon: Users,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative  inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient">
        <div className="container mx-auto px-6 py-32 z-20">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </motion.h1>
            <p className="text-xl text-gray-300 mb-12">
              Choose the perfect plan for your healthcare practice
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className="text-gray-300">Monthly</span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-gradient-to-r from-blue-500 to-purple-500 data-[state=unchecked]:bg-gray-400 "
              />
              <span className="text-gray-300 text-md">Annual</span>
              <span className="ml-2 text-md bg-green-500/10 text-green-400 px-3 py-1 rounded-full">
                Save 20%
              </span>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card
                  className={`relative h-full bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 ${
                    plan.popular ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {plan.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400">
                        <Sparkles className="w-4 h-4 mr-1" /> Popular
                      </span>
                    </div>
                  )}

                  <CardHeader>
                    <div className="rounded-full p-3 bg-blue-500/10 w-12 h-12 flex items-center justify-center mb-4">
                      <plan.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">
                      {plan.name}
                    </CardTitle>
                    <p className="text-gray-400">{plan.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-400 ml-2">/month</span>
                      {isAnnual && (
                        <div className="text-sm text-gray-400 mt-1">
                          Billed annually
                        </div>
                      )}
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="rounded-full p-1 bg-blue-500/10">
                            <Check className="h-4 w-4 text-blue-400" />
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <button
                      className={`w-full py-4 rounded-full text-lg font-medium transition-all ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                          : "border border-gray-600 hover:border-gray-400 text-white"
                      } transform hover:scale-105`}
                    >
                      Get Started
                    </button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Enterprise Contact Section */}
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 p-12 text-center"
            >
              <div className="absolute inset-0 bg-grid-white/10"></div>
              <h2 className="text-4xl font-bold mb-6 text-white">
                Need a Custom Solution?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Contact our team for a tailored package that meets your specific
                healthcare requirements.
              </p>
              <button className="px-8 py-4 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transform hover:scale-105 transition-all">
                Contact Sales
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

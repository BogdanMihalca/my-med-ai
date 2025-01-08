"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  UserCog,
  Stethoscope,
  ClipboardList,
  Users,
  Search,
  Clock,
  Shield,
  Brain,
  Server,
  Database,
  Activity,
  Heart,
  PieChart,
  FileText,
  ChevronRight,
  Sparkles,
  ArrowRightIcon,
  Minus,
  Plus,
  MousePointerClick,
} from "lucide-react";
import Image from "next/image";

const LandingPage = () => {
  const features = [
    {
      icon: ClipboardList,
      title: "Medical History Management",
      description:
        "Securely store and access your complete medical history in one place. Track medications, conditions, and treatments effortlessly.",
    },
    {
      icon: Search,
      title: "Find Specialists",
      description:
        "Easily search and connect with specialized healthcare providers based on your specific needs and location.",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Book and manage appointments with healthcare providers in real-time. Receive reminders and updates automatically.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your health data is protected with enterprise-grade security and encryption, ensuring complete privacy and compliance.",
    },
    {
      icon: Heart,
      title: "Health Insights",
      description:
        "Receive personalized health insights and recommendations based on your medical history and lifestyle.",
    },
    {
      icon: Brain,
      title: "Ai-Powered Diagnostics",
      description:
        "Leverage advanced AI algorithms to identify potential health concerns and receive early warnings.",
    },
  ];

  const forDoctors = [
    {
      icon: Users,
      title: "Patient Management",
      description:
        "Streamline your practice with comprehensive patient management tools and insights.",
    },
    {
      icon: Clock,
      title: "Efficient Scheduling",
      description:
        "Optimize your time with smart scheduling and automated appointment management.",
    },
    {
      icon: Stethoscope,
      title: "Clinical Dashboard",
      description:
        "Access patient histories, test results, and medical data in a unified dashboard.",
    },
    {
      icon: UserCog,
      title: "Practice Analytics",
      description:
        "Gain valuable insights into your practice with detailed analytics and reporting.",
    },
  ];
  const aiFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Diagnostics",
      description:
        "Preliminary health screening using advanced AI algorithms to identify potential health concerns.",
    },
    {
      icon: Server,
      title: "Smart Health Assistant",
      description:
        "24/7 AI assistant to answer health queries and provide personalized wellness recommendations.",
    },
    {
      icon: Activity,
      title: "Predictive Analytics",
      description:
        "AI-driven health predictions and early warning systems based on your medical history.",
    },
    {
      icon: Database,
      title: "Intelligent Data Processing",
      description:
        "Automated medical record analysis and organization using machine learning.",
    },
  ];

  const faqs = [
    {
      question: "How secure is my medical data?",
      answer:
        "We use enterprise-grade encryption and comply with HIPAA regulations to ensure your medical data is completely secure and private.",
    },
    {
      question: "Can I integrate this with my existing medical software?",
      answer:
        "Yes, our platform offers API integration with major EMR systems and healthcare software solutions.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide 24/7 technical support, comprehensive training, and dedicated account managers for healthcare providers.",
    },
    {
      question: "How does the AI diagnostic system work?",
      answer:
        "Our AI system analyzes patient data using advanced machine learning algorithms to identify patterns and potential health concerns, supporting clinical decision-making.",
    },
  ];

  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section - with animated gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient"></div>
        <div className="container mx-auto px-6 pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Your Health Journey,
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Reimagined
              </span>
            </motion.h1>
            <p className="text-xl text-gray-300 mb-12">
              Experience healthcare management powered by AI. Join over 50,000+
              satisfied users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg font-medium transform hover:scale-105 transition-all">
                Start Free Trial
              </button>
              <button className="px-8 py-4 rounded-full border border-gray-600 hover:border-gray-400 text-lg font-medium flex items-center justify-center gap-2">
                Watch Demo <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-5 left-[45%] transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
          >
            <MousePointerClick className="w-16 h-16 text-purple-400" />
          </motion.div>
        </div>
      </div>

      {/* Features Grid with Hover Effects */}
      <div className="container mx-auto px-6 py-32">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Key Features
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Take control of your healthcare journey with our comprehensive
          patient-focused features.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <feature.icon className="h-8 w-8 text-blue-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* AI Features Showcase */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6">
                AI-Powered Healthcare
                <Sparkles className="inline-block ml-2 text-yellow-400" />
              </h2>
              <div className="space-y-6">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-blue-500/10">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 md:pl-12">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Image
                  src="/ai-2.png"
                  width={400}
                  height={400}
                  alt="AI Features"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* New Workflow Diagram Section */}
      <div className="container mx-auto px-4 py-20 bg-gray-850">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 text-center">
            <div className="rounded-full bg-blue-500/10 p-6 inline-block mb-4">
              <FileText className="h-12 w-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Input Medical Data
            </h3>
            <p className="text-gray-400">
              Securely upload your medical history and current symptoms
            </p>
          </div>
          <div className="hidden md:block text-blue-400">
            <ArrowRightIcon className="h-12 w-20" />
          </div>
          <div className="flex-1 text-center">
            <div className="rounded-full bg-blue-500/10 p-6 inline-block mb-4">
              <Brain className="h-12 w-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              AI Analysis
            </h3>
            <p className="text-gray-400">
              Our AI processes and analyzes your health data
            </p>
          </div>
          <div className="hidden md:block text-blue-400">
            <ArrowRightIcon className="h-12 w-20" />
          </div>
          <div className="flex-1 text-center">
            <div className="rounded-full bg-blue-500/10 p-6 inline-block mb-4">
              <PieChart className="h-12 w-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Personalized Insights
            </h3>
            <p className="text-gray-400">
              Receive detailed health insights and recommendations
            </p>
          </div>
        </div>
      </div>

      {/* For Doctors Section */}
      <div id="for-doctors" className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            For Healthcare Providers
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Streamline your practice and enhance patient care with our
            professional tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {forDoctors.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-gray-900 border-gray-700 hover:bg-gray-850 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="rounded-full p-3 bg-gray-700 w-12 h-12 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-32">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 p-12 text-center">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers already using our platform.
          </p>
          <button className="px-8 py-4 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transform hover:scale-105 transition-all">
            Get Started Now
          </button>
        </div>
      </div>

      {/* New FAQ Section */}
      <div className="container mx-auto px-6 py-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white text-center mb-12"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                {activeFaq === index ? (
                  <Minus className="w-5 h-5 text-blue-400" />
                ) : (
                  <Plus className="w-5 h-5 text-blue-400" />
                )}
              </button>

              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 text-gray-400">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

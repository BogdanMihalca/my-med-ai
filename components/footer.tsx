"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Contact", href: "/contact" },
    ],
    services: [
      { name: "For Patients", href: "/patients" },
      { name: "For Doctors", href: "/doctors" },
      { name: "For Clinics", href: "/clinics" },
      { name: "API Access", href: "/api" },
    ],
  };

  return (
    <footer className="bg-gray-900 pt-20 pb-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6"
      >
        {/* Top Section with Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MedConnect
            </h2>
            <p className="text-gray-400 max-w-sm">
              Transforming healthcare through innovative AI solutions and
              seamless patient care management.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Icon className="h-5 w-5 text-blue-400" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold text-white mb-6 capitalize">
                {title}
              </h3>
              <ul className="space-y-4">
                {links.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <div className="flex flex-wrap justify-center gap-8 py-8 border-t border-gray-800">
          {[
            { icon: Mail, text: "mihalcabogdan8@gmail.com" },
            { icon: Phone, text: "+40 (743) 386554" },
            { icon: MapPin, text: "Oradea, Bihor, Romania" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <item.icon className="h-5 w-5 text-blue-400" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="text-gray-400 text-sm flex items-center">
            © {new Date().getFullYear()} MedConnect. Made with
            <Heart className="h-4 w-4 text-red-400 mx-1" />
            in Romania
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-4 md:mt-0 bg-blue-500/10 p-2 rounded-full hover:bg-blue-500/20 transition-colors"
          >
            <ArrowUp className="h-5 w-5 text-blue-400" />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;

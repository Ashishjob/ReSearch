import React from "react";
import { GraduationCap } from "lucide-react";
import { Separator } from "./ui/separator";

const Footer: React.FC = () => (
  <div className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6" />
            <span className="text-lg font-bold">ReSearch</span>
          </div>
          <p className="text-gray-400">
            Built to help UH students discover real research experiences - whether you're conducting research or volunteering to support it.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/research" className="hover:text-white transition-colors">Research Opportunities</a></li>
            <li><a href="/volunteer" className="hover:text-white transition-colors">Volunteer Studies</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Guides</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/guides" className="hover:text-white transition-colors">Getting Started in Research</a></li>
            <li><a href="/email-tips" className="hover:text-white transition-colors">Emailing Professors</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/about" className="hover:text-white transition-colors">Why This Exists</a></li>
            <li><a href="/submit" className="hover:text-white transition-colors">Submit an Opportunity</a></li>
            <li>
              <a href="mailto:ashishjob104@gmail.com" className="hover:text-white transition-colors">
                ashishjob104@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="my-8 bg-gray-700" />

      <div className="text-center text-gray-400">
        <p>&copy; 2025 ReSearch. Made by a UH student for UH students.</p>
      </div>
    </div>
  </div>
);

export default Footer;

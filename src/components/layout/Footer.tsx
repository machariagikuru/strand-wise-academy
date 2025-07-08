
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl">StrandNotes</span>
            </div>
            <p className="text-blue-100 text-sm">
              Master every strand, one note at a time. The premier educational platform for comprehensive learning.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/subjects" className="hover:text-white transition-colors">Browse Subjects</Link></li>
              <li><Link to="/quizzes" className="hover:text-white transition-colors">Take Quizzes</Link></li>
              <li><Link to="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link to="/premium" className="hover:text-white transition-colors">Premium Access</Link></li>
            </ul>
          </div>

          {/* For Educators */}
          <div>
            <h3 className="font-semibold text-lg mb-4">For Educators</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/teacher-signup" className="hover:text-white transition-colors">Become a Teacher</Link></li>
              <li><Link to="/create-content" className="hover:text-white transition-colors">Create Content</Link></li>
              <li><Link to="/earnings" className="hover:text-white transition-colors">Earnings Program</Link></li>
              <li><Link to="/teacher-resources" className="hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-blue-100">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@strandnotes.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; 2024 StrandNotes. All rights reserved. Built with passion for education.</p>
        </div>
      </div>
    </footer>
  );
}

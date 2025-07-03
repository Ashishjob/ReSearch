import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div>
              <a href="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-900">ReSearch</h1>
              </a>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/help" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Read More</a>
            <a href="/research" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Research Opportunities</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/auth')}>
                  Join Now
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
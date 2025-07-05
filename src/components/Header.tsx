import { GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const fullName = user?.user_metadata?.full_name;
  const firstName = fullName?.split(" ")[0];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <a href="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-900">ReSearch</h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/research" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Research Opportunities</a>
            <a href="/volunteer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Volunteer Studies</a>
            <a href="/submit" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Submit</a>
            <a href="/help" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Read More</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-base text-black px-2">
                    {firstName ? `Welcome, ${firstName}` : "Account"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/saved')}>
                    Saved Items
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>Sign In</Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/auth')}>Join Now</Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu className="w-6 h-6 text-gray-700" />
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <a href="/research" className="text-gray-700 hover:text-blue-600 font-medium">Research Opportunities</a>
                  <a href="/volunteer" className="text-gray-700 hover:text-blue-600 font-medium">Volunteer Studies</a>
                  <a href="/submit" className="text-gray-700 hover:text-blue-600 font-medium">Submit</a>
                  <a href="/help" className="text-gray-700 hover:text-blue-600 font-medium">Read More</a>
                  <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
                  {user ? (
                    <>
                      <span className="text-sm text-gray-600">Welcome, {firstName || user.email}</span>
                      <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>Sign In</Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/auth')}>Join Now</Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

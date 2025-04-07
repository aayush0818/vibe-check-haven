
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-beige/50 py-12 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Vibe Check Haven</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your safe space to check in with yourself, track your feelings, and grow.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-teal">Home</Link></li>
              <li><Link to="/daily-check" className="text-sm hover:text-teal">Daily Check</Link></li>
              <li><Link to="/journal" className="text-sm hover:text-teal">Journal</Link></li>
              <li><Link to="/mood-tracker" className="text-sm hover:text-teal">Mood Tracker</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-sm hover:text-teal">Mental Health Resources</Link></li>
              <li><a href="#" className="text-sm hover:text-teal">Community Guidelines</a></li>
              <li><a href="#" className="text-sm hover:text-teal">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <p className="text-sm text-gray-600 mb-2">
              Questions or feedback? Let us know.
            </p>
            <a href="#" className="btn-outline text-sm py-2 inline-block">Contact Us</a>
          </div>
        </div>
        
        <div className="border-t border-border/30 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Vibe Check Haven. All rights reserved.</p>
          <p className="mt-2">Made with care for your mental wellbeing.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

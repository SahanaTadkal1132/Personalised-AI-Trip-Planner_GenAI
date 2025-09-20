import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Image1 from '../assets/Image-1.png';
import goa from '../assets/goa.png';
import jaipur from '../assets/jaipur.png';
import kedarnath from '../assets/kedarnath.png';
import kerala from '../assets/kerala.png';
import mysore from '../assets/Mysore.png';
import manali from '../assets/manali.png';
import Image2 from '../assets/Image-2.png';
import Image3 from '../assets/Image-3.png';
import Image4 from '../assets/Image-4.png';

// ---------------- Header Component ----------------
const Header = ({ isLoggedIn, onLogin, onLogout, username }) => (
  <header className="bg-white shadow-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <h1 className="text-2xl font-bold text-blue-600">TripEase</h1>
        {!isLoggedIn ? (
          <button
            onClick={onLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 font-medium"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {username ? username.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <span className="text-gray-700 font-medium">
                {username || 'User'}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </header>
);

// ---------------- Welcome Section ----------------
const WelcomeSection = () => (
  <div className="text-center py-8 mb-12">
    <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to TripEase</h1>
    <h4 className="text-2xl font-bold text-gray-800 mb-2">
      Plan Your Perfect Trip with TripEase
    </h4>
    <p className="text-xl text-gray-600">
      Get personalized itineraries tailored to your budget, interests, and time.
      Real-time recommendations with seamless booking in just <b>one click.</b>
    </p>
  </div>
);

// ---------------- Feature Card ----------------
const FeatureCard = ({ title, description, isActive, image }) => (
  <div
    className={`transition-all duration-500 transform ${
      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
    }`}
  >
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex">
      <div className="w-1/2 relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-l-xl"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-400 rounded-l-xl"></div>
        )}
      </div>
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-4xl font-bold text-blue-600 mb-4">{title}</h3>
        <p className="text-gray-600 font-bold text-lg">{description}</p>
      </div>
    </div>
  </div>
);

// ---------------- Features Section ----------------
const FeaturesSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const features = [
    { title: 'Perfect for Everyone', description: "Solo, Couples, Families, Groups of Friends - We've got you covered", image: Image1 },
    { title: 'Child and Pet Care', description: 'Kid- and pet-friendly plans for those traveling with little ones or furry friends', image: Image2 },
    { title: 'Budget-Friendly Planning', description: 'We plan your trip under your budget – No more overspend', image: Image3 },
    { title: 'Your Preferences Matter', description: 'We take care of your preferences (nature, adventures, etc.)', image: Image4 },
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentFeature((prev) => (prev + 1) % features.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-16">
      <div className="bg-blue-100 rounded-3xl p-6 shadow-2xl">
        <div className="relative h-96 bg-white rounded-2xl overflow-hidden shadow-lg">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} isActive={index === currentFeature}/>
          ))}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentFeature ? 'bg-blue-500' : 'bg-gray-300'}`}
                onClick={() => setCurrentFeature(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------- Popular Trip Card ----------------
const PopularTripCard = ({ destination, image, accentColor }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="relative">
      <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
        {image ? <img src={image} alt={destination} className="w-full h-full object-cover"/> : <span className="text-2xl font-bold text-white">{destination}</span>}
      </div>
      <div className={`h-1 ${accentColor}`}></div>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800">{destination}</h3>
      <p className="text-gray-600 mt-2">Discover the beauty of {destination}</p>
    </div>
  </div>
);

// ---------------- Login Section ----------------
const LoginSection = ({ onLogin }) => (
  <section className="mb-16">
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg p-12 text-center text-blue-900">
      <h2 className="text-4xl font-bold text-blue-600 mb-4">Ready to Plan Your Perfect Trip?</h2>
      <p className="text-xl font-bold mb-8 text-black-600 ">
        Sign in to access our AI-powered trip planner and create personalized itineraries
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
        >
          Log in
        </button>
        <button
          onClick={() => window.location.href = '/signup'}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
        >
          Sign Up
        </button>
      </div>
    </div>
  </section>
);

// ---------------- Popular Trips Section ----------------
const PopularTripsSection = () => {
  const destinations = [
    { name: 'Jaipur', image: jaipur, accent: 'bg-pink-500' },
    { name: 'Kerala', image: kerala, accent: 'bg-green-500' },
    { name: 'Mysore', image: mysore, accent: 'bg-purple-500' },
    { name: 'Manali', image: manali, accent: 'bg-blue-500' },
    { name: 'Goa', image: goa, accent: 'bg-orange-500' },
    { name: 'Kedarnath', image: kedarnath, accent: 'bg-red-500' },
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Trip Locations</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest, i) => (
          <PopularTripCard key={i} destination={dest.name} image={dest.image} accentColor={dest.accent}/>
        ))}
      </div>
    </section>
  );
};

// ---------------- Theme Card ----------------
const ThemeCard = ({ theme, isSelected, onToggle }) => (
  <div
    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${isSelected ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-blue-300 hover:shadow-sm'}`}
    onClick={onToggle}
  >
    <div className="text-center">
      <h4 className="font-semibold text-gray-800">{theme}</h4>
    </div>
  </div>
);

// ---------------- Trip Planner Section ----------------
const TripPlannerSection = ({ onPlanGenerated }) => {
  const [formData, setFormData] = useState({
    from: '',
    destination: '',
    budget: '',
    startDate: '',
    days: '',
    travellers: '',
    themes: [],
    withKids: false,
    withPets: false
  });
  const [loading, setLoading] = useState(false);

  const themes = ['Heritage & Culture','Adventure','Spiritual','Nightlife','Nature & Wildlife','Food & Cuisine'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleThemeToggle = (theme) => {
    setFormData({
      ...formData,
      themes: formData.themes.includes(theme)
        ? formData.themes.filter(t => t !== theme)
        : [...formData.themes, theme]
    });
  };

  const handleSubmit = async () => {
    if (!formData.from || !formData.destination || !formData.days)
      return alert('Please fill in all required fields');

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/generate-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentLocation: formData.from,
          destination: formData.destination,
          date: formData.startDate,
          days: formData.days,
          budget: formData.budget,
          type: 'general',
          passengers: parseInt(formData.travellers || '1'),
          preferences: [
            ...formData.themes,
            ...(formData.withKids ? ['Kids'] : []),
            ...(formData.withPets ? ['Pets'] : [])
          ]
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Backend error:', data);
        alert('Failed to generate trip plan: ' + (data.error || 'Unknown error'));
        return;
      }

      onPlanGenerated(data.tripPlanText, formData);
    } catch (err) {
      console.error('❌ Error:', err);
      alert('Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Plan Your Perfect Trip</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input type="text" name="from" placeholder="From Location *" value={formData.from} onChange={handleChange} className="p-4 border border-gray-300 rounded-lg"/>
          <input type="text" name="destination" placeholder="Destination *" value={formData.destination} onChange={handleChange} className="p-4 border border-gray-300 rounded-lg"/>
          <input type="text" name="budget" placeholder="Budget" value={formData.budget} onChange={handleChange} className="p-4 border border-gray-300 rounded-lg"/>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="p-4 border border-gray-300 rounded-lg"/>
          <input type="number" name="days" placeholder="Number of Days *" value={formData.days} onChange={handleChange} className="p-4 border border-gray-300 rounded-lg" min="1"/>
          <select name="travellers" value={formData.travellers} onChange={handleChange} className="p-4 border border-gray-300 rounded-lg">
            <option value="">Number of Travellers</option>
            <option value="1">Solo</option>
            <option value="2">Couple</option>
            <option value="4">Family (3-4)</option>
            <option value="5">Group (5+)</option>
          </select>
        </div>

        {/* Kids & Pets toggles */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Traveling With</h3>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="withKids"
                checked={formData.withKids}
                onChange={handleChange}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-gray-700">Kids</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="withPets"
                checked={formData.withPets}
                onChange={handleChange}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-gray-700">Pets</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Select Your Interests</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {themes.map(theme => (
              <ThemeCard key={theme} theme={theme} isSelected={formData.themes.includes(theme)} onToggle={() => handleThemeToggle(theme)}/>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg font-semibold">
          {loading ? 'Generating...' : 'Plan My Trip'}
        </button>
      </div>
    </section>
  );
};

// ---------------- Footer ----------------
const Footer = () => (
  <footer className="bg-gray-800 text-white py-8 text-center">
    <p>&copy; 2025 TripEase. All Rights Reserved.</p>
  </footer>
);

// ---------------- Main Home Component ----------------
const Home = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const [tripPlanText, setTripPlanText] = useState('');
  const [tripFormData, setTripFormData] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);
  const [showTrips, setShowTrips] = useState(false);
  const [expandedTripIndex, setExpandedTripIndex] = useState(null);

  const handleLogin = () => navigate('/signin');
  const handleLogout = () => {
    logout();
    setTripPlanText('');
    setTripFormData(null);
    setSavedPlans([]);
  };

  const handlePlanGenerated = (text, formData) => {
    setTripPlanText(text);
    setTripFormData(formData);
    console.log('✅ Trip generated:', text, formData);
  };

  const handleSave = () => {
    if (tripFormData && tripPlanText) {
      const newPlan = { ...tripFormData, tripPlanText };
      setSavedPlans(prev => [newPlan, ...prev]);
      alert('Itinerary saved successfully!');
    }
  };

  const toggleExpandTrip = (index) => {
    setExpandedTripIndex(expandedTripIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} username={user?.name}/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <WelcomeSection/>
        <FeaturesSection/>
        
        {/* Show login section after features if not logged in */}
        {!isLoggedIn && <LoginSection onLogin={handleLogin}/>}
        

        {/* Trip planner and itineraries only accessible after login */}
        {isLoggedIn && (
          <>
            <TripPlannerSection onPlanGenerated={handlePlanGenerated}/>
            
            {tripPlanText && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-4">Your Generated Itinerary</h2>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap text-gray-800 leading-relaxed border">
                    {tripPlanText}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button 
                      onClick={handleSave} 
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
                    >
                      Save Itinerary
                    </button>
                    <button
                      onClick={() => alert('Proceeding to the next step... (coming soon)')}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            )}

            {savedPlans.length > 0 && (
              <div className="mb-16">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">My Saved Plans</h2>
                    <button 
                      onClick={() => setShowTrips(!showTrips)} 
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
                    >
                      {showTrips ? 'Hide Plans' : `View Plans (${savedPlans.length})`}
                    </button>
                  </div>

                  {showTrips && (
                    <div className="space-y-4">
                      {savedPlans.map((plan, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-50 rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition border-l-4 border-blue-500" 
                          onClick={() => toggleExpandTrip(index)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">
                                {plan.from} → {plan.destination}
                              </h3>
                              <p className="text-gray-600">
                                {plan.days} days • {plan.travellers ? `${plan.travellers} travellers` : 'Solo'} • Budget: {plan.budget || 'Not specified'}
                              </p>
                            </div>
                            <div className="text-blue-500">
                              {expandedTripIndex === index ? '▼' : '▶'}
                            </div>
                          </div>
                          {expandedTripIndex === index && (
                            <div className="mt-4 bg-white p-4 rounded-lg text-sm whitespace-pre-wrap border">
                              {plan.tripPlanText}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Popular trips should appear just above the footer */}
        <PopularTripsSection/>
      </main>

      <Footer/>
    </div>
  );
};

export default Home;

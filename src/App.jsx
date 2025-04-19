import { useState, useEffect } from 'react';
import './assets/styles/App.css';
import logo from './assets/images/logo.svg';
import { FaGlobe } from 'react-icons/fa';
import ColorSelector from './components/ColorSelector';
import InteriorSelector from './components/InteriorSelector';
import WheelSelector from './components/WheelSelector';
import OptionCheckbox from './components/OptionCheckbox';
import PaymentSummary from './components/PaymentSummary';
import {
  basePrice,
  exteriorImages,
  interiorImages,
  pricing,
  accessories
} from './constants';

function App() {
  const [showTopBar, setShowTopBar] = useState(true);
  const [selectedColor, setSelectedColor] = useState('Stealth Grey');
  const [selectedInterior, setSelectedInterior] = useState('Dark');
  const [selectedOptions, setSelectedOptions] = useState({
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false,
  });
  const [selectedAccessories, setSelectedAccessories] = useState({});
  const [currentPrice, setCurrentPrice] = useState(basePrice);

  // Handle scroll for top bar
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBar(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update price when options change
  useEffect(() => {
    let newPrice = basePrice;

    // Add option prices
    Object.entries(selectedOptions).forEach(([option, isSelected]) => {
      if (isSelected && pricing[option]) {
        newPrice += pricing[option];
      }
    });

    // Add accessory prices
    Object.entries(selectedAccessories).forEach(([accessory, isSelected]) => {
      if (isSelected && pricing.Accessories[accessory]) {
        newPrice += pricing.Accessories[accessory];
      }
    });

    setCurrentPrice(newPrice);
  }, [selectedOptions, selectedAccessories]);

  // Toggle option selection
  const toggleOption = (option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  // Toggle accessory selection
  const toggleAccessory = (accessory) => {
    setSelectedAccessories(prev => ({
      ...prev,
      [accessory]: !prev[accessory]
    }));
  };

  //  exterior image with performance suffix 
  const getExteriorImage = () => {
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' : '';
    const colorKey = selectedColor in exteriorImages ? selectedColor : 'Stealth Grey';
    return exteriorImages[colorKey].replace('.jpg', `${performanceSuffix}.jpg`);
  };

  return (
    <div className="app">
      {/* Top Bar */}
      <div id="top-bar" className={`bg-gray-100 fixed top-0 right-0 left-0 py-2 transition-transform duration-500 ${showTopBar ? 'translate-y-0' : '-translate-y-full'}`}>
        <p className="text-center py-2 font-semibold">
          0% APR available for qualified buyers
        </p>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-4 md:px-10 py-6 mt-16">
        <img src={logo} alt="Tesla" width="120" height="24" />
        <button className="flex items-center gap-2">
          <FaGlobe /> <span className="font-bold">US</span>
        </button>
      </header>

      <main className="flex flex-col md:flex-row justify-between px-4 md:px-10 py-6">
        {/* Image Section */}
        <section className="w-full md:w-3/4">
          <div className="sticky top-24">
            {/* Exterior Image */}
            <div className="h-96 bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
              <img
                src={getExteriorImage()}
                alt="Model Y"
                className="max-w-full h-auto transform scale-125"
              />
            </div>

            {/* Interior Image */}
            <div className="h-96 bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
              <img
                src={interiorImages[selectedInterior]}
                alt="Model Y Interior"
                className="max-w-full h-auto transform scale-125"
              />
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="w-full md:w-1/3 pl-0 md:pl-8 mt-6 md:mt-0 z-2">
          <h1 className="text-5xl text-center font-bold mb-5">Model Y</h1>
          <h2 className="text-xl text-center font-light">Customize Your Car</h2>

          {/* Exterior Color Selector */}
          <ColorSelector 
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />

          {/* Interior Color Selector */}
          <InteriorSelector
            selectedInterior={selectedInterior}
            onSelectInterior={setSelectedInterior}
          />

          {/* Wheel Selector */}
          <WheelSelector
            isPerformanceWheels={selectedOptions['Performance Wheels']}
            onSelectWheels={(isPerformance) => 
              setSelectedOptions(prev => ({
                ...prev,
                'Performance Wheels': isPerformance
              }))
            }
          />

          {/* Full Self Driving Option */}
          <div className="border p-4 mb-8 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Full Self-Driving</h3>
            <OptionCheckbox
              label="Add Full Self-Driving for $8,500"
              isChecked={selectedOptions['Full Self-Driving']}
              onChange={() => toggleOption('Full Self-Driving')}
              price={pricing['Full Self-Driving']}
            />
          </div>

          {/* Performance Upgrade */}
          <div className="mb-8">
            <h3 className="font-semibold mb-2">Performance Package</h3>
            <button
              onClick={() => toggleOption('Performance Package')}
              className={`w-full py-4 rounded-lg transition-colors duration-300 ${
                selectedOptions['Performance Package']
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-400'
              }`}
            >
              Performance Upgrade (+$5,000)
            </button>
          </div>

          {/* Accessories Checkboxes */}
          <div className="my-8">
            <h3 className="font-semibold mb-2">Accessories</h3>
            <div className="space-y-4">
              {accessories.map((accessory) => (
                <label
                  key={accessory.name}
                  className="flex items-center justify-between py-4 px-4 border rounded-lg shadow"
                >
                  <span>{accessory.name}</span>
                  <span className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedAccessories[accessory.name] || false}
                      onChange={() => toggleAccessory(accessory.name)}
                      className="accessory-form-checkbox h-5 w-5"
                    />
                    <span>${accessory.price}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <PaymentSummary currentPrice={currentPrice} />
        </aside>
      </main>
    </div>
  );
}

export default App;
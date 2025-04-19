export default function WheelSelector({ isPerformanceWheels, onSelectWheels }) {
    return (
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Wheels</h3>
        <button
          onClick={() => onSelectWheels(false)}
          className={`w-full py-4 mb-2 rounded-lg transition-colors duration-300 ${
            !isPerformanceWheels
              ? 'bg-gray-700 text-white'
              : 'bg-gray-200 hover:bg-gray-600 hover:text-white'
          }`}
        >
          Standard Wheels
        </button>
        <button
          onClick={() => onSelectWheels(true)}
          className={`w-full py-4 mb-2 rounded-lg transition-colors duration-300 ${
            isPerformanceWheels
              ? 'bg-gray-700 text-white'
              : 'bg-gray-200 hover:bg-gray-600 hover:text-white'
          }`}
        >
          Performance Wheels (+$2,500)
        </button>
      </div>
    );
  }
  
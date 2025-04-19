import { interiorButtons } from '../constants';

export default function InteriorSelector({ selectedInterior, onSelectInterior }) {
  return (
    <div className="my-8">
      <h3 className="font-semibold mb-2">Interior Color</h3>
      <div className="flex space-x-4">
        {interiorButtons.map((interior) => (
          <button
            key={interior.name}
            onClick={() => onSelectInterior(interior.name)}
            className={`transition-transform duration-300 hover:scale-110 ${
              selectedInterior === interior.name
                ? 'border-2 border-gray-300 rounded-full p-2'
                : ''
            }`}
          >
            <img src={interior.image} alt={interior.name} className="w-12" />
          </button>
        ))}
      </div>
    </div>
  );
}

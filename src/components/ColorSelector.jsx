import { exteriorButtons } from '../constants';

export default function ColorSelector({ selectedColor, onSelectColor }) {
  return (
    <div className="my-8">
      <h3 className="font-semibold mb-2">Exterior Color</h3>
      <div className="flex flex-wrap gap-4">
        {exteriorButtons.map((color) => (
          <button
            key={color.name}
            onClick={() => onSelectColor(color.name)}
            className={`transition-transform duration-300 hover:scale-110 ${
              selectedColor === color.name
                ? 'border-2 border-gray-300 rounded-full p-2'
                : ''
            }`}
          >
            <img
              src={color.image}
              alt={color.name}
              className="w-22"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
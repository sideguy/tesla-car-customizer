export default function OptionCheckbox({ label, isChecked, onChange, price }) {
    return (
      <label className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span>{label}</span>
      </label>
    );
  }
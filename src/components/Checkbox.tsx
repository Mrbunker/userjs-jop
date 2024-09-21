import Tooltip from "./Tooltip";

interface CheckboxProps {
  label: string;
  value: boolean;
  tip?: string;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ label, value, tip, onChange }: CheckboxProps): JSX.Element => {
  const handleChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.checked);
  };

  return (
    <label className="jop-checkbox">
      <input
        type="checkbox"
        className="jop-checkbox-input"
        checked={value}
        onChange={handleChange}
      />
      <span className="jop-checkbox-custom"></span>
      <Tooltip content={tip || ""}>
        <span className="jop-checkbox-label">{label}</span>
      </Tooltip>
    </label>
  );
};

export default Checkbox;

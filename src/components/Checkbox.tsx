import Check from "./Check";

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="ml-4 flex items-center">
      <Check id={id} checked={checked} onClick={onChange} />
      <label htmlFor={id} className="ml-2 font-sans font-medium cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;

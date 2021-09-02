import { getNewId } from '../service/idService';

export default function TextInput({
  labelDescrition = 'Description of Label:',
  inputValue = 'Standard value of input',
  onInputChange = null,
  id = getNewId(),
  autoFocus,
}) {
  function handleNameChange({ currentTarget }) {
    const newValue = currentTarget.value;
    onInputChange(newValue);
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescrition}
      </label>

      <input
        autoFocus={autoFocus}
        id={id}
        className="border p-1"
        type="text"
        value={inputValue}
        onChange={handleNameChange}
      />
    </div>
  );
}

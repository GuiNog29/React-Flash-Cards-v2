import { getNewId } from '../service/idService';

export default function TextInput({
  labelDescrition = 'Description of Text Area:',
  textAreaValue = 'Standard value of Text Area',
  onTextAreaChange = null,
  id = getNewId(),
  maxLength = 230,
  rows = 4,
}) {
  function handleTextAreaChange({ currentTarget }) {
    const newValue = currentTarget.value;
    onTextAreaChange(newValue);
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescrition}
      </label>

      <textarea
        id={id}
        maxLength={maxLength}
        rows={rows}
        className="border p-1"
        type="text"
        value={textAreaValue}
        onChange={handleTextAreaChange}
      />
    </div>
  );
}

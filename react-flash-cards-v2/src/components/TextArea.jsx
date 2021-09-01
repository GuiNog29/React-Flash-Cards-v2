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

  const currentCharacterCount = textAreaValue.length;

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescrition}
      </label>

      <textarea
        id={id}
        className="border p-1"
        maxLength={maxLength}
        rows={rows}
        value={textAreaValue}
        onChange={handleTextAreaChange}
      />
      <div className="text-right mr-1 font-semibold">
        <span>
          {currentCharacterCount} / {maxLength}
        </span>
      </div>
    </div>
  );
}

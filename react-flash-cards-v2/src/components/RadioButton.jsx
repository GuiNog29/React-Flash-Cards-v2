import { getNewId } from '../service/idService';

export default function RadioButton({
  id = getNewId(),
  name = 'radioButtonName',
  children: ButtonDescription = 'Description of button',
  buttonChecked = false,
  onButtonCLick = null,
}) {
  function handleRadioButtonChange() {
    if (onButtonCLick) onButtonCLick();
  }
  return (
    <div className="space-x-2">
      <input
        id={id}
        type="radio"
        name={name}
        checked={buttonChecked}
        onChange={handleRadioButtonChange}
      />
      <label htmlFor={id}>{ButtonDescription}</label>
    </div>
  );
}

export default function Button({
  children: description = 'Description of Button',
  onButtonClick = null,
  colorButton = 'bg-gray-200',
  type = 'button'
}) {
  function handleButtonClick() {
    if (onButtonClick) onButtonClick();
  }

  return (
    <button
      className={`p-2 rounded-md m-1 ${colorButton} ${type}`}
      onClick={handleButtonClick}
    >
      {description}
    </button>
  );
}

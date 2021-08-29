export default function Button({
  children: description = 'Description of Button',
  onButtonClick = null,
}) {
  function handleButtonClick() {
    if (onButtonClick) onButtonClick();
  }

  return <button className='bg-gray-200 p-2 rounded-md m-1' onClick={handleButtonClick}>{description}</button>;
}

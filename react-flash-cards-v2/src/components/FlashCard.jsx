export default function FlashCard({
  id,
  title = 'Title of Card',
  description = 'Description of Card',
  showFlashCardTitle = null,
  onToggleFlashCard = null,
}) {
  function handleFlashCard() {
    if (onToggleFlashCard) onToggleFlashCard(id);
  }

  const fontSizeClassName = showFlashCardTitle ? 'text-lg' : 'text-sm';

  return (
    <div
      className={`shadow-lg p-2 m-2 w-80 h-48 cursor-pointer flex flex-row items-center justify-center font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'Jetbrains Mono', monospace" }}
      onClick={handleFlashCard}
    >
      {showFlashCardTitle ? title : description}
    </div>
  );
}

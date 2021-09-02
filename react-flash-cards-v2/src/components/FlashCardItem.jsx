import {
  AiOutlineEdit as EditIcon,
  AiOutlineDelete as DeletIcon,
} from 'react-icons/ai';

export default function FlashCardItem({
  children: flashCard,
  onDelete = null,
  onEdit = null,
}) {
  const { title, description } = flashCard;

  function handleDeleteIconClick() {
    if (onDelete) {
      onDelete(flashCard.id);
    }
  }

  function handleEditIconClick() {
    if (onEdit) {
      onEdit(flashCard);
    }
  }

  return (
    <div className="border p-2 m-2">
      <ul className="flex flex-col space-y-4">
        <li>
          <strong>Title:</strong> <span>{title}</span>
        </li>
        <li>
          <strong>Description:</strong> <span>{description}</span>
        </li>
      </ul>

      <div className="mt-4 flex flex-row justify-end space-x-4">
        <EditIcon
          className="cursor-pointer"
          size={24}
          onClick={handleEditIconClick}
        />
        <DeletIcon
          className="cursor-pointer"
          size={24}
          onClick={handleDeleteIconClick}
        />
      </div>
    </div>
  );
}

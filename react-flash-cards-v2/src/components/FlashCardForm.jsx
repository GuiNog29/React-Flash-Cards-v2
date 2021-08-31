import TextInput from './TextInput';
import TextArea from './TextArea';
import { useState } from 'react';

export default function FlashCardForm({ createMode = true }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const backgroundCLassName = createMode ? 'bg-green-100' : 'bg-yellow-100';

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  return (
    <form className={`${backgroundCLassName} p-4`}>
      <h2>Flash Card Maintenance</h2>

      <TextInput
        labelDescrition="Title:"
        inputValue={title}
        onInputChange={handleTitleChange}
      />
      <TextArea
        labelDescrition="Description:"
        textAreaValue={description}
        onTextAreaChange={handleDescriptionChange}
      />
    </form>
  );
}

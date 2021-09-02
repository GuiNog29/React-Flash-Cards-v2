import TextInput from './TextInput';
import TextArea from './TextArea';
import { useEffect, useState } from 'react';
import Button from './Button';
import Error from './Error';

export default function FlashCardForm({
  createMode = true,
  onPersist = null,
  children: flashCard = null,
}) {
  const [title, setTitle] = useState(flashCard?.title || '');
  const [description, setDescription] = useState(flashCard?.description || '');
  const [error, setError] = useState('');

  const backgroundCLassName = createMode ? 'bg-green-100' : 'bg-yellow-100';

  useEffect(() => {
    if (createMode) {
      setTitle('');
      setDescription('');
    }
  }, [createMode]);

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function clearFields() {
    setError('');
    setTitle('');
    setDescription('');
  }

  function validateForm() {
    return title.trim() !== '' && description.trim() !== '';
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      setError('');

      if (onPersist) {
        onPersist(title, description);
        clearFields();
      }
    } else {
      setError('Titulo e descrição são obrigatórios.');
    }
  }

  function handleFormReset() {
    clearFields();
  }

  return (
    <form
      className={`${backgroundCLassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <h2 className="text-center font-semibold">Flash Card Maintenance</h2>

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

      <div className="flex items-center justify-between">
        {error.trim() !== '' ? <Error>{error}</Error> : <span>&nbsp;</span>}

        <div>
          <Button colorButton="bg-red-300" type="reset">
            Clear
          </Button>

          <Button colorButton="bg-green-300" type="submit">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

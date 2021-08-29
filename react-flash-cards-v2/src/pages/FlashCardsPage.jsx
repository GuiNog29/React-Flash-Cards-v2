import FlashCards from '../components/FlashCards';
import FlashCard from '../components/FlashCard';
import Header from '../components/Header';
import Main from '../components/Main';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import RadioButton from '../components/RadioButton';
import { apiGetAllFlashCards } from '../service/apiService';
import Loading from '../components/Loading';

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [studyCards, setStudyCards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    async function getAllCards() {
      try {
        const backEndAllCards = await apiGetAllFlashCards();

        setAllCards(backEndAllCards);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }

    getAllCards();
  }, []);

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards);
  }

  useEffect(() => {
    setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleRadioShowTitle() {
    const updatedCards = [...studyCards].map(card => ({
      ...card,
      showTitle: true,
    }));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(true);
  }

  function handleRadioShowDescription() {
    const updatedCards = [...studyCards].map(card => ({
      ...card,
      showTitle: false,
    }));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);

    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyCards(updatedCards);
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (!loading) {
    mainJsx = 
    <>
      <div className="text-center mb-4">
        <Button onButtonClick={handleShuffle}>Shuffle Cards</Button>
      </div>

      <div className="flex flex-row items-center justify-center space-x-4 m-4">
        <RadioButton
          id="radioButtonShowTitle"
          name="showInfo"
          buttonChecked={radioButtonShowTitle}
          onButtonCLick={handleRadioShowTitle}
        >
          Show Title
        </RadioButton>

        <RadioButton
          id="radioButtonShowDescription"
          name="showInfo"
          buttonChecked={!radioButtonShowTitle}
          onButtonCLick={handleRadioShowDescription}
        >
          Show Description
        </RadioButton>
      </div>

      <FlashCards>
        {studyCards.map(({ id, title, description, showTitle }) => {
          return (
            <FlashCard
              key={id}
              id={id}
              title={title}
              description={description}
              showFlashCardTitle={showTitle}
              onToggleFlashCard={handleToggleFlashCard}
            />
          );
        })}
      </FlashCards>
    </>;
  }

  return (
    <>
      <Header>React-Flash-Cards-v2</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}

import { useEffect, useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import FlashCards from '../components/FlashCards';
import FlashCard from '../components/FlashCard';
import Header from '../components/Header';
import Main from '../components/Main';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import Loading from '../components/Loading';
import Error from '../components/Error';
import FlashCardItem from '../components/FlashCardItem';

import { helperShuffleArray } from '../helpers/arrayHelpers';
import { apiDeleteFlashCard, apiGetAllFlashCards } from '../service/apiService';
import FlashCardForm from '../components/FlashCardForm';
import { getNewId } from '../service/idService';

export default function FlashCardsPage() {
  //Back-End
  const [allCards, setAllCards] = useState([]);

  // Exclusivo para estudo
  const [studyCards, setStudyCards] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

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

  async function handleDeleteFlashCard(cardId) {
    try {
      // Back-End
      await apiDeleteFlashCard(cardId);

      // Front-end
      setAllCards(allCards.filter(card => card.id !== cardId));
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEdiFlashCard(card) {
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedFlashCard(card);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  function handlePersist(title, description) {
    if (createMode) {
      setAllCards([...allCards, { id: getNewId, title, description }]);
    } else {
      setAllCards(
        allCards.map(card => {
          if (card.id === selectedFlashCard.id) {
            return { ...card, title, description };
          }
          return card;
        })
      );

      setSelectedFlashCard(null);
      setCreateMode(true);
    }
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = (
      <div className="text-center">
        <Error>{error}</Error>
      </div>
    );
  }

  if (!loading) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {allCards.map(flashCard => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onDelete={handleDeleteFlashCard}
                  onEdit={handleEdiFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>

          <TabPanel>
            <div className="my-4">
              <Button onButtonClick={handleNewFlashCard}>New Flash Card</Button>
            </div>
            <FlashCardForm createMode={createMode} onPersist={handlePersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>

          <TabPanel>
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
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <Header>React-Flash-Cards-v2</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}

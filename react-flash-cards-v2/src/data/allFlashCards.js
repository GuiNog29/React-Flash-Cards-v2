import { getNewId } from '../service/idService';

export const allFlashCards = [
  {
    title: 'JSX',
    description:
      'JavaScript and XML. Markup language that can be used to create React components in a more declarative way. It s very similar to HTML..',
  },
  {
    title: 'React',
    description:
      'Library created by Facebook for optimized rendering. It can be used on various platforms such as web, mobile and Virtual Reality.',
  },
  {
    title: 'React Component',
    description:
      'Represents code reusable by React. As a rule, it must start with a capital letter. Can be customizable through props',
  },
  {
    title: 'Hooks',
    description:
      'Structures that are coupled to functions to increase the power of React components. They can allow the use of status and management of side effects, for example.',
  },
  {
    title: 'Function Components',
    description:
      'Role-based components. They are widely used today in detriment to Class Components, which can gradually become obsolete.',
  },
  {
    title: 'useState',
    description:
      'Native React hook that allows application and component state management.',
  },
  {
    title: 'State',
    description:
      "Also known as 'state'. It can be represented by 'data that changes over time' and which can also be manipulated by users, usually through forms, and also by API's, other components, etc.",
  },
  {
    title: 'Side Effects',
    description:
      "Também conhecido como 'side effects'. Representa tudo o que o React não controla diretamente. Bons exemplos são a manipulação manual do DOM e requisições HTTP.",
  },
  {
    title: 'useEffect',
    description: 'React Native Hook to Handle Side Effects.',
  },
  {
    title: 'Virtual DOM',
    description:
      'Structure used by React for in-memory DOM manipulation. Allows updating the real DOM only where necessary, which can ensure better application performance.',
  },
]
  .map(item => {
    return { id: getNewId(), ...item, showTitle: true };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

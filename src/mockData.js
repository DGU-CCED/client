import { v4 as uuidv4 } from 'uuid';

const mockData = [
  {
    id: uuidv4(),
    title: ' 📃 To do',
    tasks: [
      {
        id: uuidv4(),
        content: ['1'],
      },
    ],
  },
  {
    id: uuidv4(),
    title: ' ✏️ In progress',
    tasks: [
      {
        id: uuidv4(),
        content: '2',
      },
    ],
  },
  {
    id: uuidv4(),
    title: ' ✔️ Completed',
    tasks: [
      {
        id: uuidv4(),
        content: '3',
      },
    ],
  },
];

export default mockData;

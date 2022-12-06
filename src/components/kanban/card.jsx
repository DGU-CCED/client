const nextId = useRef(4);
const onInsert2 = useCallback(
  (text) => {
    const card = {
      id: nextId.current,
      text,
      checked: false,
    };
    setCards(cards.concat(card));
    nextId.current += 1;
  },
  [cards]
);

const onRemove2 = useCallback(
  (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  },
  [todos]
);

const onToggle = useCallback(
  (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  },
  [todos]
);

const CardTemplate = ({ children }) => {
  return (
    <div className="Card">
      <div className="contents">{children}</div>
    </div>
  );
};

const CardInsert = ({ onInsert2 }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert2(value);
      setValue(''); // value 값 초기화

      //submit 이벤트는 브라우저에서 새로고침을 발생시킵니다.
      //이를 방지하기 위해 이 함수를 호출합니다.
      e.preventDefault();
    },
    [onInsert2, value]
  );

  const onClick = useCallback(() => {
    onInsert2(value);
    setValue(''); // value 값 초기화
  }, [onInsert2, value]);

  return (
    <form className="CardInsert">
      <input
        className="kanban_insert"
        placeholder="추가할 작업을 입력하세요."
      />
      <button className="kanban_insert_button">+</button>
    </form>
  );
};

const CardListItem = ({ card, onRemove2, onToggle }) => {
  const { id, text, checked } = card;
  return (
    <div className="CardListItem">
      <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={() => onRemove2(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

const CardList = ({ cards, onRemove2, onToggle }) => {
  return (
    <div className="CardList">
      {cards.map((card) => (
        <TodoListItem
          card={card}
          key={card.id}
          onRemove2={onRemove2}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

const [cards, setCards] = useState([]);

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  createRef,
  createContext,
  useContext,
  useReducer
} from "react";
import { Header, Body, Section, Selector } from "./styles";
import DragSelect from "dragselect";
import { Cell } from "./Cell";
import { selectContext as SelectContext } from "./selectContext";

let tablecsv = `
firstname:lastname:age:gender
viktor:lott:25:male
sandra:olsson:24:female
jens:lott:23:male
pantor:lott:13:male
fia:lott:50:male
`;

tablecsv = tablecsv.trimLeft().trimRight();

function ParseCsv(table) {
  return table.split("\n").map(row => row.split(":"));
}

function createAllRefs(data) {
  let flat = [];
  data.map(item => item.map(col => void flat.push(createRef())));
  return flat;
}

function selectedReducer(state = { selectedKeys: [] }, action) {
  switch (action.type) {
    case "NEW":
      return {
        ...state,
        selectedKeys: action.payload
      };
    case "ADD":
      return {
        ...state,
        selectedKeys: [...state.selectedKeys, action.payload]
      };
    case "REMOVE":
      return {
        ...state,
        selectedKeys: state.selectedKeys.filter(value => value.id !== action.id)
      };
    default:
      return state;
  }
}

function make(els) {
  return {
    type: "NEW",
    payload: els.map(el => ({
      element: el,
      id: Math.floor(Math.random() * Date.now() * 100000)
    }))
  };
}

// function useSelection() {
//   const \$0a = useRef();

//   useEffect(() => {
//     ds.current = new DragSelect({
//       callback: es => {
//         dispatch(make(es));
//       },
//       hoverClass: "he",
//       onElementSelect: element => {
//         element.classList.add("se");
//       },
//       onElementUnselect: element => {
//         element.classList.remove("se");
//       }
//     });

//     refs.forEach(ref => {
//       ds.current.addSelectables(ref.current);
//     });

//   }, []);
// }

// const usePrevious = prev => {
//   const store = useRef(null);
//   useEffect(() => {

//     store.current = prev;
//   }, [prev]);
//   return store.current;
// };
const InputTable = () => {
  const [state, dispatch] = useReducer(selectedReducer);
  const parsed = useMemo(() => ParseCsv(tablecsv), []);
  const refs = useMemo(() => createAllRefs(parsed), []);
  const ds = useRef();
  const sel = useRef();

  const container = useRef();

  useEffect(() => {
    ds.current = new DragSelect({
      customStyles: false,
      selector: sel.current,
      callback: es => {
        dispatch(make(es));
      },
      hoverClass: "he",
      onElementSelect: element => {
        element.classList.add("se");
      },
      onElementUnselect: element => {
        element.classList.remove("se");
        // element.blur();
        // console.log(ds.current.getPreviousCursorPosition());
      }
    });

    refs.forEach(ref => void ds.current.addSelectables(ref.current));
  }, []);

  useEffect(() => {
    console.count("COUnt render");
  });
  return (
    <SelectContext.Provider value={{ getSelected: state }}>
      <Section>
        <TableBuilder refs={refs} tablecsv={parsed} />
        <Selector ref={sel} style={{ border: "1px dashed gray" }} />
      </Section>
    </SelectContext.Provider>
  );
};

const TableBuilder = props => {
  let n = 0;
  return props.tablecsv.map((row, ind) => {
    if (ind === 0) {
      return (
        <Header key={ind}>
          {row.map((col, i) => (
            <Cell key={i} ref={props.refs[n++]}>
              {col}
            </Cell>
          ))}
        </Header>
      );
    } else {
      return (
        <Body key={ind}>
          {row.map((col, i) => {
            return (
              <Cell key={i} ref={props.refs[n++]}>
                {col}
              </Cell>
            );
          })}
        </Body>
      );
    }
  });
};

const wppapp = 2e10;
const wpp = 10;
console.log(wppapp);
export default InputTable;

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
import { Input, CellWrapper, EditorContainer } from "./styles";
// import DragSelect from "dragselect";
import { selectContext as SelectContext } from "./selectContext";
import { evaluateExpression } from "./shunting";
const Key = {
  CTLR: 91,
  Z: 90
};

evaluateExpression("", "4");

function cellReducer(state = [], action) {
  switch (action.type) {
    case "ADD":
      return state.concat(action.payload);
    case "UNDO":
      return state.length > 1 ? state.splice(0, state.length - 1) : state;
    default:
      return state;
  }
}

function BindDispatch(dispatch) {
  return (action, text) => dispatch({ type: action, payload: text });
}

export const Cell = React.forwardRef((props, ref) => {
  const [state, dispatch] = useReducer(cellReducer, [props.children]);
  const [ctrl, setCtrl] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isEditor, setisEditor] = useState(false);
  const [editor, setEditor] = useState("");

  // const [rule, setRule] = useState("");
  const ds = useContext(SelectContext);

  useEffect(() => {
    ref.current.dispatchAction = BindDispatch(dispatch);
    return () => {
      ref.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isEditor) {
    }
  }, [isEditor]);

  const handleChange = useCallback(e => {
    ds.getSelected.selectedKeys.forEach(target => {
      target.element.dispatchAction("ADD", e.target.value);
    });
  });

  const handleKeyDown = useCallback(e => {
    e.stopPropagation();
    if (e.keyCode === Key.Z && ctrl && state.length > 1) {
      e.preventDefault();
      ds.getSelected.selectedKeys.forEach(target => {
        target.element.dispatchAction("UNDO");
      });
    }
    if (e.keyCode === Key.CTLR && !ctrl) {
      e.preventDefault();
      setCtrl(true);
    }
  });
  const handleKeyUp = useCallback(e => {
    e.stopPropagation();
    if (e.keyCode === Key.CTLR) ctrl && setCtrl(false);
  });

  // const handleFocus = useCallback(e => {
  //   setHasFocus(true);
  // });
  // const handleBlur = useCallback(e => {
  //   setHasFocus(false);
  //   e.target.blur();
  // });
  // const handleClick = useCallback(e => {
  //   if (ctrl) {
  //     // console.log(ctrl);
  //     if (hasFocus) {
  //       ref.current.blur();
  //       setHasFocus(false);
  //     } else {
  //       ref.current.focus();
  //       setHasFocus(true);
  //     }
  //   }
  // });
  // console.log(evaluateExpression(editor, state[state.length - 1]));
  return (
    <CellWrapper>
      <Input
        className="selectable"
        onChange={isEditor ? e => setEditor(e.target.value) : handleChange}
        value={isEditor ? editor : state[state.length - 1]}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        ref={ref}
        isEditor={isEditor}
        selected={isEditor}
        validated={
          !isEditor && editor.length > 1
            ? evaluateExpression(editor, state[state.length - 1])
            : true
        }
        // onMouseDown={handleClick}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
      />
      {true && <EditorContainer onClick={e => setisEditor(!isEditor)} />}
    </CellWrapper>
  );
});

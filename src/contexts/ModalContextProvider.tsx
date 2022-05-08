import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  Reducer,
  useReducer,
} from "react";
import CopyModal from "../modals/CopyModal";
import { reducerActionType, reducerContextType } from "./ModalTypes";


interface modalContextType extends reducerContextType {
  actions: Dispatch<reducerActionType> | (()=>void);
}

// type reducerContextType = {
//   type: modalType;
// };


export const ModalContext = createContext<modalContextType>({
  type: null,
  actions: ()=>{}
});

const reducerdefaultvalue: reducerContextType = {
  type: null,
};

const reducerfunc: Reducer<reducerContextType, reducerActionType> = (
  state,
  action
) => {
  if (action === "onclose") {
    return { ...state, type: null };
  }
  if (action.type === "copy"){
    //   console.log("copy")
      return {...state,data:{shorturl:action.data},type:"copy"}
  }
  return state;
};

const ModalContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [value, actions] = useReducer(reducerfunc, reducerdefaultvalue);
  return (
    <ModalContext.Provider value={{ ...value, actions }}>
      <CopyModal/>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;

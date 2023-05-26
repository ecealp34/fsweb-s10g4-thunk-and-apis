import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,

};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

// localStorage.clear()

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      if(state.favs.find((f)=> (f.id === action.payload.id))) 
      return state;
      const newState = { ...state, favs: [...state.favs, action.payload] };
      writeFavsToLocalStorage(newState);
      return newState;


    case FAV_REMOVE:
       const removedFavsState = {
        ...state,
        favs: state.favs.filter((f) => f.id !== action.payload),
      };
      writeFavsToLocalStorage(removedFavsState);
      return removedFavsState;


    case FETCH_SUCCESS:
      return {
        ...state,
        current: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ERROR:
      return  { ...state, loading: false, error: action.payload, current: null };


    case GET_FAVS_FROM_LS:
      return {
        ...state,
        favs: readFavsFromLocalStorage() ?? initial.favs,
      };

    default:
      return state;
  }
}

import React from "react";
import { removeFav } from "../actions";
import { useDispatch } from "react-redux";

function FavItem({ title, id }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-blue-700 text-white shadow-xl hover:shadow-lg p-3 pl-5 flex items-center group transition-all">
      <div className="flex-1 pr-4">{title}</div>
      <button
        onClick={() => dispatch(removeFav(id))}
        className="transition-all px-4 py-2 block text-sm rounded bg-purple-700 text-white opacity-30 group-hover:opacity-100"
      >
        Çıkar
      </button>
    </div>
  );
}

export default FavItem;

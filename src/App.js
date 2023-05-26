import React, {useEffect} from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { fetchAnother, addFav, getFavsFromLocalStorage } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const loading = useSelector((store) => store.loading);
  const current = useSelector((store) => store.current);
  const favs = useSelector((store) => store.favs);
  const error = useSelector((store) => store.error);
  
  function addToFavs() {
    dispatch(addFav(current));
    toast.success("Tebrikler! Favorinize eklendi.")
    setTimeout(() => {
      dispatch(fetchAnother());
    }, "5500");
  }
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavsFromLocalStorage());
    dispatch(fetchAnother());
  }, []);

  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-md text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-md text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && ( <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>)}
          {error && (
            <div className="bg-white p-6 text-center shadow-md">
              Hata: {error}
            </div>
          )}
          
          {current && !loading && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button
             onClick={() => dispatch(fetchAnother())}
              className="select-none px-4 py-2 border border-blue-700 text-pink-400 bg-blue-500 hover:border-blue-500 hover:text-rose-500"
            >
              Başka bir tane
            </button>
            <>
            <ToastContainer/>
            </>
            <button
              onClick={addToFavs} 
              className="select-none px-4 py-2 text-white transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-100 hover:bg-pink-400 duration-3000 "
            >
              Favorilere ekle
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0
              ? favs.map((item) => (
                <FavItem key={item.id} id={item.id} title={item.setup} />
              ))
              : <div className="bg-white p-6 text-center shadow-md">Henüz bir favoriniz yok</div>
            }
          </div>
        </Route>
      </Switch>
    </div>
  );
}

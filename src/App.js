import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBar';
import { useCallback, useEffect, useState } from 'react';
import countries from "./Utils/Countries"

function App() {
  const [query, setQuery]= useState("");
  const [suggestions, setSuggestions]= useState([]);

  const queryHandler= useCallback((val)=>{
    setQuery(val);
  },[]);

  useEffect(()=>{
    if(query==="")
    {
      setSuggestions([]);
    }
    else{
      let newCountrySuggestions= countries.filter(item=>{
       return item.country.toLowerCase().indexOf(query)!==-1? true:false;
      }).map(item=> item.country);
      setSuggestions(newCountrySuggestions)
    }
  },[query]);
  return (
    <div className="App">
     <h2>Search bar psc</h2>
     <h4>The search query is "{query}"</h4>
     <SearchBar inputQueryHandler={queryHandler} suggestions={suggestions}/>
    </div>
  );
}

export default App;

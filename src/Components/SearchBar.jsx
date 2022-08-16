import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react'
import styled from "styled-components";
import { useThrottle } from 'use-throttle';

const SearchBar = ({inputQueryHandler, suggestions}) => {
    const [inputText, setInputText]= useState("");
    const [active, setActive]= useState(0);
    const scrollRef= useRef();

    const handleInputTextChange= (e)=>{
        setInputText(e.target.value);
    };
    
     const throttledText= useThrottle(inputText,1000);

     useEffect(()=>{
        inputQueryHandler(throttledText);
     },[throttledText,inputQueryHandler])

    // useEffect(()=>{
    //     inputQueryHandler(inputText);
    // },[inputText,inputQueryHandler]);

    const handleActiveSuggestions=(e) =>{
        switch(e.keyCode){
            case 38:
                if(active===1)
                {
                    scrollRef.current.scrollTop=suggestions.length*38.667;
                    setActive(suggestions.length);
                }
                if(active<=suggestions.length-3){
                    scrollRef.current.scrollTop -= 38.667;
                }
                setActive((prev)=> prev-1);
                break;
            
            case 40:

            if (active===suggestions.length)
            {
                scrollRef.current.scrollTop=0;
                setActive(0);
            }

            if(active>=4){
                scrollRef.current.scrollTop += 38.667;
            }
                setActive((prev)=> prev+1);
                break;

            default: return;
        }
    }
  return (
    <Wrapper onKeyUp={handleActiveSuggestions}>
    <SearchBarWrapper>
        <InputWrapper value={inputText} onChange={handleInputTextChange} />
    </SearchBarWrapper>
    {suggestions.length>0 && (
    <SearchBarSuggestion ref={scrollRef} active={active} limit={5}>
    {suggestions.map((item, index)=>{
        return (<div key={index} onMouseOver={()=>{
            setActive(index+1)
        }}>{item}</div>)
    })}
    </SearchBarSuggestion>
    )}
    </Wrapper>
  )
}

export default SearchBar;

const SearchBarWrapper= styled.div`
border:1px solid black;
display:flex;
padding: 5px 10px;
align-items:center;
`;

const InputWrapper= styled.input`
flex:1;
font-size:20px;
border:none;
outline:none;
`;

const Wrapper = styled.div`
max-width:400px;
margin:auto;
`;

const SearchBarSuggestion= styled.div`
border:1px solid black;
display:flex;
flex-direction: column;
flex: 0 0 auto;
margin:auto;
max-height: ${({limit})=> `${limit*38.667}px`};
max-height: 200px;
overflow:auto;

& * {
    // border: 1px solid blue;
    text-align: left;
    padding: 10px;
    padding-left:20px;
}

& :nth-child(${({active} )=>active}){
    background: rgba(0,0,0,0.08)
}
`;
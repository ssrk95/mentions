import { useState, useEffect, useRef } from "react";
import Mentions from "./Mentions";

function App(){

    const [text, setText] = useState('');
    const [nameArr, setNameArr] = useState([]);
    const [suggestion, setSuggestion] = useState(false);
    const [mentionVal, setMentionVal] = useState('');

    const inputRef = useRef(null);

    //Getting the JSON data
    useEffect(() => {
        const fetchJsonData = async () => {
            try {
              const res = await fetch('https://raw.githubusercontent.com/SquadcastHub/frontend-assignment/main/data.json');
              if (!res.ok) {
                throw new Error('API error');
              }
              const result = await res.json();
              result.forEach(element => {
                    let name = element.first_name + ' ' + element.last_name;
                    setNameArr(nameArr => [...nameArr, name]);
              });
            } catch (error) {
                console.log('error receiving json data: ', error);
            }
          };
      
        fetchJsonData();
    },[]);

    //Input onChange handler
    const handleInputChange = e => {
        try{
            let value = e.target.value;
            let lastAtIndex = value.lastIndexOf('@');
            if(lastAtIndex !== -1){
                let textAfter = value.substring(lastAtIndex + 1);
                if(textAfter.includes(' ')){
                   setSuggestion(false); 
                }else{
                    setSuggestion(true);
                    setMentionVal(textAfter);
                }
            }else{
                setSuggestion(false);
            }
            setText(e.target.value);
        }catch(err){
            console.log('error in handleInputChange method in App.js: ', err);
        }
    }

    //if the mention value is not found in the json data
    const noOptionFound = e => {
        try{
            setSuggestion(false);
        }catch(err){
            console.log('error in noOptionFound method in App.js: ', err);
        }
    }

    //when an option in the dropdown is clicked
    const selectOption = selectedOption => {
        try{
            let lastAtIndex = text.lastIndexOf('@');

            if(lastAtIndex !== -1){
                let textAfter = text.substring(lastAtIndex + 1);
                let updatedText = text.substring(0, lastAtIndex+1) + selectedOption + ' ' + text.substring(lastAtIndex + textAfter.length + 1);

                setText(updatedText);
            }
            
            setSuggestion(false);

            if (inputRef.current) {
                inputRef.current.focus();
            }
        }catch(err){
            console.log('error in selectOption method in App.js: ', err);
        }
    }

    return (
        <div className="mainDiv">
            <div className="inputField">
                <input ref={inputRef} placeholder="Mention" onChange={handleInputChange} value={text}/>
            </div>
            {suggestion && <Mentions options={nameArr} value={mentionVal} noOptionFound={noOptionFound} selectOption={selectOption}/>}
        </div>
    )
}

export default App;
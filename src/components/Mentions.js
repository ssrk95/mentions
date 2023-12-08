import { useEffect, useState } from "react";

function Mentions({options, value, noOptionFound, selectOption}){

    const [finalOptions, setFinalOptions] = useState([]);

    //Filtering the options based on user input
    useEffect(() => {
      let newOptions = options.filter(option => option.toLowerCase().includes(value.toLowerCase()));
      setFinalOptions(newOptions);
      if(newOptions.length === 0)
        noOptionFound();
    },[options, noOptionFound, value]);


    //when an option from the dropdown is clicked
    const handleOptionClick = item => {
      try{
        selectOption(item);
      }catch(err){
        console.log('error in handleOptionClick method in Mentions component: ', err);
      }
    }

    return(
        <div className="mentionsDiv">
            {finalOptions.map((item, index) => <div className="optionDiv" key={index} onClick={() => handleOptionClick(item)}>{item}</div>)}
        </div>
    )
}

export default Mentions;
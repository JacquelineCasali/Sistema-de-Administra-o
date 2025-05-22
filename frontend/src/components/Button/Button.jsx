
import { TiArrowRight } from 'react-icons/ti'

import  "./Button.css";
export default function Button(props) {
  return (
    <button className={`${"btn"} ${props.theme === "amarelo" ?  "amarelo" : "roxo" }`}>
     {props.text}
  
          {/* <TiArrowRight
        size={34}
        
      /> */}
          </button>
  )
}


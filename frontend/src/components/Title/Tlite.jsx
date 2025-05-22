


import "./styles.css"



export default function Title(props) {
  return <h1 className={`${"h1-title"} ${props.theme === "h1" ?  "h1" : "h2" }`}
  
  
  >{props.text}</h1>
   
  
 
}

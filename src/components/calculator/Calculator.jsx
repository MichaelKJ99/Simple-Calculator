import "../../styles/Calculator.css"

import Button from "../button/Button"
import TextField from "../textfield/TestField"
import { useState } from "react"

const ciphers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const mathSigns = ["+", "-", "x", "/", ".", "=", "C"]

const Calculator = () => {
  const [actualText, setActualText] = useState("")
  const [previousValue, setPreviousValue] = useState("")
  const [currentSign, setCurrentSign] = useState("")
  const [isCleared, setIsCleared] = useState(false)
  
  const checkSign = sign => {
    if (ciphers.includes(sign)) {
      return "cipher"
    }
    else {
      return "sign"
    }
  }
  
  const updateValue = sign => {
    const updatedSign = sign[sign.length - 1]
    const checkResult = checkSign(updatedSign)
    if (checkResult === "cipher") {
      if (["+", "-", "x", "/"].includes(currentSign) && !isCleared) {
        setActualText("")
        setIsCleared(true)
      }
      setActualText(actualText => actualText + updatedSign)
    }
    else if (checkResult === "sign") {
      if (sign === "=") {
        if ((previousValue || previousValue == 0) && (actualText || actualText == 0)) {
          switch (currentSign) {
            case "+":
              setActualText(parseFloat(previousValue) + parseFloat(actualText))
              break
            case "-":
              setActualText(parseFloat(previousValue) - parseFloat(actualText))
              break
            case "x":
              setActualText(parseFloat(previousValue) * parseFloat(actualText))
              console.log("aaa")
              break
            case "/":
              if (actualText == 0) {
                alert("Division by 0!")
                setActualText("")
              }
              else {
                setActualText(parseFloat(previousValue) / parseFloat(actualText))
              }
              break
            default:
          }
          setCurrentSign("")
          setIsCleared(false)
        }
      } else if (updatedSign === ".") {
        if(!(actualText.toString().includes(".")))
          setActualText(actualText + ".")
      }
      else if (updatedSign === "C") {
        setActualText("")
        setPreviousValue("")
        setCurrentSign("")
      }
      else {
        (actualText || actualText == 0) && setPreviousValue(actualText)
        setCurrentSign(updatedSign)
      }
    }    
  }

  return (
    <div className="main_wrapper">
      <TextField actualText={actualText} setActualText={updateValue} className="display" />
      <div className="buttons">
        <div className="ciphers">
          {ciphers.map(sign => <Button key={sign} value={sign} onClick={() => updateValue(sign)} className={`btn-${sign}`}/>)}
        </div>
        <div className="operators">
          {mathSigns.map(sign => <Button key={sign} value={sign} onClick={() => updateValue(sign)} className={`btn-opr`}/>)}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
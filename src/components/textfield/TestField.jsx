const TextField = ({className, actualText, setActualText}) => {
  
  return (
    <input className={className} onChange={(e) => setActualText(e.target.value)} value={actualText}></input>
  );
}

export default TextField;
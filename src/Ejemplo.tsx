

interface ButtonProps{
text?: string;
}

function Button(props:ButtonProps){
  return <button className="bg-violet-500 px-4 h-10 rounded">{props.text ?? "default"}</button>
}


function Ejemplo() {
  return (
<>
<div className="flex gap-2">
<Button text= "hola"/>
<Button text= 'ok'/>
<Button/>
   

</div>
</>
)  
}

export default Ejemplo
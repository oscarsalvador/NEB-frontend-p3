import React, {FC, useState} from "react"

type TCharacter = {
	name: string,
	url: string,

	campo1: string,
	campo2: string,
	campo3: string
}

const Character:FC<{details: TCharacter}> = ({details}) =>{
	const [nombre, setNombre] = useState<TCharacter>(details);
	const [upcase, setUpcase] = useState<boolean>(false);

	// const pintaDetalle = (nombre: any) : any =>{
	// 	// let bigDiv = document.getElementById(nombre.name);
	// 	let totalDiv = "";
	// 	let evitar: string[] = ["name", "created", "edited", "url"]
	// 	Object.entries(nombre).forEach(([key, value]) =>{
	// 		if(evitar.includes(key)) return;
			
	// 		// let newDiv = document.createElement("li");
	// 		let newDiv = `<div>${key} ${value}</div>`;
	// 		totalDiv += newDiv;
	// 		// newDiv.innerText = `${key} ${value}`;
	// 		// bigDiv?.appendChild(newDiv)
			
	// 	})
	// 	// console.log(totalDiv)
	// 	return <div>{totalDiv}</div> ;// <h1>Hola</h1>
	// 	// if(bigDiv!.childNodes.length > 1) {
	// 	// 	bigDiv!.innerHTML = '';
	// 	// }
	// }
	
	return <div onClick={(e) => {
		let actual = document.getElementById(nombre.name);
		actual!.style.display == "inline"? actual!.style.display = "none" : actual!.style.display = "inline";

		upcase? setUpcase(false) : setUpcase(true);
	}}>
		{upcase? <u>{nombre.name}</u> : nombre.name}
		<ul id={nombre.name} style={{display: 'none'}}>
			<li>{nombre.campo1}</li>
			<li>{nombre.campo2}</li>
			<li>{nombre.campo3}</li>
		</ul>
		<br/>
	</div>
	
}

export default Character;


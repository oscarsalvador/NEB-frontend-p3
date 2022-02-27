import React, {FC, useState, useEffect} from "react"
import Character from "./Character"

type TCharacter = {
	name: string,
	url: string,

	campo1: string,
	campo2: string,
	campo3: string
}
const Contador:FC = () =>{
	const getChars = async (pagina: number, busqueda: string) =>{
		try{
			const dicc : {[cat: string] : [arr : string[]]} = {
				"planets" 	: [["Diameter", 	"Terrain",			"Population"]], 
				"people" 	: [["Height", 		"Hair Color", 		"Gender"]], 
				"starships" : [["Length", 		"Starship Class",	"Hyperdrive Rating"]]
			};

			const response = await fetch(`https://swapi.dev/api/${categoria}/?search=${busqueda}&page=${pagina}`)
			const data = await response.json();

			let newChars: TCharacter[] = [];
			data.results.forEach((e: any) => {
				let newChar: TCharacter = {
					name: e.name,
					url: e.url,

					campo1: dicc[categoria][0][0] + ": " + (e.diameter 		|| e.height 	|| e.length),
					campo2: dicc[categoria][0][1] + ": " + (e.terrain		|| e.hair_color || e.starship_class),
					campo3: dicc[categoria][0][2] + ": " + (e.population 	|| e.gender 	|| e.hyperdrive_rating),
				}
				// console.log(newChar)
				newChars.push(newChar);
				// newChar.name = any.name;
			})

			console.log(newChars);
			let lista: TCharacter[] = chars;
			console.log("antes");
			console.log(lista.concat(newChars));
			setChars(lista.concat(newChars));
			console.log("despues");
			console.log(lista);
			setIScroll(false);
			console.log(chars);
			// console.log(pagina);
			// if(data.next != null) pagina++;
		} catch (e) {
			console.error(e);
		}
	}
	//hooks, [estado, funcion_para_modificar_estado], al actualizar, se re-renderiza
	// const [chars, setChars] = useState<TCharacter[]>([]);
	const [chars, setChars] = useState<TCharacter[]>([]);
	const [valor, setValor] = useState<string>("");



	useEffect(() => {
		window.addEventListener("scroll", (e: Event)=>{
			var {scrollTop, scrollHeight, clientHeight} = document.documentElement;
			console.log("manejando evento")
			if(scrollTop + clientHeight >= scrollHeight -5){
				console.log("close to bottom")
				if(!iScroll) setIScroll(true);
			}
		});
	}, 
		[]
	);
	
	const [numero, setNumero] = useState<number>(1);
	const [categoria, setCategoria] = useState<string>("people");
	const [iScroll, setIScroll] = useState<boolean>(false);

	const aaa = (e: string) =>{
		console.log(categoria)
		setCategoria(e);
		console.log(categoria)
	}

	useEffect(() =>{
		getChars(numero, valor);
	},
		[valor, categoria, numero]
	)

	useEffect(() =>{
		if(iScroll){
			setNumero(numero +1);
		}
	},
		[iScroll]
	)
	return (
		<div>
			<input type="string" value={valor} onChange={(e)=>{
				setValor(e.target.value);
				setNumero(1);
				setChars([]);
			}}></input>		
			<select onChange={(e)=>{
					aaa(e.target.value)
					setNumero(1);
					setChars([]);
				}}>
					<option>people</option>
					<option>planets</option>
					<option>starships</option>
			</select>
			<div>
				{chars.length === 0 && <div>loading</div>}
				{chars.map(char => 
					// <Character  key={char.url} name={char.name}/>
					<Character  key={char.url} details={char}/>
					// <p>{char.name}</p>
				)}
			</div>
			<button onClick={()  =>{
				setNumero(numero +1);
				console.log("numero" + (numero+1));
				//getChars(numero +1, valor);
			}}>Siguiente</button>
		</div>
	);
};

export default Contador;
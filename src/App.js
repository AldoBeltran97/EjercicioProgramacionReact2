import { useState } from "react";

let idConsecutivo = 1
const listaInicial = [
  {id: idConsecutivo++, jugador1: 0, jugador2: 0}
]

export default function Planilla() {
  const [NumRondas, setNumRondas] = useState(1);
  const [ListaPuntosjugadores, setListaPuntosjugadores] = useState(listaInicial)
  const [Ganador, setGanador] = useState("")
  const [PuntosVentaja, setPuntosVentaja] = useState(0)


  const handleClick = () => {
    let ListaAux = [];
    let ganador
    let difer = 0
    for(let i = 0; i < ListaPuntosjugadores.length; i++){
      if(ListaPuntosjugadores[i].jugador1 > ListaPuntosjugadores[i].jugador2){
        if((ListaPuntosjugadores[i].jugador1 - ListaPuntosjugadores[i].jugador2) > difer){
          difer = ListaPuntosjugadores[i].jugador1 - ListaPuntosjugadores[i].jugador2
          ganador = 1
        }
      }
      else{
        if((ListaPuntosjugadores[i].jugador2 - ListaPuntosjugadores[i].jugador1) > difer){
          difer = ListaPuntosjugadores[i].jugador2 - ListaPuntosjugadores[i].jugador1
          ganador = 2
        }
      }
    }
    console.log("difer: " + difer, "ganador: " + ganador)

    setGanador(ganador)
    setPuntosVentaja(difer)
  };

  const onChangeRondas = (e) => {

    if(NumRondas < Number(e.target.value)){
      ListaPuntosjugadores.push({
        id: Number(e.target.value), 
        jugador1: 0, 
        jugador2: 0
      })
    }
    else{
      ListaPuntosjugadores.splice(Number(e.target.value), 1)
      idConsecutivo--
    }

    setListaPuntosjugadores(ListaPuntosjugadores)
    setNumRondas(Number(e.target.value))


  }

  const onChangeJugador1 = (e) => {

    const ListaAux = [...ListaPuntosjugadores]
    const jugador1 = ListaAux.find(a => a.id === Number(e.target.id))

    jugador1.jugador1 = Number(e.target.value)

    setListaPuntosjugadores(ListaAux)
  }

  const onChangeJugador2 = (e) => {

    const ListaAux = [...ListaPuntosjugadores]
    const jugador2 = ListaAux.find(a => a.id === Number(e.target.id))

    jugador2.jugador2 = Number(e.target.value)

    setListaPuntosjugadores(ListaAux)
  }

  //console.log(ListaPuntosjugadores)

  return (
    <div>
      <h1 style={{ maxWidth: 850, margin: "30px auto"}}>Ejercicio 2</h1>
      <div style={{ maxWidth: 400, margin: "40px auto", display: "grid", gap: 12 }}>
        <div style={{ display: "grid", margin: "10px auto" , gridTemplateColumns: "100px 15CH" }}>
          <h4 style={{ margin: "10px auto" }}>RONDAS</h4>
          <input
              type="number"
              min={1}
              max={10000}
              value={NumRondas}
              onChange={(e) => onChangeRondas(e)}
              style={{ border: "1px solid black", padding: 8, minWidth: 0 }}
            />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          <h4 style={{ margin: "5px auto" }}>JUGADOR 1</h4>
          <h4 style={{ margin: "5px auto" }}>JUGADOR 2</h4>
        </div>
  {ListaPuntosjugadores.map((jugador) => {
    return(
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          <input
            id={jugador.id}
            type="number"
            min={0}
            value={jugador.jugador1}
            onChange={(e) => onChangeJugador1(e)}
            style={{ border: "1px solid black", padding: 8, minWidth: 0 }}
          />
          <input
            id={jugador.id}
            type="number"
            min={0}
            value={jugador.jugador2}
            onChange={(e) => onChangeJugador2(e)}
            style={{ border: "1px solid black", padding: 8, minWidth: 0 }}
          />
        </div>
    )
  })}
        <button onClick={handleClick}>Resultados</button>

        <div></div>
        <div></div>
        <div></div>
        <div style={{ display: "grid", margin: "10px auto" , gridTemplateColumns: "170px 15CH" }}><h2 style={{ margin: "5px" }}>GANADOR: </h2><h3 style={{ margin: "5px auto" }}>{Ganador != "" ? "Jugador " + Ganador : ""}</h3></div>
        <div style={{ display: "grid", margin: "10px auto" , gridTemplateColumns: "300px 15CH" }}><h2 style={{ margin: "5px" }}>PUNTOS DE VENTAJA: </h2><h3 style={{ margin: "5px auto" }}>{PuntosVentaja != "" ? PuntosVentaja : ""}</h3></div>
      </div>
    </div>
  );
}

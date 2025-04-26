import { useEffect, useState } from "react"
import Piece from "../interfaces/piece";
import ModalNewPiece from '../components/modalNewPiece'


const pieces: Piece[] = [
  {
    name: "C/F Cajon 1026",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "128.33",
    tipo: "CAJON"
  },
  {
    name: "Lat. Izq. Cajon 1026",
    material: "Blanco MDF",
    ancho: "128.33",
    largo: "450.00",
    tipo: "CAJON"
  },
  {
    name: "Base Cajon 1024",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "414.00",
    tipo: "CAJON"
  },
  {
    name: "Frente Cajon 1024",
    material: "Blanco MDF",
    ancho: "1217.00",
    largo: "186.33",
    tipo: "CAJON"
  },
  {
    name: "Lat. Der. Cajon 1026",
    material: "Blanco MDF",
    ancho: "128.33",
    largo: "450.00",
    tipo: "CAJON"
  },
  {
    name: "Sep. Vertical 1022",
    material: "Blanco MDF",
    ancho: "573.00",
    largo: "500.00",
    tipo: "BASE"
  },
  {
    name: "Lat. Izquierdo",
    material: "Blanco MDF",
    ancho: "1164.00",
    largo: "500.00",
    tipo: "BASE"
  },
  {
    name: "Base Cajon 1026",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "414.00",
    tipo: "CAJON"
  },
  {
    name: "Lat. Der. Cajon 1024",
    material: "Blanco MDF",
    ancho: "128.33",
    largo: "450.00",
    tipo: "CAJON"
  },
  {
    name: "C/F Cajon 1024 (2)",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "128.33",
    tipo: "CAJON"
  },
  {
    name: "Estante 1008",
    material: "Blanco MDF",
    ancho: "2464.00",
    largo: "500.00",
    tipo: "BASE"
  },
  {
    name: "C/F Cajon 1026 (2)",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "128.33",
    tipo: "CAJON"
  },
  {
    name: "Lat. Derecho",
    material: "Blanco MDF",
    ancho: "1164.00",
    largo: "500.00",
    tipo: "BASE"
  },
  {
    name: "Base Cajon 1028",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "414.00",
    tipo: "CAJON"
  },
  {
    name: "Frente Cajon 1028",
    material: "Blanco MDF",
    ancho: "1217.00",
    largo: "186.33",
    tipo: "CAJON"
  },
  {
    name: "Lat. Izq. Cajon 1024",
    material: "Blanco MDF",
    ancho: "128.33",
    largo: "450.00",
    tipo: "CAJON"
  },
  {
    name: "Puerta 1004 D",
    material: "Blanco MDF",
    ancho: "1194.00",
    largo: "1245.00",
    tipo: "PUERTA"
  },
  {
    name: "Lat. Izq. Cajon 1028",
    material: "Blanco MDF",
    ancho: "128.33",
    largo: "450.00",
    tipo: "CAJON"
  },
  {
    name: "Frente Cajon 1026",
    material: "Blanco MDF",
    ancho: "1217.00",
    largo: "186.33",
    tipo: "CAJON"
  },
  {
    name: "C/F Cajon 1024",
    material: "Blanco MDF",
    ancho: "1187.00",
    largo: "128.33",
    tipo: "CAJON"
  },
  {
    name: "Sep. Vertical 1011",
    material: "Blanco MDF",
    ancho: "573.00",
    largo: "500.00",
    tipo: "BASE"
  },
  {
    name: "Puerta 1004 I",
    material: "Blanco MDF",
    ancho: "1194.00",
    largo: "1245.00",
    tipo: "PUERTA"
  }
]

const PiecesList: React.FC = () => {

  const [totalMeters, setTotalMeters] = useState(0);
  const [piecesFiltered, setPiecesFiltered] = useState<Piece[]>([]);
  const [selector, setSelector] = useState("Todos");
  const [showModalNewPiece, setShowModalNewPiece] = useState(false);

  useEffect(() => {

    let totalMetersAux = 0

    pieces.map((pieza) =>
      totalMetersAux = + ((parseFloat(pieza.ancho)) * (parseFloat(pieza.largo)))
    )

    setTotalMeters(totalMetersAux)

  }, [pieces])

  useEffect(() => {

    if (selector == "Todos") {
      setPiecesFiltered(pieces);
    } else if (selector == "OTRO") {

      const piecesFilteredAux = pieces.filter((p) => p.tipo != "CAJON" && p.tipo != "PUERTA" && p.tipo != "BASE") 
      setPiecesFiltered(piecesFilteredAux);
      
    } else {

      const piecesFilteredAux = pieces.filter((p) => p.tipo == selector)
      setPiecesFiltered(piecesFilteredAux);

    }

  }, [selector, pieces])

  const onClose = () => {
    setShowModalNewPiece(false);
  }

  const onSave = (piece: Piece) => {
    pieces.push(piece);
    setShowModalNewPiece(false);
  }

  return (
    <div>
      {showModalNewPiece && <ModalNewPiece onClose={onClose} onSave={onSave}></ModalNewPiece>}
      <h1>Despiece</h1>
      <button onClick={() => setShowModalNewPiece(true)}>Nueva pieza</button>
      <div>
        <p></p>
      </div>
      <select onChange={(e) => { setSelector(e.target.value) }}>
        <option value="Todos">Todos</option>
        <option value="CAJON">Cajon</option>
        <option value="BASE">Base</option>
        <option value="PUERTA">Puerta</option>
        <option value="OTRO">Otros</option>
      </select>
      <h2>Metros cuadrados totales: {totalMeters.toLocaleString()}</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ancho</th>
            <th>Largo</th>
            <th>Material</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {
            piecesFiltered.map((piece, index) => (
              <tr key={index} className={`${piece.tipo == "CAJON" ? "cajon" : ""}`}>
                <td style={{ padding: '5px' }}>{piece.name}</td>
                <td style={{ padding: '5px' }}>{piece.ancho}</td>
                <td style={{ padding: '5px' }}>{piece.largo}</td>
                <td style={{ padding: '5px' }}>{piece.material}</td>
                <td style={{ padding: '5px' }}>{piece.tipo}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default PiecesList 
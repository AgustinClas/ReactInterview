import { useEffect, useState } from "react"
import Spinner from "./spinner"

interface Material {
  id: number
  name: string
  price: number
  espesor: number
  textura: string
  ancho: number
  largo: number
}

const MaterialList = () => {
  const [materials, setMaterials] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {

    const loadMaterials = async () => {
      // '/materials.json' es la url de la ruta

      setIsLoading(true);
      const data = await fetch("/materials.json").then((data) => data.json()).then((res: { materials: Material[] }) => res);

      setMaterials(data.materials);

      setIsLoading(false);
    }

    loadMaterials()
  }, [])

  return (
    <div>
      <h1>Listado de Materiales</h1>
      { isLoading ? <Spinner/> :
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Espesor</th>
              <th>Medidas (mm)</th>
            </tr>
          </thead>
          <tbody>
            {materials.length > 0 && materials.map((material) =>
              <tr key={material.id}>
                <td>{material.name}</td>
                <td>{material.price}</td>
                <td>{material.espesor}</td>
                <td>
                  <img width="50" height="50" src="material.textura" alt="Textura" />
                </td>
                <td>{material.ancho}x{material.largo}</td>
              </tr>
            )
            }
          </tbody>
        </table>
      }
    </div>
  )
}

export default MaterialList 
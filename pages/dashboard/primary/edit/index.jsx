import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styles from "./edit.module.css"
import { kombuchaService } from "../../../../services/kombuchaService"
import { MainLayout } from "../../../../components/Layout/Main/MainLayout"

const Edit = () => {
  const router = useRouter()
  const [id, setId] = useState(0)
  const [state, setState] = useState({
    teaType: null,
    containerSize: null,
    containerType: null,
    mainIngredients: {
      water: null,
      sugar: null,
      tea: null,
    },
    brewDate: null,
    brewDuration: null,
    notes: null,
    archived: null,
    convertedToSecondary: null,
  })

  useEffect(() => {
    const { id } = router.query
    if (id) {
      kombuchaService.getKombucha("primary", id).then((kombucha) => {
        setId(kombucha._id)
        setState(() => ({
          teaType: kombucha.teaType,
          containerSize: kombucha.containerSize,
          containerType: kombucha.containerType,
          mainIngredients: {
            water: kombucha.mainIngredients.water,
            sugar: kombucha.mainIngredients.sugar,
            tea: kombucha.mainIngredients.tea,
          },
          brewDate: kombucha.brewDate,
          brewDuration: kombucha.brewDuration,
          notes: kombucha.notes,
          archived: kombucha.archived,
          convertedToSecondary: kombucha.convertedToSecondary,
        }))
      })
    }
  }, [])

  function onChange(e) {
    const name = e.target.name
    const value = e.target.value

    setState((state) => {
      if (name === "water" || name === "sugar" || name === "tea") {
        state.mainIngredients[name] = value
      } else {
        state[name] = value
      }
      return state
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const kombucha = {
      teaType: state.teaType,
      containerSize: state.containerSize,
      containerType: state.containerType,
      mainIngredients: {
        water: state.mainIngredients.water,
        sugar: state.mainIngredients.sugar,
        tea: state.mainIngredients.tea,
      },
      brewDate: state.brewDate,
      brewDuration: state.brewDuration,
      notes: state.notes,
      archived: state.archived,
      convertedToSecondary: state.convertedToSecondary,
    }

    await kombuchaService.editKombucha("primary", id, kombucha)
    router.push("/dashboard/primary")
  }

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <h1>Refining your process...</h1>
        <p className={styles.dek}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
          cupiditate, ad tempore natus corporis, veritatis, illum hic architecto
          repudiandae molestias placeat.
        </p>
        {state ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Ingredients</h3>
            <div className="ingredients">
              <div>
                <label htmlFor="">Tea Type</label>
                <input
                  type="text"
                  name="teaType"
                  onChange={onChange}
                  placeholder={state.teaType}
                />
              </div>
              <div>
                <label htmlFor="">Tea Quantity</label>
                <input
                  type="number"
                  name="tea"
                  onChange={onChange}
                  placeholder={state.mainIngredients.tea}
                />
              </div>
              <div>
                <label htmlFor="">Water</label>
                <input
                  type="number"
                  name="water"
                  onChange={onChange}
                  placeholder={state.mainIngredients.water}
                />
              </div>
              <div>
                <label htmlFor="">Sugar</label>
                <input
                  type="number"
                  name="sugar"
                  onChange={onChange}
                  placeholder={state.mainIngredients.sugar}
                />
              </div>
            </div>
            <h3>Container</h3>
            <div className="container">
              <div>
                <label htmlFor="">Container Type</label>
                <input
                  type="text"
                  name="containerType"
                  onChange={onChange}
                  placeholder={state.containerType}
                />
              </div>
              <div>
                <label htmlFor="">Container Size</label>
                <input
                  type="text"
                  name="containerSize"
                  onChange={onChange}
                  placeholder={state.containerSize}
                />
              </div>
            </div>
            <h3>Duration</h3>
            <div className="duration">
              <div>
                <label htmlFor="">Desired Brewing Duration</label>
                <input
                  type="text"
                  name="brewDuration"
                  onChange={onChange}
                  placeholder={state.brewDuration}
                />
              </div>
            </div>
            <h3>Notes</h3>
            <div className="notes">
              <div>
                <textarea
                  cols="80"
                  rows="8"
                  name="notes"
                  onChange={onChange}
                  placeholder={state.notes}
                ></textarea>
              </div>
            </div>
            <button className={styles.ctaTrack}>Save Changes</button>
          </form>
        ) : (
          <p>Loading form...</p>
        )}
      </div>
    </MainLayout>
  )
}

export default Edit

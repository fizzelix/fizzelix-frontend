import { useState } from "react"
import { useRouter } from "next/router"
import styles from "./add.module.css"
import { kombuchaService } from "../../../../services/kombuchaService"
import { MainLayout } from "../../../../components/Layout/Main/MainLayout"

const Add = () => {
  const router = useRouter()
  const [state, setState] = useState({
    teaType: "",
    teaQuantity: 0,
    water: 0,
    sugar: 0,
    containerType: "",
    containerSize: 0,
    brewDuration: 0,
    notes: "",
  })

  function onChange(e) {
    setState((state) => {
      const name = e.target.name
      const value = e.target.value
      state[name] = value
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
        water: state.water,
        sugar: state.sugar,
        tea: state.teaQuantity,
      },
      brewDate: new Date(),
      brewDuration: state.brewDuration,
      notes: state.notes,
      archived: false,
      convertedToSecondary: false,
    }

    await kombuchaService.addKombucha("primary", kombucha)
    router.push("/dashboard/primary")
  }

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <h1>Let's begin brewing...</h1>
        <p className={styles.dek}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
          cupiditate, ad tempore natus corporis, veritatis, illum hic architecto
          repudiandae molestias placeat.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3>Ingredients</h3>
          <div className="ingredients">
            <div>
              <label htmlFor="">Tea Type</label>
              <input type="text" name="teaType" onChange={onChange} />
            </div>
            <div>
              <label htmlFor="">Tea Quantity</label>
              <input type="number" name="teaQuantity" onChange={onChange} />
            </div>
            <div>
              <label htmlFor="">Water</label>
              <input type="number" name="water" onChange={onChange} />
            </div>
            <div>
              <label htmlFor="">Sugar</label>
              <input type="number" name="sugar" onChange={onChange} />
            </div>
          </div>
          <h3>Container</h3>
          <div className="container">
            <div>
              <label htmlFor="">Container Type</label>
              <input type="text" name="containerType" onChange={onChange} />
            </div>
            <div>
              <label htmlFor="">Container Size</label>
              <input type="text" name="containerSize" onChange={onChange} />
            </div>
          </div>
          <h3>Duration</h3>
          <div className="duration">
            <div>
              <label htmlFor="">Desired Brewing Duration</label>
              <input type="text" name="brewDuration" onChange={onChange} />
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
              ></textarea>
            </div>
          </div>
          <button className={styles.ctaTrack}>Track My Kombucha</button>
        </form>
      </div>
    </MainLayout>
  )
}

export default Add

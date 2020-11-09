import { useState } from "react"
import { useRouter } from "next/router"
import styles from "./add.module.css"
import { kombuchaService } from "../../../../services/kombuchaService"
import { MainLayout } from "../../../../components/Layout/Main/MainLayout"

const Add = () => {
  const router = useRouter()
  const [state, setState] = useState({
    bottleDate: new Date(),
    fermentationDuration: 0,
    flavors: "",
    notes: "",
    archived: false,
  })

  function onChange(e) {
    const { name, value } = e.target

    setState((state) => {
      state[name] = value
      return state
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const kombucha = {
      bottleDate: state.bottleDate,
      fermentationDuration: state.fermentationDuration,
      flavors: state.flavors,
      notes: state.notes,
      archived: state.archived,
    }

    await kombuchaService.addKombucha("secondary", kombucha)
    router.push("/dashboard/secondary")
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
          <h3>Fermentation</h3>
          <div>
            <div>
              <label htmlFor="">Duration Amount (days)</label>
              <input
                type="number"
                name="fermentationDuration"
                onChange={onChange}
              />
            </div>
          </div>
          <h3>Flavor Profile</h3>
          <div className="flavor-notes">
            <div>
              <textarea
                cols="80"
                rows="4"
                name="flavors"
                onChange={onChange}
              ></textarea>
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

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styles from "./edit.module.css"
import { kombuchaService } from "../../../../services/kombuchaService"
import { MainLayout } from "../../../../components/Layout/Main/MainLayout"

const Edit = () => {
  const router = useRouter()
  const [id, setId] = useState(0)
  const [state, setState] = useState({
    bottleDate: null,
    fermentationDuration: null,
    flavors: null,
    notes: null,
    archived: null,
  })

  useEffect(() => {
    const { id } = router.query
    if (id) {
      kombuchaService.getKombucha("secondary", id).then((kombucha) => {
        setId(kombucha._id)
        setState(() => ({
          bottleDate: kombucha.bottleDate,
          fermentationDuration: kombucha.fermentationDuration,
          flavors: kombucha.flavors,
          notes: kombucha.notes,
          archived: kombucha.archived,
        }))
      })
    }
  }, [])

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

    await kombuchaService.editKombucha("secondary", id, kombucha)
    router.push("/dashboard/secondary")
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
            <h3>Fermentation</h3>
            <div>
              <div>
                <label htmlFor="">Duration Amount (days)</label>
                <input
                  type="number"
                  name="fermentationDuration"
                  placeholder={state.fermentationDuration}
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
                  placeholder={state.flavors}
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
                  placeholder={state.notes}
                  onChange={onChange}
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

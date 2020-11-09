import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { kombuchaService } from "../../../services/kombuchaService"
import styles from "./primary.module.css"

import { MainLayout } from "../../../components/Layout/Main/MainLayout"

const Primary = () => {
  const router = useRouter()
  const [primaryFermentations, setPrimaryFermentations] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!localStorage.getItem("fid")) {
      router.push("/login")
    }

    kombuchaService
      .getPrimaryFermentations()
      .then((data) => setPrimaryFermentations(data))
  }, [])

  async function deleteKombucha(id) {
    const res = await kombuchaService.deleteKombucha("primary", id)
    // update UI
    const updatedKombuchas = primaryFermentations.filter((p) => p._id != id)
    setPrimaryFermentations(updatedKombuchas)
  }

  function editPrimary(kombucha) {
    router.push({
      pathname: "/dashboard/primary/edit",
      query: { id: kombucha._id },
    })
  }

  function renderSelections() {
    const len = primaryFermentations.length
    if (len === 0) {
      return <p style={{ color: "#ffffe3" }}>No Kombuchas...</p>
    } else if (len > 0) {
      return primaryFermentations.map((p, i) => (
        <div
          className={styles.card}
          key={i}
          style={{
            border: currentIndex == i ? "1px solid #ffffe3" : "initial",
          }}
        >
          <h4>
            {new Date(p.brewDate).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h4>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              disabled={currentIndex == i ? true : null}
              className={styles.greenBtn}
              onClick={() => setCurrentIndex(i)}
            >
              See Summary
            </button>
            <button
              className={styles.redBtn}
              onClick={() => deleteKombucha(p._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))
    } else {
      return <p style={{ color: "#ffffe3" }}>Loading Kombuchas...</p>
    }
    return null
  }

  return (
    <MainLayout>
      <section className={styles.container}>
        <div className={styles.title}>
          <h1>
            {primaryFermentations.length > 1
              ? `${primaryFermentations.length} Kombuchas in Primary Fermentation`
              : `${primaryFermentations.length} Kombucha in Primary Fermentation`}
          </h1>
        </div>
        <div className={styles.selection}>
          <div>
            <button
              className={styles.blueBtn}
              style={{ width: "100%" }}
              onClick={() => router.push("/dashboard/primary/add")}
            >
              Add Primary Fermentation
            </button>
          </div>
          {renderSelections()}
        </div>
        <div className={styles.details}>
          <section className={styles.summary}>
            <h1>Summary</h1>
            <button
              className={styles.blueBtn}
              onClick={() => editPrimary(primaryFermentations[currentIndex])}
            >
              Edit
            </button>
          </section>
          <section>
            <h3>Ingredients</h3>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <div>
                <p>
                  Tea Type:{" "}
                  {primaryFermentations[currentIndex] &&
                    primaryFermentations[currentIndex].teaType}
                </p>
                <p style={{ marginBottom: "0px" }}>
                  Water:{" "}
                  {primaryFermentations[currentIndex] &&
                    primaryFermentations[currentIndex].mainIngredients.water}
                </p>
              </div>
              <div style={{ marginLeft: "55px" }}>
                <p>
                  Tea:{" "}
                  {primaryFermentations[currentIndex] &&
                    primaryFermentations[currentIndex].mainIngredients.tea}
                </p>
                <p style={{ marginBottom: "0px" }}>
                  Sugar:{" "}
                  {primaryFermentations[currentIndex] &&
                    primaryFermentations[currentIndex].mainIngredients.sugar}
                </p>
              </div>
            </div>
          </section>
          <section>
            <h3>Container</h3>
            <p>
              Type:{" "}
              {primaryFermentations[currentIndex] &&
                primaryFermentations[currentIndex].containerType}
            </p>
            <p>
              Size:{" "}
              {primaryFermentations[currentIndex] &&
                primaryFermentations[currentIndex].containerSize}
            </p>
          </section>
          <section>
            <h3>Brewing Information</h3>
            <p>
              Brew Date:{" "}
              {primaryFermentations[currentIndex] &&
                new Date(
                  primaryFermentations[currentIndex].brewDate
                ).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
            <p>
              Duration:{" "}
              {primaryFermentations[currentIndex] &&
                primaryFermentations[currentIndex].brewDuration}
            </p>
          </section>
          <section>
            <h3>Notes</h3>
            <p>
              {primaryFermentations[currentIndex] &&
                primaryFermentations[currentIndex].notes}
            </p>
          </section>
        </div>
      </section>
    </MainLayout>
  )
}

export default Primary

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { kombuchaService } from "../../../services/kombuchaService"
import styles from "./secondary.module.css"

import { MainLayout } from "../../../components/Layout/Main/MainLayout"

const Secondary = () => {
  const router = useRouter()
  const [secondaryFermentations, setSecondaryFermentations] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!localStorage.getItem("fid")) {
      router.push("/login")
    }

    kombuchaService
      .getSecondaryFermentations()
      .then((data) => setSecondaryFermentations(data))
  }, [])

  async function deleteKombucha(id) {
    await kombuchaService.deleteKombucha("secondary", id)
    // update UI
    const updatedKombuchas = secondaryFermentations.filter((s) => s._id != id)
    setSecondaryFermentations(updatedKombuchas)
  }

  function editSecondary(kombucha) {
    router.push({
      pathname: "/dashboard/secondary/edit",
      query: { id: kombucha._id },
    })
  }

  function renderSelections() {
    const len = secondaryFermentations.length
    if (len === 0) {
      return <p style={{ color: "#ffffe3" }}>No Kombuchas...</p>
    } else if (len > 0) {
      return secondaryFermentations.map((s, i) => (
        <div
          className={styles.card}
          key={i}
          style={{
            border: currentIndex == i ? "1px solid #ffffe3" : "initial",
          }}
        >
          <h4>
            {new Date(s.bottleDate).toLocaleDateString("en-us", {
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
              onClick={() => deleteKombucha(s._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))
    } else {
      return <p style={{ color: "#ffffe3" }}>Loading Kombuchas...</p>
    }
  }

  return (
    <MainLayout>
      <section className={styles.container}>
        <div className={styles.title}>
          <h1>
            {secondaryFermentations.length > 1
              ? `${secondaryFermentations.length} Kombuchas in Secondary Fermentation`
              : `${secondaryFermentations.length} Kombucha in Secondary Fermentation`}
          </h1>
        </div>
        <div className={styles.selection}>
          <div>
            <button
              className={styles.blueBtn}
              style={{ width: "100%" }}
              onClick={() => router.push("/dashboard/secondary/add")}
            >
              Add Secondary Fermentation
            </button>
          </div>
          {renderSelections()}
        </div>
        <div className={styles.details}>
          <section className={styles.summary}>
            <h1>Summary</h1>
            <button
              className={styles.blueBtn}
              onClick={() =>
                editSecondary(secondaryFermentations[currentIndex])
              }
            >
              Edit
            </button>
          </section>
          <section>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <div>
                <p>
                  Bottle Date:{" "}
                  {secondaryFermentations[currentIndex] &&
                    new Date(
                      secondaryFermentations[currentIndex].bottleDate
                    ).toLocaleDateString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </p>
                <p style={{ marginBottom: "0px" }}>
                  Fermentation Duration:{" "}
                  {secondaryFermentations[currentIndex] &&
                    secondaryFermentations[currentIndex].fermentationDuration}
                </p>
              </div>
            </div>
          </section>
          <section>
            <h3>Flavor Profile</h3>
            <p>
              {secondaryFermentations[currentIndex] &&
                secondaryFermentations[currentIndex].flavors}
            </p>
          </section>
          <section>
            <h3>Notes</h3>
            <p>
              {secondaryFermentations[currentIndex] &&
                secondaryFermentations[currentIndex].notes}
            </p>
          </section>
        </div>
      </section>
    </MainLayout>
  )
}

export default Secondary

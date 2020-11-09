import { useEffect } from "react"
import { useRouter } from "next/router"
import styles from "./bg.module.css"

import { MainLayout } from "../../components/Layout/Main/MainLayout"

const BrewGuide = () => {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem("fid")) {
      router.push("/login")
    }
  }, [])

  return (
    <MainLayout>
      <section className={styles.container}>
        <div className={styles.title}>
          <h1>Brew Guide</h1>
        </div>
        <div>
          <h3 className={styles.dek}>
            This guide provides a recommended starting point for your kombucha
            brewing journey!
          </h3>
          <hr />
        </div>
        <section className={styles.section}>
          <h2>Ingredients / Tools</h2>
          <ul>
            <li>1 gallon glass container</li>
            <li>1 cup sugar</li>
            <li>3 Qt. clean water (filtered)</li>
            <li>Kombucha culture SCOBY</li>
            <li>10-12 g loose leaf tea</li>
            <li>Breatheable Cloth </li>
            <li>Rubber band</li>
            <li>Funnel</li>
            <li>Fine mesh strainer</li>
            <li>Ladle</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2>Bottling</h2>
          <p>Flip-top bottles</p>
        </section>
        <section className={styles.section}>
          <h2>Fermenting Time</h2>
          <ul>
            <li>7-30 Days</li>
            <li>Shorter ferment will be mild and more sweet</li>
            <li>Longer ferment will be more tart, less sugar</li>
            <li>Find our what you & your palette likes better!</li>
            <li>Adjusting sugar levels will impact fermentation time</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2>Temperature</h2>
          <ul>
            <li>
              68-85 F (if temp too low, mold can grow; if temp too high - will
              kill SCOBY)
            </li>
            <li>Ideal temperatures are between 74-84 F</li>
            <li>Keep out of direct sunlight. Sunlight will kill probiotics.</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2>Storing Ideas</h2>
          <ul>
            <li>Top of refrigerator, cupboard, top of gas stove.</li>
            <li>Supply stores have glass warmers for sale.</li>
          </ul>
        </section>
        <hr style={{ margin: "55px 0" }} />
        <section className={styles.section}>
          <h2>Primary Ferment</h2>
          <ol>
            <li>Heat water to 175 F.</li>
            <li>
              Steep tea for as long as desired. Longer steeping yields higher
              caffeine and higher tannin content, which results in increased
              astringency (usually 10-30min). Strain tea with fine mesh
              strainer.
            </li>
            <li>
              Add the sugar and stir until dissolved. You can switch steps 2 and
              3. THe order is not important.
            </li>
            <li>
              <strong>IMPORTANT: </strong> Let tea/sugar solution cool down to
              room temperature. Failure to do so will destroy the SCOBY (the
              culture begins to die if heated about 105 F).
            </li>
            <li>
              Once cooled down to room temperature, add the mixture to the
              kombucha starter in the container.
            </li>
            <li>
              Cover container with a breathable cloth and place in a warm
              (around 74-84 F), well-ventilated area, and away from direct
              sunlight.
            </li>
            <li>
              You will notice the new culture will form on top on the liquid.
              First it will look like slime on top, then it becomes a thin
              layer. Around day 4, it will become a thicker white layer of
              kombucha culture.
            </li>
            <li>
              <strong>
                Your kombucha will be ready for consumption in about 10-18 days.
              </strong>{" "}
              Your first couple of batches will usually take longer, but once
              established your culure will yield new batches in 8-114 days. The
              longer you let it go, the less sweet and more sour its character
              will be.
            </li>
          </ol>
        </section>
        <section className={styles.section}>
          <h2>Secondary Ferment</h2>
          <ul>
            <li>
              The next step is the secondary ferment, which is where you bottle
              your komucha and leave it at room temperature to ferment further.
              This allows it to carbonate because the oxygen supply is being cut
              off and carbon dioxide (C02) will be building up inside the
              vessel. There are different ways to bottle but a funnel, ladle,
              mesh strainer, and some flip-top bottles are a great place to
              start. As you advance, adding a siphon system can save you time
              filling the bottles.
            </li>
            <li>
              <strong>This stage typically lasts 3-7 days.</strong> The longer
              the secondary ferment, the more carbonated and less sweet your
              kombucha will be. We recommend daily testing and note-keeping so
              you can gauge carbonation levels. Longer secondary ferment will
              aid in more bubbles but be careful! "Bottle bombs" - glass
              exploding/shattering dure to increased C02 levels can be common
              among home brewers and they are really scary and dangerous!
              Burping bottles (releasing some of the C02) will help take some of
              the pressure off the bottles.
            </li>
            <li>
              For more carbonation:
              <ul>
                <li>Add fruit or more sugar to the bottles</li>
                <li>
                  Fill the bottles, almost to the top. Less oxygen in the
                  bottles will create more CO2
                </li>
                <li>Airtight caps work better than twist-off</li>
                <li>Longer secondary ferment</li>
              </ul>
            </li>
            <li>
              Once you get the desired time, taste, and bubbles, pop in the
              fridge for cold storage.
            </li>
          </ul>
        </section>
        <hr style={{ margin: "55px 0" }} />
        <section className={styles.section}>
          <h2>What's Normal</h2>
          <p>
            New SCOBY will always grow on top. THey look weird, grow sideways,
            and are not always pretty. Small white patches form on top.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Fruit Flies & Mold?</h2>
          <p>
            <strong>Keep fruit flies from getting inside.</strong> Always keep
            kombucha shrouded in a breathable cover.
          </p>
          <p>
            <strong>Mold is rare but sometimes happens.</strong> Mold is always
            fuzzy and circular. Give it some time and monitor the growth. It
            will become obvious if it's mold. If that happens,{" "}
            <strong>DISCARD immediately</strong> and sanitize your equipment!
          </p>
        </section>
        <section className={styles.cred}>
          <p>
            <strong>
              Guide adapted from:{" "}
              <a
                href="http://finefeatherskombucha.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fine Feathers Kombucha Co.
              </a>
            </strong>
          </p>
        </section>
      </section>
    </MainLayout>
  )
}

export default BrewGuide

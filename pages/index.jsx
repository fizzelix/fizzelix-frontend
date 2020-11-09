import { useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "./index.module.css"

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("fid")) {
      router.push("/dashboard")
    }
  }, [])

  return (
    <main className={styles.landingContainer}>
      <div className={styles.main}>
        <h1>Enjoy kombucha the way you like.</h1>
      </div>
      <section className={styles.overview}>
        <h3>TRACK, LEARN, ENJOY</h3>
        <p>
          Learn how to brew kombucha and track your progress to refine your
          craft.
        </p>
      </section>
      <section className={styles.buttons}>
        <Link href="/register">
          <button className={styles.button}>Register</button>
        </Link>
        <Link href="/login">
          <button className={styles.button}>Login</button>
        </Link>
      </section>
      <section className={styles.image}></section>
    </main>
  )
}

export default Dashboard

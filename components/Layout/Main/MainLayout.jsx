import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styles from "./MainLayout.module.css"

import { Sidenav } from "../../Sidenav/Sidenav"

export const MainLayout = ({ children }) => {
  const router = useRouter()
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("fid")) {
      router.push("/")
    }
  }, [])

  const toggleSideNav = () => setIsShowing(!isShowing)

  return (
    <main className={styles.main}>
      <Sidenav isShowing={isShowing} toggleSideNav={toggleSideNav} />
      <section className={styles.dashboard}>
        <div onClick={toggleSideNav} className={styles.navButton}>
          =
        </div>
        <div>{children}</div>
      </section>
    </main>
  )
}

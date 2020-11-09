import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./Sidenav.module.css"

export const Sidenav = ({ isShowing, toggleSideNav }) => {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("fid")
    router.push("/")
  }

  return (
    <aside
      className={styles.container}
      style={{ display: isShowing ? "block" : "none" }}
    >
      <div onClick={toggleSideNav} className={styles.closeButton}>
        &times;
      </div>
      <h1 className={styles.logo + " logo"}>Fizzelix</h1>
      <h2 className={styles.lede}>LEARN | MAKE | ENJOY</h2>
      <ul className={styles.list}>
        <li>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/primary">
            <a>Primary Fermentation</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/secondary">
            <a>Secondary Fermentation</a>
          </Link>
        </li>
        <li>
          <Link href="/brewguide">
            <a>Brew Guide</a>
          </Link>
        </li>
        <li className={styles.logout} onClick={handleLogout}>
          <a>Logout</a>
        </li>
      </ul>
    </aside>
  )
}

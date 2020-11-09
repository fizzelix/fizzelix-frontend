import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./login.module.css"

export default () => {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("fid")) {
      router.push("/dashboard")
    }
  }, [])

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const [errorMessage, setErrorMessage] = useState({
    general: "",
    password: "",
    email: "",
  })

  const handleChange = (e) => {
    setErrorMessage({})
    const { name, value } = e.target
    setCredentials(() => {
      credentials[name] = value
      return credentials
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const req = await fetch("http://fizzelix-api.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    const res = await req.json()

    if (res.errors) {
      setErrorMessage({
        password: res.errors.password,
        general: res.errors.general,
        email: res.errors.email,
      })
    } else {
      localStorage.setItem("fid", res.token)
      router.push("/dashboard")
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={"light-bg " + styles.header + " logo"}>
        <Link href="/">
          <a> Fizzelix</a>
        </Link>
      </h1>
      <form className={styles.form + " dark-bg"} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <label htmlFor="email">Email</label>
          <input
            autoComplete="off"
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Password</label>
          <input
            autoComplete="off"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button className="action-btn">Login</button>
        <div className={styles.errors}>
          <p>{errorMessage.general}</p>
          <p>{errorMessage.email}</p>
          <p>{errorMessage.password}</p>
        </div>
      </form>
    </main>
  )
}

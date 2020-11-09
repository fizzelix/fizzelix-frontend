import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Line } from "react-chartjs-2"
import { kombuchaService } from "../../services/kombuchaService"
import styles from "./dashboard.module.css"

import { MainLayout } from "../../components/Layout/Main/MainLayout"
import { Card } from "../../components/Card/Card"

const Dashboard = () => {
  const router = useRouter()
  const [cData, setcData] = useState([])
  const [kombuchas, setKombuchas] = useState({})

  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Novemeber",
      "December",
    ],
    datasets: [
      {
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#3f5f47",
        borderColor: "#ffffe3",
        pointHitRadius: 10,
        data: cData,
      },
    ],
  }

  const chartOptions = {
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#ffffe3",
          },
          gridLines: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: "#ffffe3",
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
    legend: {
      display: false,
      labels: {
        fontColor: "#ffffe3",
      },
    },
  }

  useEffect(() => {
    if (!localStorage.getItem("fid")) {
      router.push("/login")
    }

    kombuchaService
      .getPrimaryFermentationCountByMonths()
      .then((data) => setcData(data))

    kombuchaService
      .getAllKombuchas()
      .then((kombuchas) => setKombuchas(kombuchas))
  }, [])

  if (kombuchas.primary && kombuchas.secondary) {
    return (
      <MainLayout>
        <section className={styles.main}>
          <div className={styles.graph}>
            <Line data={chartData} height={100} options={chartOptions} />
          </div>
          <div className={styles.primary}>
            <Card
              header={kombuchas.primary.length}
              link="dashboard/primary"
              linkText="See what's brewing"
            >
              <p>
                Enter information about the main process of kombucha making -
                The Primary Ferment.
              </p>
            </Card>
          </div>
          <div className={styles.secondary}>
            <Card
              header={kombuchas.secondary.length}
              link="dashboard/secondary"
              linkText="See what's brewing"
            >
              <p>
                Time to bottle! The secondary ferment gives us the fizzy elixir
                we enjoy.
              </p>
            </Card>
          </div>
          <div className={styles.history}>
            <Card header="Guide" link="brewguide" linkText="Learn How">
              <p>
                Learn how to brew kombucha with a beginner's recipe! This guide
                is a good starting place for your journey.
              </p>
            </Card>
          </div>
        </section>
      </MainLayout>
    )
  } else {
    return (
      <MainLayout>
        <h3 style={{ margin: "20px", color: "#ffffe3" }}>
          Loading your Dashboard ...
        </h3>
      </MainLayout>
    )
  }
}

export default Dashboard

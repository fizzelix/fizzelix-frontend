export const kombuchaService = {
  jwtToken: "fid",
  api: "https://fizzelix-api.herokuapp.com",

  async getAllKombuchas() {
    const jwtInStorage = localStorage.getItem(this.jwtToken)
    const url = `${this.api}/users/current`

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: jwtInStorage },
      })
      const { kombuchas } = await res.json()
      return kombuchas
    } catch (error) {
      throw error.message
    }
  },

  async getPrimaryFermentations() {
    const jwtInStorage = localStorage.getItem(this.jwtToken)
    const url = `${this.api}/users/current`

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: jwtInStorage },
      })
      const {
        kombuchas: { primary },
      } = await res.json()
      return primary
    } catch (error) {
      throw error.message
    }
  },

  async getSecondaryFermentations() {
    const jwtInStorage = localStorage.getItem(this.jwtToken)
    const url = `${this.api}/users/current`

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: jwtInStorage },
      })
      const {
        kombuchas: { secondary },
      } = await res.json()
      return secondary
    } catch (error) {
      throw error.message
    }
  },

  async getKombucha(type, id) {
    const jwtInStorage = localStorage.getItem(this.jwtToken)
    const url = `${this.api}/kombucha/${type}/${id}`

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: jwtInStorage },
      })
      return await res.json()
    } catch (error) {
      throw error.message
    }
  },

  async addKombucha(type, kombucha) {
    const jwtInStorage = localStorage.getItem(this.jwtToken)
    const url = `${this.api}/kombucha/${type}`

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: jwtInStorage,
          "Content-type": "application/json",
        },

        body: JSON.stringify(kombucha),
      })
      return await res.json()
    } catch (error) {
      throw error.message
    }
  },

  async deleteKombucha(type, id) {
    const jwtInStorage = localStorage.getItem(this.jwtToken)
    const url = `${this.api}/kombucha/${type}/${id}`

    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: jwtInStorage },
      })
      return await res.json()
    } catch (error) {
      throw error.message
    }
  },

  async editKombucha(type, id, updatedKombucha) {
    const jwtInStorage = localStorage.getItem(this.jwtToken)
    const url = `${this.api}/kombucha/${type}/${id}`

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: jwtInStorage,
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedKombucha),
      })
      return await res.json()
    } catch (error) {
      throw error.message
    }
  },

  async getPrimaryFermentationCountByMonths() {
    const { primary } = await this.getAllKombuchas()
    const currentMonth = new Date().getMonth() + 1
    const years = Array(currentMonth).fill(0)

    primary.forEach((p) => {
      const monthNumber = new Date(p.brewDate).getMonth()
      years[monthNumber] += 1
    })

    return years
  },
}

import React, { Component } from 'react'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock'
import '../styles/_discover.scss'
import makeRequest from '../api/makeRequest'

export default class Discover extends Component {
  constructor() {
    super()

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    }
  }

  // Se hacen las peticiones asíncronas en el componentDidMount para
  // evitar re renderizados.
  async componentDidMount() {
    // Se utiliza el bloque try catch para manejar los posibles fallos
    // en las peticiones.
    try {
      // Se hace uso del object destructuring
      const {
        data: { albums },
      } = await makeRequest('new-releases')

      const {
        data: { playlists },
      } = await makeRequest('featured-playlists')

      const {
        data: { categories },
      } = await makeRequest('categories')

      this.setState({
        playlists: playlists.items || [],
        newReleases: albums.items || [],
        categories: categories.items || [],
      })
    } catch (e) {
      alert('An error has ocurred. Try again later.')
    }
  }

  render() {
    const { newReleases, playlists, categories } = this.state

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    )
  }
}

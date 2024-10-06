<template>
  <div class="container m-1">
    <h1 class="mb-2">Health Providers in Victoria</h1>
    <p>
      This map highlights various health providers across Victoria that offer essential services to
      Indigenous communities. These providers are committed to supporting the health and well-being
      of Indigenous peoples, integrating traditional practices and cultural sensitivity into their
      care. Explore the locations below to find health services that respect and understand the
      unique needs of Indigenous Australians.
    </p>
  </div>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

export default {
  data() {
    return {
      map: null
    }
  },
  mounted() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibWlsaWNhMDEiLCJhIjoiY20xeTQ2ajVtMHo4dTJrcTEwb2M4NmdiciJ9.vvCsLHKCxXJZeteJbq_ELg'

    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [144.9631, -37.8136],
      zoom: 12
    })

    const healthProviders = [
      {
        name: 'Royal Melbourne Hospital',
        coordinates: [144.9641, -37.7986]
      },
      {
        name: 'The Alfred Hospital',
        coordinates: [144.9927, -37.8454]
      },
      {
        name: 'Melbourne Private Hospital',
        coordinates: [144.9896, -37.858]
      },
      {
        name: 'Monash Health',
        coordinates: [145.1092, -37.9335]
      },
      {
        name: "St Vincent's Hospital",
        coordinates: [144.9798, -37.8046]
      },
      {
        name: 'Western Health',
        coordinates: [144.9013, -37.7962]
      },
      {
        name: 'Bendigo Health',
        coordinates: [144.2802, -36.7572]
      },
      {
        name: 'Goulburn Valley Health',
        coordinates: [145.3963, -36.3925]
      },
      {
        name: 'Ballarat Health Services',
        coordinates: [143.8562, -37.5646]
      },
      {
        name: 'Latrobe Regional Hospital',
        coordinates: [146.5324, -38.2026]
      }
    ]

    this.map.on('load', () => {
      healthProviders.forEach((provider) => {
        new mapboxgl.Marker()
          .setLngLat(provider.coordinates)
          .setPopup(new mapboxgl.Popup().setText(provider.name))
          .addTo(this.map)
      })
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Search for places'
    })

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      alternatives: true,
      geometries: 'geojson',
      controls: {
        inputs: true
      }
    })

    this.map.addControl(directions, 'top-left')
    this.map.addControl(geocoder, 'top-right')
  }
}
</script>

<style>
.map-container {
  width: 100%;
  height: 80vh;
}

#app
  > main
  > div.map-container.mapboxgl-map
  > div.mapboxgl-control-container
  > div.mapboxgl-ctrl-top-right
  > div
  > svg {
  display: none !important;
}
</style>

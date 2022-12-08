import React from 'react'

import { useViewer } from '/client/entities/viewer'

const IndexPage = () => {
  const viewer = useViewer()

  console.log(viewer)

  return <h1>Hello from index page</h1>
}

export default IndexPage

// explore.tsx

import * as React from 'react'

async function getComponent () {
  const component = await import('./explorer')
  console.log('component',component)
  return component.default
}

export default getComponent()
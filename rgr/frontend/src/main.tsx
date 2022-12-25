import { createRoot } from 'react-dom/client'

import { App } from 'app'

const target = document.getElementById('root')

if (!target) {
  throw Error('div#root was not found')
}

const rootElement = createRoot(target)
rootElement.render(<App />)

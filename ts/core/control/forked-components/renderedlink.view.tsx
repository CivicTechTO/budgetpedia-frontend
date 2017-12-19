// renderedlink.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import { Link } from 'react-router-dom'

// RenderedLink taken after 
// https://github.com/draft-js-plugins/draft-js-plugins/blob/master/draft-js-anchor-plugin/src/components/Link/index.js
// modified by adding conditional for when user enters 'local.link/somepath' 
// that generates a router Link instead of an anchor link
const RenderedLink = ({
  children,
  className,
  entityKey,
  getEditorState,
  target,
}) => {

  const entity = getEditorState().getCurrentContent().getEntity(entityKey);
  const entityData = entity ? entity.get('data') : undefined;
  const href = (entityData && entityData.url) || undefined;

  // conditional added by HB
  let test = 'local.link'
  let pos = href.indexOf(test)
  if (pos != -1) {
    let to = href.substring(pos + test.length)
    if (!to) to = '/'
    // TODO not sure about className -- needs testing
    return <Link className = {className} to = {to}>{children}</Link>
  }
  // end of conditional

  return (
    <a
      className={className}
      title={href}
      href={href}
      target='_blank'
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )

}

export default RenderedLink

import { useState } from 'react'
import Link from 'next/link'

export default function Menu() {
  const [open, setOpen] = useState(false)

  const getItems = () => {
    return (
      <>
        <Link href="/">
          <a className="navbar-item editable">Home</a>
        </Link>
        <Link href="/activities">
          <a className="navbar-item editable">Activities</a>
        </Link>
        <Link href="/segments">
          <a className="navbar-item editable">Segments</a>
        </Link>
        <Link href="/synchronize">
          <a className="navbar-item editable">Synchronize</a>
        </Link>
        <Link href="/guillotina">
          <a className="navbar-item editable">Guillotina</a>
        </Link>
      </>
    )
  }
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item editable">
          <img src="/logo.svg" alt="Guillotina logo" height="80" />
        </div>
        <div
          onClick={() => {
            setOpen(!open)
          }}
          id="burger"
          className={`navbar-burger burger ${open ? 'is-active' : ''}`}
        >
          <span />
          <span />
          <span />
        </div>
      </div>

      <div id="navbarmenu" className={`navbar-menu ${open ? 'is-active' : ''}`}>
        <div className="navbar-start"></div>
        <div className="navbar-end">{getItems()}</div>
      </div>
    </nav>
  )
}

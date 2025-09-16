import './Root.module.css'

import { NavLink, Outlet } from 'react-router'

import Messages from '../../components/Messages/Messages.tsx'
import styles from './Root.module.css'

const Root = () => (
  <div className="app">
    <h1 className={styles.title}>Tour of Heroes</h1>
    <nav>
      <NavLink className={styles.navLink} to="/">
        Dashboard
      </NavLink>
      <NavLink className={styles.navLink} to="/heroes">
        Heroes
      </NavLink>
    </nav>
    <Outlet />
    <Messages />
  </div>
)

export default Root

import Image from 'next/image'
import clsx from 'clsx'
import styles from './styles.module.scss'
import {ReactNode} from 'react'

type NavTabProps = {
  tab: string
  isOpen: boolean
  isMobile?: boolean
  setToggledTab: () => void
  children: ReactNode
  title: string
}

export default function NavTab({tab, isOpen, setToggledTab, children, isMobile = false, title}: NavTabProps) {
  return (
    <li className={styles.parentTabs}>
      <button
        aria-expanded={isOpen || isMobile}
        aria-controls={`menu-${tab}`}
        type="button"
        onClick={setToggledTab}
        disabled={isMobile}
        tabIndex={isOpen || isMobile ? -1 : 0}
        className={clsx(styles.tabButton, (isOpen || isMobile) && styles.activeTab)}
      >
        {title}
      </button>
      <ul
        id={`menu-${tab}`}
        aria-label={`${tab} submenu`}
        aria-hidden={!isOpen && !isMobile}
        className={clsx(styles.nestedTabs, isOpen && styles.toggledTab)}
      >
        {children}
      </ul>
    </li>
  )
}

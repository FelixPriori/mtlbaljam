import Link from "next/link";
import styles from './styles.module.scss'

interface NavLinkProps {
    text: string;
    href: string;
    isCurrent: boolean;
    hidden: boolean;
    mobileToggle?: () => void
}

export default function NavLink({ text, href, isCurrent, hidden, mobileToggle }: NavLinkProps) {
    return (
        <li className={`${styles.navLink} ${isCurrent ? styles.current : ''}`}>
            <Link href={href} onClick={mobileToggle ? mobileToggle : () => null} tabIndex={hidden || isCurrent ? -1 : 0}>
                {text}
            </Link>
        </li>
    )
}
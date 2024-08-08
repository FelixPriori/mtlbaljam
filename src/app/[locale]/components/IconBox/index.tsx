import Image from "next/image"
import styles from './styles.module.scss'

interface IconBox {
    alt: string
    src: string
    width: number
    height: number
    position: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'centerLeft' | 'centerRight'
}

export default function IconBox({alt, src, width, height, position}: IconBox) {
    return (
        <div className={`${styles.iconBox} ${styles[position]}`}>
            <Image src={src} alt={alt}  width={width} height={height}/>
        </div>
    )
}
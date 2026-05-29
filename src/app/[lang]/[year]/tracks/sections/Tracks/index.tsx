import {Fragment} from 'react'
import styles from './styles.module.scss'
import {localize} from '@/lib/sanity/localize'
import type {LocalizedStringArray, SanityTrack, SanityLabels} from '@/lib/sanity/queryTypes'
import type {Locales} from '@/i18n'

export default function Tracks({
  tracks,
  tracksPageDescription,
  labels,
  lang,
}: {
  tracks: SanityTrack[]
  tracksPageDescription: LocalizedStringArray | null
  labels: SanityLabels
  lang: Locales
}) {
  const description = localize(tracksPageDescription, lang)
  return (
    <section className={styles.tracksSection}>
      <h2>{localize(labels?.tracks, lang) ?? 'Tracks'}</h2>
      <div className={styles.content}>
        {description?.map((line) => (
          <p key={line}>{line}</p>
        ))}
        {tracks.map((track) => {
          const trackName = localize(track.trackName, lang)
          const classes = track.classes ?? []
          return (
            <Fragment key={trackName}>
              <h3>{trackName}</h3>
              {localize(track.trackDescription, lang)?.map((line) => (
                <p key={line}>{line}</p>
              ))}
              {classes.length > 0 && (
                <ol className={styles.classList}>
                  {classes.map((classItem, index) => (
                    <li key={localize(classItem.title, lang) ?? index} className={styles.classListItem}>
                      <h4>
                        {classes.length > 1 && `${index + 1}. `}{localize(classItem.title, lang)}
                      </h4>
                      <p>
                        <strong>{classItem.instructorRef?.name}</strong>
                      </p>
                      {localize(classItem.description, lang)?.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </li>
                  ))}
                </ol>
              )}
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}

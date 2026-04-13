import { useCallback } from 'react'
import { useFormValue, set, unset } from 'sanity'
import type { StringInputProps } from 'sanity'
import { Select, Card, Text } from '@sanity/ui'

type Room = {
  label?: { en?: string; fr?: string }
  key?: { current?: string }
}

export function RoomInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props

  // Read rooms from the root eventEdition document
  const rooms = useFormValue(['rooms']) as Room[] | undefined

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const next = e.currentTarget.value
      onChange(next ? set(next) : unset())
    },
    [onChange],
  )

  if (!rooms || rooms.length === 0) {
    return (
      <Card padding={3} tone="caution" radius={2}>
        <Text size={1}>
          No rooms configured for this edition. Add rooms in the Schedule section above.
        </Text>
      </Card>
    )
  }

  return (
    <Select value={value ?? ''} onChange={handleChange} disabled={readOnly}>
      <option value="">— spans all rooms —</option>
      {rooms.map((room) => {
        const key = room.key?.current
        const label = room.label?.en ?? room.label?.fr
        if (!key || !label) return null
        return (
          <option key={key} value={key}>
            {label}
          </option>
        )
      })}
    </Select>
  )
}

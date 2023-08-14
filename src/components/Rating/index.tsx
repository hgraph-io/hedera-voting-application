import { Rating as MuiRating } from '@mui/material'
import { Typography, StarBorderRoundedIcon } from '@/components'
import styles from './styles.module.scss'

export default function StarRating(props: {
  className: string
  onChange?: (event: React.ChangeEvent<{}>, value: number | null) => void
  readOnly?: boolean
  average?: number
  value?: number
}) {
  const { average, ...rest } = props

  return (
    <div className={styles.root}>
      <MuiRating
        icon={<StarBorderRoundedIcon sx={{ color: '#07E78E', fontSize: 40 }} />}
        emptyIcon={<StarBorderRoundedIcon style={{ color: '#ebebeb', fontSize: 40 }} />}
        {...rest}
      />

      {average && (
        <Typography variant="body2" sx={{ marginLeft: '10px' }}>
          {average} out of 5
        </Typography>
      )}
    </div>
  )
}

'use client'

import { useParams } from 'next/navigation'
import { useRating } from '@/context'
import { Grid, Box, Typography } from '@/components'

export default function CurrentVotes() {
  const { id } = useParams()
  const { ratingState } = useRating()
  const allRatings =
    ratingState[id as string]?.ratings && Object.entries(ratingState[id as string].ratings)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1">
          Below you can see all of the current votes on this application:
        </Typography>
      </Grid>

      {allRatings?.map(([accountId, rating]: [string, number]) => (
        <Grid item xs={12} key={accountId}>
          <Box
            bgcolor="grey.100"
            borderRadius={2}
            display="flex"
            padding={2}
            px={4}
            justifyContent="space-between"
          >
            <Box>
              <Box display="inline" color="grey.600">
                Account:
              </Box>{' '}
              {accountId}
            </Box>
            <Box>
              <Box display="inline" color="grey.600">
                Rating:
              </Box>{' '}
              {rating}/5
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

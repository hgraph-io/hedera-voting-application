'use client'

import { useParams } from 'next/navigation'
import { useRating } from '@/context'
import { Box, Rating, Typography } from '@/components'

export default function TotalVotes() {
  const { id } = useParams()
  const { ratingState } = useRating()
  const ratings = ratingState?.[id as string]
  return (
    <>
      <Typography variant="h4">
        Total Votes
        <Box fontSize="h6.fontSize" display="inline" pl={3} color="grey.600">
          {ratings?.total ? '(' + ratings?.total + ' votes)' : ''}
        </Box>
      </Typography>{' '}
      <Rating average={ratings?.average || 0} value={ratings?.average || 0} readOnly={true} />
    </>
  )
}

import { Button } from '@mui/material'

export default function BackButton({ href }: { href: string }) {
  return (
    <Button component="a" href={href} variant="outlined" sx={{ margin: '40px 0' }}>
      Back
    </Button>
  )
}

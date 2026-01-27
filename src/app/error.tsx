'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Box
      sx={{
        padding: 8,
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Something went wrong
      </Typography>

      <Typography color="text.secondary" sx={{ marginTop: 2, marginBottom: 4 }}>
        {error.message || 'Failed to load arrest records'}
      </Typography>

      <Button variant="contained" onClick={reset}>
        Try again
      </Button>
    </Box>
  )
}

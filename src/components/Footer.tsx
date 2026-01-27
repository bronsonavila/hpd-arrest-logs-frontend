'use client'

import CloseIcon from '@mui/icons-material/Close'
import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import {
  GridFooterContainer,
  gridFilteredTopLevelRowCountSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid-pro'
import { useState } from 'react'

export function Footer() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const apiRef = useGridApiContext()
  const totalRowCount = useGridSelector(apiRef, gridFilteredTopLevelRowCountSelector)

  const handleOpenDialog = () => setIsDialogOpen(true)

  const handleCloseDialog = () => setIsDialogOpen(false)

  return (
    <GridFooterContainer
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        pl: 1.25,
        pr: 1,
        py: 1
      }}
    >
      <Typography variant="body2">Total Rows: {totalRowCount.toLocaleString()}</Typography>

      <Button onClick={handleOpenDialog} size="small">
        About
      </Button>

      <Dialog onClose={handleCloseDialog} open={isDialogOpen} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          About HPD Arrest Logs
          <IconButton onClick={handleCloseDialog} size="small" aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box component="section">
            <Typography variant="body2" color="text.secondary">
              This database contains publicly available arrest records from the Honolulu Police
              Department. Data is sourced from the last 2 weeks of official{' '}
              <Link
                href="https://www.honolulupd.org/information/arrest-logs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                HPD Arrest Logs
              </Link>
              .
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Data is automatically extracted from PDF documents using AI-powered text recognition
              without human review. Each extraction is validated through multiple verification
              checks to ensure accuracy. For official records, please refer to the original HPD
              arrest logs.
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box component="section" sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Disclaimer</Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              An arrest does not mean that a person has been convicted of a crime. All individuals
              are presumed innocent until proven guilty in a court of law.
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              This website is independently maintained by{' '}
              <Link href="https://www.bronsonavila.com" target="_blank" rel="noopener noreferrer">
                Bronson Avila
              </Link>{' '}
              for public interest purposes only and is not affiliated with the Honolulu Police
              Department.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </GridFooterContainer>
  )
}

import BaseLayout from '@/layouts/BaseLayout'
import { Typography } from '@mui/material'
import React from 'react'

const HomePage = (): React.ReactElement => {
  return (
    <BaseLayout>
      <Typography variant="h4">Home</Typography>
    </BaseLayout>
  )
}

export default HomePage

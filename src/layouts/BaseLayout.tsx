import { Container } from '@mui/material'
import React from 'react'

type BaseLayoutProps = {
  children: React.ReactNode
}

const BaseLayout = (props: BaseLayoutProps): React.ReactElement => {
  return (
    <Container maxWidth="md" sx={{ marginTop: '36px' }}>
      {props.children}
    </Container>
  )
}

export default BaseLayout

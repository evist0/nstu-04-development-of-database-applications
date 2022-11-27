import styled from '@emotion/styled';
import React, { FC, ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';

const FullHeightContainer = styled(Stack)`
  height: 100vh;
`

type Props = {
  title?: ReactNode
  content?: ReactNode
}

export const AuthLayout: FC<Props> = ({title, content}) =>
  <FullHeightContainer maxWidth={'sm'} direction={'column'} m={'auto'} justifyContent={'center'} spacing={4}>
    <Typography variant={'h4'} component={'h1'} align={'center'}>{title}</Typography>

    {content}
  </FullHeightContainer>

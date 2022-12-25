import type { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'
import type { ModalProps } from '@mui/material/Modal'
import BaseModal from '@mui/material/Modal'

const styles = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

type Props = {
  children: ReactNode
} & Omit<ModalProps, 'children'>

export const Modal: FC<Props> = ({ children, ...restProps }) => (
  <BaseModal {...restProps}>
    <Box sx={styles}>{children}</Box>
  </BaseModal>
)

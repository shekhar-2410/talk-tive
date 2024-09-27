import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box
  } from '@chakra-ui/react'
const CutomeModal = ({children,message}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
      <Button variant={"ghost"} onClick={onOpen}>{message}</Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'xs'}>
        <ModalOverlay />
        <ModalContent>
          
          <ModalCloseButton />
          <ModalBody >
            {children}
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default CutomeModal;
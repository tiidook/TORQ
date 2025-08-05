import { Stack } from "@mui/material"
import { OpenModalButton } from "./styles"
import { useState } from "react"
import { IpLookupModal } from "./IpLookupModal"

export const IpLookup = () => {
    const [isModalOpened, setModalOpened] = useState<boolean>(false)

    const handleModalClose = () => setModalOpened(false)
    const handleModalOpen = () => setModalOpened(true)

    return (
        <Stack direction="row" paddingTop={2} paddingRight={4} justifyContent="flex-end">
            <OpenModalButton onClick={handleModalOpen}>Open IP lookup</OpenModalButton>
            <IpLookupModal isOpen={isModalOpened} handleClose={handleModalClose} />
        </Stack>
    )
}
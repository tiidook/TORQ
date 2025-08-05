import { useState, type FC } from "react";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from "react-toastify";
import { Box, CircularProgress, Divider, Modal, Stack, Typography } from "@mui/material";

import type { IpStateItem } from "./types";
import { IP_REGEXP } from "./const";
import { AddButton, CounterIcon, IpInput, IPList, IPListItem, ModalContainer } from "./styles";
import { CloseIcon } from "../../icons/CloseIcon";
import { TimeDisplay } from "./TimeDisplay";


interface IpLookupModalProps {
    isOpen: boolean,
    handleClose: () => void,
}

export const IpLookupModal: FC<IpLookupModalProps> = ({ isOpen, handleClose }) => {
    const [ips, setIps] = useState<IpStateItem[]>([{ value: '', error: false }]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (index: number, value: string) => {
        const newIps = [...ips];
        newIps[index].value = value;
        newIps[index].error = !IP_REGEXP.test(value);
        setIps(newIps);
    };

    const addInput = () => {
        setIps([...ips, { value: '', error: false }]);
    };

    const handleModalClose = () => {
        setIps([{ value: '', error: false }]);
        handleClose();
    }

    const handleGetData = async (ipIndex: number) => {
        const ip = ips[ipIndex];

        if (ip.error || !ip.value) {
            return;
        }

        setIsLoading(true);
        try {
            const countryResponse = await axios.get(`https://ipwho.is/${ip.value}`);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any = await countryResponse.data;

            if (!data.success) {
                toast.warning(`Country code for IP ${ip.value} is undefined`);
                return;
            }

            const newIps = [...ips];
            newIps[ipIndex].countryCode = data.country_code.toLowerCase();
            newIps[ipIndex].timezone = data.timezone?.id;
            setIps(newIps);

        } catch (error: unknown) {
            toast.error('Something went wrong');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const isAddDisabled = ips.length ? ips[ips.length - 1].error || !ips[ips.length - 1].value : false;

    return (
        <Modal
            open={isOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalContainer data-testid='modal-container'>
                <Stack justifyContent="space-between" direction='row' padding={2} data-testid='modal-header'>
                    <Typography fontWeight={700} data-testid='modal-name'>IP Lookup</Typography>
                    <CloseIcon onClick={handleModalClose} cursor={'pointer'} />
                </Stack>
                <Divider />
                <Box padding={2} data-testid='description-container'>
                    <Typography color="#696969" data-testid='description'>Enter one or more IP addresses and get their country</Typography>
                    <AddButton loading={isLoading} disabled={isAddDisabled} startIcon={<AddIcon />} onClick={addInput} data-testid='add-button'>Add</AddButton>
                </Box>
                <Divider variant="middle" />
                <IPList data-testid='ip-list'>
                    {ips.map((ip, index) => (
                        <IPListItem key={`${ip}.${index}`} data-testid='ip-list-item'>
                            <CounterIcon data-testid='counter-icon'>{index + 1}</CounterIcon>
                            <IpInput
                                value={ip.value}
                                error={ip.error}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onBlur={() => handleGetData(index)}
                                disabled={isLoading}
                                inputProps={{ 'data-testid': 'ip-input' }}
                            />
                            {ip.countryCode && (
                                <Box
                                    component="img"
                                    src={`https://flagcdn.com/${ip.countryCode}.svg`}
                                    alt="Flag"
                                    sx={{
                                        width: 50,
                                        height: 30,
                                        objectFit: 'cover',
                                        borderRadius: 1,
                                    }}
                                    data-testid='flag-image'
                                />
                            )}
                            {ip.timezone && !isLoading && (
                                <TimeDisplay timezoneId={ip.timezone} />
                            )}
                            {isLoading && <CircularProgress data-testid='ciricular-progress' />}
                        </IPListItem>
                    ))}
                </IPList>
            </ModalContainer>
        </Modal>
    )
}
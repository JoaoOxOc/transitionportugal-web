/** @jsxImportSource theme-ui */

import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';

import { ContactcardStyles as styles } from './contactcard.style';

import { i18nextContacts } from "@transitionpt/translations";
import useContactData from '../../hooks/useContactData';

import {MdOutlineMail} from 'react-icons/md';

export default function ContactCard() {
    const { data, error, loading } = useContactData('');
    return (
        <Flex sx={styles.contactcard}>
            <Box sx={styles.contactCardInner}>
                { data != null &&
                    <p><span sx={styles.contactTitle}><MdOutlineMail/> {i18nextContacts.t('CONTACTS.email_input_label')} </span> <span sx={styles.contactDetail}>{data.email}</span></p>
                }
            </Box>
        </Flex>
    );
}
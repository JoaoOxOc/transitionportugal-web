/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';

import { ContactsStyles as styles } from './contacts.style';

import { i18nextContacts } from "@transitionpt/translations";

export default function Contacts() {

    return (
        <Flex sx={styles.contacts}>
        </Flex>
    );
}
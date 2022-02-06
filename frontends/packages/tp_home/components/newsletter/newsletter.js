/** @jsxImportSource theme-ui */

import { Flex, Box, Input, Label, Image, Button } from 'theme-ui';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

import { i18nextNewsletter } from "@transitionpt/translations";

import { NewsletterStyles as styles } from './newsletter.style';

export default function Newsletter() {
    const [currentLang, setLang] = useState("pt");
    i18nextNewsletter.changeLanguage(currentLang);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    }

    //console.log(watch("newsemail")); // watch input value by passing the name of it
  
    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    return (
        <Flex sx={styles.newsletter}>
            <Box as="form" sx={styles.newsletterForm} onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="newsemail">{ i18nextNewsletter.t('NEWSLETTER.email_input_label') }</Label>
                <input 
                    {...register("newsemail", { required: true, maxLength: 100, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i })}
                    aria-labelledby={ i18nextNewsletter.t('NEWSLETTER.email_input_label') } 
                    aria-describedby={ i18nextNewsletter.t('NEWSLETTER.email_input_help') } 
                    name="newsemail" 
                    id="newsemail" 
                    placeholder={i18nextNewsletter.t('NEWSLETTER.email_input_placeholder')} 
                    mb={3} 
                />
                <Button type="submit">{i18nextNewsletter.t('NEWSLETTER.subscribe_button')}</Button>
            </Box>
        </Flex>
    );
}
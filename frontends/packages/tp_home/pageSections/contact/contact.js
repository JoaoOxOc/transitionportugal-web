/** @jsxImportSource theme-ui */

import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import { Slide, Fade, Pulse } from "react-awesome-reveal";
import parse from 'html-react-parser';

import { ContactStyles as styles } from './contact.style';

import ContactForm from './contactForm';
import { i18nextContacts } from "@transitionpt/translations";

export default function Contact({contactComponentObject}) {
    const { t } = i18nextContacts;
    const parseSectionHeader = () => {
        const headerText = aboutComponentObject.SectionTitle;
        const headerParagraph = aboutComponentObject.SectionParagraphs;
        return (
            <>
                {parse(headerText)}
                {parse(headerParagraph)}
            </>
        )
    }
    return (
        <section id="contactUs" sx={styles.contactUs}>
            <Container>
                <Flex sx={styles.contactUsGrid}>
                    <Box sx={styles.contactUsTitle}>
                        <Slide direction='down'>
                            <div>
                                <h2>{t('LABELS.contactUsTitle')}</h2>
                            </div>
                        </Slide>
                        <Slide direction='left'>
                            <div>
                                <p>{t('LABELS.contactUsMessage')}</p>
                            </div>
                        </Slide>
                    </Box>
                </Flex>
                <Flex sx={styles.contactUsForm}>
                    <Fade>
                            <div>
                                <ContactForm contactComponentObject={contactComponentObject}/>
                            </div>
                    </Fade>
                </Flex>
            </Container>
        </section>
    )
}

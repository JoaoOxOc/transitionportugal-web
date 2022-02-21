/** @jsxImportSource theme-ui */

import { Image } from 'theme-ui';
import { TraditionalLink } from '../../components/generic/link';

import { PartnerCardStyles as styles } from './partnercard.style';

export default function PartnerCard({
    src,
    alt,
    name,
    link,
    description,
  }) {

    return (
        <div sx={styles.partnerCard}>
            <TraditionalLink
                    path={link}
                    sx={styles.partnerLink}
                    target='_blank'
                    aria-label={ name }
                    rel='noopener'
                >
                <Image src={src} alt={alt}/>
            </TraditionalLink>
        </div>
    );
}
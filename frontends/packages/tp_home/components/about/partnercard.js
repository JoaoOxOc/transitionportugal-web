/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Image } from 'theme-ui';
import { Link } from '../../components/generic/link';

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
            <Link
                    path={link}
                    sx={styles.partnerLink}
                    target='_blank'
                    aria-label={ name }
                    rel='noopener'
                >
                <Image src={src} alt={alt}/>
            </Link>
        </div>
    );
}
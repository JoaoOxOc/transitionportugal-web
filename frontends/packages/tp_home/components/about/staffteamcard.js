/** @jsxImportSource theme-ui */

import { Image } from 'theme-ui';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { StaffTeamCardStyles as styles } from './staffteamcard.style';

export default function StaffTeamCard({
    src,
    alt,
    name,
    job,
    description,
  }) {

    return (
        <div sx={styles.staffteamCard}>
            <Image src={src} alt={alt}/>
            <div sx={styles.staffteamCardTitleContainer}>
                <h2>{name}</h2>
                <div sx={styles.staffteamCardTitleJob}><span>{job}</span></div>
            </div>
            <div sx={styles.staffteamCardSocial}>

            </div>
            <div sx={styles.staffteamCardDescription}>
                <SimpleBar autoHide={true} style={{ maxHeight: 250, padding: '10px' }}>
                    {description}
                </SimpleBar>
            </div>
        </div>
    );
}
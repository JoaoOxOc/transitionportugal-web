/** @jsxImportSource theme-ui */
import { Image, Box, Heading, Text, Flex, Link } from 'theme-ui';

export default function EventCard({
  src,
  alt,
  eventLink,
  title,
  orgName,
  date,
  tag,
  place,
}) {
    const eventDate = new Date(date);
    var monthDateOptions = { month: 'short' };
    var fullDateOptions = { year: 'numeric', month: 'long', day: 'numeric' }; // weekday: 'long', 

  return (
    <Box sx={styles.card}>
      <Box sx={styles.thumbnail}>
        <Image src={src} alt={alt} />
      </Box>
      <Box sx={styles.dateOverlay}>
        <span sx={styles.dateOverlayMonth}>{eventDate.toLocaleDateString('pt-PT', monthDateOptions)}</span>
        <span sx={styles.dateOverlayDay}>{eventDate.getDate()}</span>
      </Box>

      <Flex sx={styles.postContent}>
        <Heading sx={styles.title}>
          <Link href={eventLink} variant="blog">
            {title}
          </Link>
        </Heading>

        <Flex sx={styles.postFooter}>
          <Text sx={styles.postFooter.name}>{orgName}</Text>
          <Text sx={styles.postFooter.date}>{eventDate.toLocaleDateString('pt-PT', fullDateOptions)}</Text>
        </Flex>
        <Flex sx={styles.postFooter}>
          <Text sx={Object.assign({},styles.postFooter.badge, styles.postFooter.tag, styles.postFooter.badgeSport)}>{tag}</Text>
          <Text sx={styles.postFooter.place}>{place}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    boxShadow: '0px 4px 10px rgba(38,78,118,0.12)',
    borderRadius: '7px',
    m: '0 15px 20px',
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow: '0px 5px 20px rgba(38,78,118,0.15)',
    },
  },
  thumbnail: {
    borderRadius: '7px 7px 0 0',
    overflow: 'hidden',
    display: 'flex',
    img: {
      width: '100%'
    },
  },
  thumbnailonly: {
    borderRadius: '7px 7px 0 0',
    overflow: 'hidden',
    display: 'flex',
    img: {
      width: '100%',
    },
  },
  dateOverlay: {
    position: 'absolute',
    boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)',
    color: '#191a1a',
    backgroundColor: '#FFFFFF',
    top: '1.75rem',
    right: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    textAlign: 'center'
  },
  dateOverlayMonth: {
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  dateOverlayDay: {
    fontSize: '1.125rem',
    fontWeight: 300,
    lineHeight: 1
  },
  postContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: ['15px 20px', '25px 30px'],
  },
  title: {
    fontSize: [3, null, null, null, null, 4],
    color: 'heading',
    height: '50px',
    lineHeight: [1.4, 1.5],
    fontWeight: 700,
    mb: [3, 4, 5],
    pr: [0, null, null, null, 5],
    a: {
        boxSizing: 'border-box',
        margin: '0px',
        minWidth: '0px',
        display: 'block',
        paddingLeft: '0px',
        paddingRight: '0px',
        color: 'inherit',
        textDecoration: 'none',
        fontSize: 'inherit',
        transition: 'color 0.25s ease 0s',
        cursor: 'pointer',
        '&:hover': {
            color: '#EA3A60'
        }
    }
  },
  postFooter: {
    width: '100%',
    justifyContent: 'space-between',
    alignItem: 'center',
    name: {
      fontSize: ['14px', null, 2],
      fontWeight: 500,
      color: '#EA3A60',
      lineHeight: 1.4,
    },
    date: {
      fontSize: ['14px', null, 2],
      fontWeight: 400,
      lineHeight: 1.5,
    },
    place: {
        display: 'flex',
        fontSize: ['14px', null, 2],
        fontWeight: 700,
        lineHeight: 1.5,
        alignItems:'center',
        justifyContent: 'center'
    },
    badge: {
        display: 'inline-block',
        padding: '0.25em 0.4em',
        fontSize: '75%',
        fontWeight: 700,
        lineHeight: 1,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'baseline',
        borderRadius: '0.375rem',
        transition: 'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
    },
    badgeSport: {
        backgroundColor: '#2C8397',
        color: '#FFFFFF'
    },
    tag: {
        fontSize: ['14px', null, 2],
        fontWeight: 500,
        lineHeight: 1.5,
    },
  },
};

export const EconomyModalStyle = {
    modal: {
        width: '250px',
        height: '170px',
        background: 'white',
        color: 'white',
        zIndex: 10,
        borderRadius: '16px',
        boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.04)'
      },
      
      modalHeader: {
        height: '50px',
        background: 'white',
        overflow: 'hidden',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px'
      },
      
      heading: {
        margin: 0,
        padding: '10px',
        color: '#2c3e50',
        fontWeight: 500,
        fontSize: '18px',
        textAlign: 'center'
      },
      
      modalContent: {
        padding: '10px',
        fontSize: '14px',
        color: '#2c3e50',
        textAlign: 'center'
      },
      
      modalActions: {
        position: 'absolute',
        bottom: '2px',
        marginBottom: '10px',
        width: '100%'
      },
      
      actionsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      
      closeBtn: {
        cursor: 'pointer',
        fontWeight: 500,
        padding: '4px 8px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '18px',
        color: '#2c3e50',
        background: 'white',
        transition: 'all 0.25s ease',
        boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.06)',
        position: 'absolute',
        right: 0,
        top: 0,
        alignSelf: 'flex-end',
        marginTop: '-7px',
        marginRight: '-7px',
        '&:hover': {
            boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.04)',
            transform: 'translate(-4px, 4px)'
          }
      },
      
      
      deleteBtn: {
        marginTop: '10px',
        cursor: 'pointer',
        fontWeight: 500,
        padding: '11px 28px',
        borderRadius: '12px',
        fontSize: '0.8rem',
        border: 'none',
        color: '#fff',
        background: '#ff3e4e',
        transition: 'all 0.25s ease',
        '&:hover': {
            boxShadow: '0 10px 20px -10px rgba(255, 62, 78, 0.6)',
            transform: 'translateY(-5px)',
            background: '#ff3e4e'
          }
      },
      
      cancelBtn: {
        marginTop: '10px',
        cursor: 'pointer',
        fontWeight: 500,
        padding: '11px 28px',
        borderRadius: '12px',
        fontSize: '0.8rem',
        border: 'none',
        color: '#2c3e50',
        background: '#fcfcfc',
        transition: 'all 0.25s ease',
        '&:hover': {
            boxShadow: 'none',
            transform: 'none',
            background: 'whitesmoke'
          }

      }
}
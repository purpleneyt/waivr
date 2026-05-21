export default function PhoneFrame({ children }) {
  return (
    <div style={styles.phoneFrameContainer}>
      {/* Notch */}
      <div style={styles.notch} />
      
      {/* Camera dot */}
      <div style={styles.cameraDot} />
      
      {/* Screen content */}
      <div style={styles.screenContent}>
        {children}
      </div>
    </div>
  )
}

const styles = {
  phoneFrameContainer: {
    position: 'relative',
    width: '390px',
    maxHeight: '844px',
    margin: '0 auto',
    backgroundColor: '#000',
    borderRadius: '40px',
    padding: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    border: '12px solid #1a1a1a',
  },
  notch: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '170px',
    height: '28px',
    backgroundColor: '#000',
    borderRadius: '0 0 40px 40px',
    zIndex: 10,
  },
  cameraDot: {
    position: 'absolute',
    top: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '12px',
    height: '12px',
    backgroundColor: '#111',
    borderRadius: '50%',
    zIndex: 11,
  },
  screenContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--color-bg-primary)',
    borderRadius: '32px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
}

export default function PhoneFrame({ children }) {
  return (
    <div style={styles.desktop}>
      <div style={styles.phone}>

        {/* Status Bar */}
        <div style={styles.statusBar}>
          <span style={styles.time}>16:44</span>
        </div>

        {/* Notch */}
        <div style={styles.notch} />

        {/* Screen Content */}
        <div className="phone-content" style={styles.content}>
          {children}
        </div>

      </div>

      {/* Hide scrollbar */}
      <style>{`
        .phone-content::-webkit-scrollbar { display: none; }
        .phone-content { overflow: -moz-scrollbars-none; }
      `}</style>
    </div>
  )
}

const styles = {
  desktop: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
  },
  phone: {
    width: '390px',
    height: '844px',
    backgroundColor: '#f8f8f8',
    borderRadius: '50px',
    border: '10px solid #111111',
    boxShadow: '0 30px 80px rgba(0,0,0,0.8), inset 0 0 0 2px #333',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  notch: {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '150px',
    height: '30px',
    backgroundColor: '#111111',
    borderRadius: '0 0 20px 20px',
    zIndex: 20,
    pointerEvents: 'none',
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingTop: '3px',
    height: '30px',
    flexShrink: 0,
    zIndex: 10,
    backgroundColor: '#f8f8f8',
  },
  time: {
    fontFamily: 'var(--font-numbers)',
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a2e',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
  },
}
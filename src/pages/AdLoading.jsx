import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function AdLoading() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Simulate ad loading and transition to playback after 2 seconds
    const timer = setTimeout(() => {
      navigate('/ad-playback', { state: location.state })
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate, location.state])

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.iconSection}>
          <div style={styles.loader}>
            <div style={styles.loaderInner}></div>
          </div>
        </div>

        <h1 style={styles.title}>Loading Your Ad</h1>
        <p style={styles.subtitle}>Get ready to earn fee-free transfer</p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
  },
  content: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  iconSection: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-bg-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: '60px',
    height: '60px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderInner: {
    width: '50px',
    height: '50px',
    border: '3px solid var(--color-border)',
    borderTop: '3px solid var(--color-primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-text)',
  },
}

// Add animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(style)
}

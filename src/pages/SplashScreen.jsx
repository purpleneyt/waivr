import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import waivrLogo from '../assets/waivr_logo_text.png'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Logo */}
        <img src={waivrLogo} alt="Waivr" style={styles.logo} />

        {/* Tagline */}
        <div style={styles.tagline}>
          Watch. Me. Waive.
        </div>

        {/* Loading indicator */}
        <div style={styles.loader}>
          <div style={styles.pulse}></div>
        </div>
      </div>

      {/* Footer text */}
      <div style={styles.footer}>
        Ad-ios, transfer fees.
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    textAlign: 'center',
    padding: '20px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
  },
  logo: {
    width: '200px',
    objectFit: 'contain',
    filter: 'brightness(0) saturate(100%) invert(18%) sepia(84%) saturate(1534%) hue-rotate(265deg)',
  },
  tagline: {
    fontSize: '18px',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-deep)',
    fontWeight: '500',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40px',
  },
  pulse: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  footer: {
    position: 'absolute',
    bottom: '30px',
    fontSize: '12px',
    color: 'var(--color-primary)',
    fontFamily: 'var(--font-text)',
    fontStyle: 'italic',
  },
}

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.innerHTML = `
    @keyframes pulse {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }
  `
  document.head.appendChild(style)
}
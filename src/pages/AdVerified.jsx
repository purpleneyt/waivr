import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function AdVerified() {
  const navigate = useNavigate()
  const location = useLocation()
  const transferData = location.state || {}

  useEffect(() => {
    // Redirect to transfer processing after 2 seconds
    const timer = setTimeout(() => {
      navigate('/transfer-processing', { state: transferData })
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate, transferData])

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.successIcon}>✓</div>
        <h1 style={styles.title}>Ad Watched!</h1>
        <p style={styles.subtitle}>Your fee waiver has been applied</p>
        <p style={styles.message}>Proceeding to transfer...</p>
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
    gap: '16px',
  },
  successIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'rgba(124, 47, 239, 0.2)',
    border: '2px solid var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: '700',
    color: 'var(--color-primary)',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-text)',
  },
  message: {
    fontSize: '12px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
    marginTop: '12px',
    fontStyle: 'italic',
  },
}

import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function TransferProcessing() {
  const navigate = useNavigate()
  const location = useLocation()
  const transferData = location.state || {}
  const [steps, setSteps] = useState({
    validation: { status: 'in-progress', time: null },
    adSelection: { status: 'pending', time: null },
    adVerification: { status: 'pending', time: null },
    feeVerification: { status: 'pending', time: null },
    execution: { status: 'pending', time: null },
  })

  useEffect(() => {
    // Simulate processing steps
    const step1 = setTimeout(() => {
      setSteps((prev) => ({
        ...prev,
        validation: { status: 'completed', time: new Date() },
        adSelection: { status: 'in-progress', time: null },
      }))
    }, 600)

    const step2 = setTimeout(() => {
      setSteps((prev) => ({
        ...prev,
        adSelection: { status: 'completed', time: new Date() },
        adVerification: { status: 'in-progress', time: null },
      }))
    }, 1200)

    const step3 = setTimeout(() => {
      setSteps((prev) => ({
        ...prev,
        adVerification: { status: 'completed', time: new Date() },
        feeVerification: { status: 'in-progress', time: null },
      }))
    }, 1800)

    const step4 = setTimeout(() => {
      setSteps((prev) => ({
        ...prev,
        feeVerification: { status: 'completed', time: new Date() },
        execution: { status: 'in-progress', time: null },
      }))
    }, 2300)

    const timer = setTimeout(() => {
      setSteps((prev) => ({
        ...prev,
        execution: { status: 'completed', time: new Date() },
      }))
      navigate('/transfer-success', { state: transferData })
    }, 3000)

    return () => {
      clearTimeout(step1)
      clearTimeout(step2)
      clearTimeout(step3)
      clearTimeout(step4)
      clearTimeout(timer)
    }
  }, [navigate, transferData])

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.iconSection}>
          <div style={styles.spinner}>
            <div style={styles.spinnerInner}></div>
          </div>
        </div>

        <h1 style={styles.title}>Processing Transfer</h1>

        <div style={styles.stepsSection}>
          <div style={styles.step}>
            <div style={{...styles.stepIcon, ...getStepStyle(steps.validation.status)}}>
              {steps.validation.status === 'completed' ? '✓' : ''}
            </div>
            <div style={styles.stepLabel}>Validating Account</div>
            <div style={styles.stepSubtext}>Risk Score: {transferData.riskScore || 0}</div>
          </div>

          {!['instant-pay'].includes(transferData.transferRoute) && (
            <>
              <div style={styles.step}>
                <div style={{...styles.stepIcon, ...getStepStyle(steps.adSelection.status)}}>
                  {steps.adSelection.status === 'completed' ? '✓' : ''}
                </div>
                <div style={styles.stepLabel}>Selecting Ad</div>
              </div>

              <div style={styles.step}>
                <div style={{...styles.stepIcon, ...getStepStyle(steps.adVerification.status)}}>
                  {steps.adVerification.status === 'completed' ? '✓' : ''}
                </div>
                <div style={styles.stepLabel}>Verifying Ad</div>
              </div>

              <div style={styles.step}>
                <div style={{...styles.stepIcon, ...getStepStyle(steps.feeVerification.status)}}>
                  {steps.feeVerification.status === 'completed' ? '✓' : ''}
                </div>
                <div style={styles.stepLabel}>Approving Subsidy</div>
                <div style={styles.stepSubtext}>₱{transferData.transferFee || 0} fee waived</div>
              </div>
            </>
          )}

          <div style={styles.step}>
            <div style={{...styles.stepIcon, ...getStepStyle(steps.execution.status)}}>
              {steps.execution.status === 'completed' ? '✓' : ''}
            </div>
            <div style={styles.stepLabel}>Executing Transfer</div>
          </div>
        </div>

        <div style={styles.details}>
          <div style={styles.detailRow}>
            <span>Amount</span>
            <span style={styles.detailValue}>₱{transferData.amount || 0}.00</span>
          </div>
          <div style={styles.detailRow}>
            <span>Fee</span>
            <span style={{ ...styles.detailValue, color: transferData.paymentMode === 'sponsored' ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
              {transferData.paymentMode === 'sponsored' ? 'FREE ✓' : `₱${transferData.transferFee || 0}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const getStepStyle = (status) => {
  if (status === 'completed') {
    return { backgroundColor: 'rgba(76, 175, 80, 0.2)', borderColor: '#4CAF50', color: '#4CAF50' }
  }
  if (status === 'in-progress') {
    return { backgroundColor: 'rgba(124, 47, 239, 0.2)', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }
  }
  return { backgroundColor: 'transparent', borderColor: 'var(--color-border)', color: 'var(--color-text-tertiary)' }
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
    padding: '20px',
  },
  content: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    maxWidth: '320px',
  },
  iconSection: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-bg-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: '80px',
    height: '80px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerInner: {
    width: '70px',
    height: '70px',
    border: '3px solid var(--color-border)',
    borderTop: '3px solid var(--color-primary)',
    borderRadius: '50%',
    animation: 'spin 1.5s linear infinite',
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
  details: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    padding: '16px',
    width: '100%',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '14px',
    fontFamily: 'var(--font-text)',
  },
  detailValue: {
    fontWeight: '600',
    fontFamily: 'var(--font-numbers)',
  },
  stepsSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
  },
  stepIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '700',
    flexShrink: 0,
  },
  stepLabel: {
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-primary)',
  },
  stepSubtext: {
    marginLeft: 'auto',
    fontSize: '12px',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-text-secondary)',
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

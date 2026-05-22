import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronRight, AlertCircle } from 'lucide-react'
import { validateTransfer, calculateFees, getUserData } from '../services/mockApi'
import BottomNav from '../components/BottomNav'

export default function SendMoney() {
  const navigate = useNavigate()
  const location = useLocation()
  const [recipientName, setRecipientName] = useState('')
  const [recipientMobile, setRecipientMobile] = useState('')
  const [amount, setAmount] = useState(0)
  const [transferRoute, setTransferRoute] = useState('instapay')
  const [paymentMode, setPaymentMode] = useState('standard')
  const [validationError, setValidationError] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [userData, setUserData] = useState(null)
  const [calculatedFee, setCalculatedFee] = useState(0)

  useEffect(() => {
    // If coming from WaivrBanner with sponsored mode, set it
    if (location.state?.paymentMode === 'sponsored') {
      setPaymentMode('sponsored')
    }
  }, [location.state])

  useEffect(() => {
    // Load user data on component mount
    const loadUserData = async () => {
      const data = await getUserData()
      setUserData(data)
    }
    loadUserData()
  }, [])

  // Calculate fee when amount or payment mode changes
  useEffect(() => {
    if (amount > 0) {
      const calculateFeeAsync = async () => {
        const feeInfo = await calculateFees({
          amount,
          paymentMode,
          transferRoute,
        })
        setCalculatedFee(feeInfo.userPaysFee)
      }
      calculateFeeAsync()
    } else {
      setCalculatedFee(0)
    }
  }, [amount, paymentMode, transferRoute])

  const transferFee = calculatedFee
  const totalAmount = amount + transferFee

  const handleSendMoney = async () => {
    setValidationError('')
    setIsValidating(true)

    try {
      // Validate transfer
      const validation = await validateTransfer({
        recipient: { name: recipientName, mobile: recipientMobile },
        amount,
        transferRoute,
        paymentMode,
      })

      if (!validation.valid) {
        setValidationError(validation.error)
        setIsValidating(false)
        return
      }

      const transferData = {
        recipient: { name: recipientName, mobile: recipientMobile },
        amount,
        transferRoute,
        paymentMode,
        transferFee: calculatedFee,
        riskScore: validation.riskScore,
        validation,
      }

      // PESONet skips ads and goes directly to processing
      if (transferRoute === 'pesonet') {
        navigate('/transfer-processing', { state: transferData })
      }
      // InstaPay with sponsored mode watches ads
      else if (transferRoute === 'instapay' && paymentMode === 'sponsored') {
        navigate('/ad-loading', { state: transferData })
      }
      // InstaPay with standard mode skips ads
      else {
        navigate('/transfer-processing', { state: transferData })
      }
    } catch (error) {
      setValidationError('An error occurred. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <button onClick={() => navigate('/home')} style={styles.backBtn}>
            ‹
          </button>
          <h1 style={styles.title}>Send Money</h1>
        </div>

        {/* Validation Error */}
        {validationError && (
          <div style={styles.errorBanner}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span style={styles.errorText}>{validationError}</span>
          </div>
        )}

        {/* Daily Limits Section */}
        {userData && (
          <div style={styles.limitsSection}>
            <div style={styles.limitItem}>
              <div style={styles.limitLabel}>Daily Spent</div>
              <div style={styles.limitValue}>₱{userData.wallet.dailySpent.toLocaleString('en-PH')}</div>
            </div>
            <div style={styles.limitSpacer}>/</div>
            <div style={styles.limitItem}>
              <div style={styles.limitLabel}>Daily Limit</div>
              <div style={styles.limitValue}>₱{userData.wallet.dailyLimit.toLocaleString('en-PH')}</div>
            </div>
          </div>
        )}

        {/* Recipient Section */}
        <div style={styles.section}>
          <label style={styles.sectionLabel}>RECIPIENT</label>
          <div style={styles.recipientCard}>
            <div style={styles.recipientAvatar}>👤</div>
            <div style={styles.recipientInputs}>
              <input
                type="text"
                placeholder="Recipient Name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                style={styles.recipientInput}
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={recipientMobile}
                onChange={(e) => setRecipientMobile(e.target.value)}
                style={styles.recipientInput}
              />
            </div>
          </div>
        </div>

        {/* Amount Section */}
        <div style={styles.section}>
          <label style={styles.sectionLabel}>AMOUNT</label>
          <div style={styles.amountInput}>
            <span style={styles.currencySymbol}>₱</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                setAmount(val === '' ? '' : parseInt(val, 10) || 0);
              }}
              style={styles.amountField}
            />
          </div>
        </div>

        {/* Transfer Route Section */}
        <div style={styles.section}>
          <label style={styles.sectionLabel}>TRANSFER ROUTE</label>
          <div style={styles.routeContainer}>
            <button
              style={{
                ...styles.routeButton,
                ...(transferRoute === 'instapay' ? styles.routeButtonActive : {}),
              }}
              onClick={() => setTransferRoute('instapay')}
            >
              <div style={styles.routeName}>InstaPay</div>
              <div style={styles.routeDescription}>Real-time</div>
            </button>
            <button
              style={{
                ...styles.routeButton,
                ...(transferRoute === 'pesonet' ? styles.routeButtonActive : {}),
              }}
              onClick={() => setTransferRoute('pesonet')}
            >
              <div style={styles.routeName}>PESONet</div>
              <div style={styles.routeDescription}>Processed at cutoff times</div>
            </button>
          </div>
        </div>

        {/* Payment Mode Section */}
        <div style={styles.section}>
          <label style={styles.sectionLabel}>PAYMENT MODE</label>
          <div style={styles.paymentModeContainer}>
            <button
              style={{
                ...styles.paymentModeButton,
                ...(paymentMode === 'sponsored' ? styles.paymentModeActive : {}),
                ...(transferRoute === 'pesonet' ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
              }}
              onClick={() => transferRoute === 'instapay' && setPaymentMode('sponsored')}
              disabled={transferRoute === 'pesonet'}
            >
              <div style={styles.paymentModeContent}>
                <div style={styles.paymentModeName}>Sponsored Transfer</div>
                <div style={styles.paymentModeDesc}>Watch a 15s ad · Pay ₱0 in fees</div>
              </div>
              {paymentMode === 'sponsored' && <div style={styles.checkmark}>✓</div>}
            </button>

            <button
              style={{
                ...styles.paymentModeButton,
                ...(paymentMode === 'standard' ? styles.paymentModeActive : {}),
                ...(transferRoute === 'pesonet' ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
              }}
              onClick={() => transferRoute === 'instapay' && setPaymentMode('standard')}
              disabled={transferRoute === 'pesonet'}
            >
              <div style={styles.paymentModeContent}>
                <div style={styles.paymentModeName}>Standard</div>
                <div style={styles.paymentModeDesc}>Regular InstaPay fee · ₱{transferFee}.00</div>
              </div>
              {paymentMode === 'standard' && <div style={styles.checkmark}>✓</div>}
            </button>
          </div>
          
          {/* PESONet info message */}
          {transferRoute === 'pesonet' && (
            <div style={styles.pesonetNote}>
              <span>ℹ️</span> PESONet transfers have no fee
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Transfer Amount</span>
            <span style={styles.summaryValue}>₱{amount.toLocaleString('en-PH')}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Transfer Fee</span>
            <span style={{...styles.summaryValue, color: (paymentMode === 'sponsored' || transferRoute === 'pesonet') ? 'var(--color-primary)' : 'var(--color-text-primary)'}}>
              {transferRoute === 'pesonet' ? '₱0.00 (No fee)' : (paymentMode === 'sponsored' ? '₱0.00' : `₱${transferFee}.00`)}
            </span>
          </div>
          <div style={styles.summaryRowTotal}>
            <span style={styles.summaryLabel}>Total</span>
            <span style={styles.summaryTotal}>₱{totalAmount.toLocaleString('en-PH')}</span>
          </div>
        </div>

        {/* Send Button */}
        <button 
          style={{
            ...styles.sendBtn,
            ...(!recipientName || !recipientMobile || amount <= 0 ? styles.sendBtnDisabled : {}),
          }}
          onClick={handleSendMoney}
          disabled={!recipientName || !recipientMobile || amount <= 0}
        >
          <span>{transferRoute === 'pesonet' ? 'Send Money' : (paymentMode === 'sponsored' ? 'Watch Ad & Send Free' : 'Send Money')}</span>
          <ArrowRight size={18} strokeWidth={2} />
        </button>
      </div>

      <BottomNav />
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    paddingBottom: '80px',
  },
  content: {
    padding: '16px',
    maxWidth: '390px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    marginTop: '0',
  },
  backBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: 'var(--color-text-primary)',
    padding: '0',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    fontFamily: 'var(--font-text)',
    margin: '0',
  },
  errorBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'rgba(255, 23, 68, 0.1)',
    border: '1px solid rgba(255, 23, 68, 0.3)',
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '16px',
    color: '#FF1744',
  },
  errorText: {
    fontSize: '13px',
    fontFamily: 'var(--font-text)',
    fontWeight: '500',
  },
  limitsSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '16px',
    border: '1px solid var(--color-border)',
  },
  limitItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  limitLabel: {
    fontSize: '11px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
    fontWeight: '500',
  },
  limitValue: {
    fontSize: '14px',
    fontWeight: '700',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-text-primary)',
  },
  limitSpacer: {
    color: 'var(--color-border)',
    fontSize: '18px',
  },
  section: {
    marginBottom: '20px',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '10px',
  },
  recipientCard: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid var(--color-border)',
  },
  recipientAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#E8DFF5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: 0,
  },
  recipientInputs: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  recipientInput: {
    padding: '8px 12px',
    backgroundColor: 'var(--color-bg-primary)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-primary)',
    fontSize: '13px',
    fontFamily: 'var(--font-text)',
    outline: 'none',
  },
  amountInput: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  currencySymbol: {
    position: 'absolute',
    left: '16px',
    fontSize: '18px',
    fontFamily: 'var(--font-numbers)',
    fontWeight: '600',
    color: 'var(--color-primary)',
  },
  amountField: {
    width: '100%',
    padding: '14px 16px 14px 40px',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    color: 'var(--color-text-primary)',
    fontSize: '24px',
    fontFamily: 'var(--font-numbers)',
    fontWeight: '600',
    outline: 'none',
  },
  routeContainer: {
    display: 'flex',
    gap: '12px',
  },
  routeButton: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '2px solid var(--color-border)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
  },
  routeButtonActive: {
    backgroundColor: 'transparent',
    borderColor: 'var(--color-primary)',
  },
  routeName: {
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-primary)',
    marginBottom: '2px',
  },
  routeDescription: {
    fontSize: '11px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
  },
  paymentModeContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  paymentModeButton: {
    padding: '14px 16px',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '2px solid var(--color-border)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentModeActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'rgba(124, 47, 239, 0.08)',
  },
  paymentModeContent: {
    flex: 1,
    textAlign: 'left',
  },
  paymentModeName: {
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-text-primary)',
    marginBottom: '2px',
  },
  paymentModeDesc: {
    fontSize: '11px',
    color: 'var(--color-text-tertiary)',
    fontFamily: 'var(--font-text)',
  },
  checkmark: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  pesonetNote: {
    marginTop: '12px',
    padding: '10px 12px',
    backgroundColor: 'rgba(124, 47, 239, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(124, 47, 239, 0.2)',
    fontSize: '12px',
    fontFamily: 'var(--font-text)',
    color: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  summaryCard: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    padding: '16px',
    marginTop: '24px',
    marginBottom: '20px',
    border: '1px solid var(--color-border)',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  summaryRowTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    borderTop: '1px solid var(--color-border)',
  },
  summaryLabel: {
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-text)',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-text-primary)',
  },
  summaryTotal: {
    fontSize: '18px',
    fontWeight: '700',
    fontFamily: 'var(--font-numbers)',
    color: 'var(--color-primary)',
  },
  sendBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '14px',
    fontFamily: 'var(--font-text)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  sendBtnDisabled: {
    backgroundColor: 'var(--color-text-tertiary)',
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}
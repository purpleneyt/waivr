// Mock API Service for Waivr Sponsored Transfer System
// Simulates backend validation, fraud detection, and transfer processing

// Mock user data
const mockUser = {
  id: 'USER_001',
  name: 'Juan Dela Cruz',
  account: '09171234567',
  wallet: {
    balance: 67320.07,
    dailySpent: 5000.00,
    dailyLimit: 50000.00,
  },
  deviceContext: {
    type: 'mobile',
    model: 'iPhone 14 Pro',
    os: 'iOS 17.4',
    appVersion: '1.0.0',
  },
}

// Mock transfer validation rules
const VALIDATION_RULES = {
  minAmount: 100,
  maxAmount: 50000,
  dailyLimit: 50000,
  sponsoredMaxDaily: 30000,
  minForSponsored: 500,
}

// Generate device fingerprint
export const generateDeviceFingerprint = () => {
  return {
    deviceId: 'DEV_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    timestamp: Date.now(),
    screenResolution: '390x844',
    timezone: 'Asia/Manila',
    language: 'en-PH',
  }
}

// Simulate fraud detection
const calculateRiskScore = (transferData) => {
  let riskScore = 0
  
  // Check for unusual amounts
  if (transferData.amount > mockUser.wallet.dailyLimit * 0.8) {
    riskScore += 15
  }
  
  // Check daily spending
  if (mockUser.wallet.dailySpent + transferData.amount > mockUser.wallet.dailyLimit) {
    riskScore += 25
  }
  
  // Random fraud detection simulation
  if (Math.random() < 0.1) {
    riskScore += 20
  }
  
  return Math.min(riskScore, 100)
}

// Validate transfer eligibility
export const validateTransfer = async (transferData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { amount, transferRoute, paymentMode } = transferData
      
      // Validate amount
      if (amount < VALIDATION_RULES.minAmount) {
        resolve({
          valid: false,
          error: `Minimum transfer amount is ₱${VALIDATION_RULES.minAmount}`,
          code: 'MIN_AMOUNT_EXCEEDED',
        })
        return
      }
      
      if (amount > VALIDATION_RULES.maxAmount) {
        resolve({
          valid: false,
          error: `Maximum transfer amount is ₱${VALIDATION_RULES.maxAmount}`,
          code: 'MAX_AMOUNT_EXCEEDED',
        })
        return
      }
      
      // Validate daily limit
      if (mockUser.wallet.dailySpent + amount > mockUser.wallet.dailyLimit) {
        resolve({
          valid: false,
          error: `Daily limit exceeded. Available: ₱${mockUser.wallet.dailyLimit - mockUser.wallet.dailySpent}`,
          code: 'DAILY_LIMIT_EXCEEDED',
        })
        return
      }
      
      // Sponsored transfer validation
      if (paymentMode === 'sponsored') {
        if (amount < VALIDATION_RULES.minForSponsored) {
          resolve({
            valid: false,
            error: `Minimum for sponsored transfer is ₱${VALIDATION_RULES.minForSponsored}`,
            code: 'SPONSORED_MIN_AMOUNT',
          })
          return
        }
      }
      
      // Calculate risk score
      const riskScore = calculateRiskScore(transferData)
      
      resolve({
        valid: riskScore < 80,
        riskScore,
        availableBalance: mockUser.wallet.balance - amount,
        newDailySpent: mockUser.wallet.dailySpent + amount,
        error: riskScore >= 80 ? 'Transfer flagged for review' : null,
        code: riskScore >= 80 ? 'HIGH_RISK' : null,
      })
    }, 800)
  })
}

// Select ad from mediation layer
export const selectAd = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ads = [
        {
          id: 'AD_001',
          brand: 'GoTyme',
          category: 'Financial Services',
          duration: 15,
          impression: 'IMP_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        },
        {
          id: 'AD_002',
          brand: 'GCash',
          category: 'Financial Services',
          duration: 15,
          impression: 'IMP_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        },
        {
          id: 'AD_003',
          brand: 'MetroBank',
          category: 'Banking',
          duration: 15,
          impression: 'IMP_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        },
      ]
      
      const selectedAd = ads[Math.floor(Math.random() * ads.length)]
      
      resolve({
        ...selectedAd,
        startTime: Date.now(),
      })
    }, 600)
  })
}

// Verify ad completion and collect signals
export const verifyAdCompletion = async (adData, watchTime) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const signals = {
        foregroundActive: true,
        watchTime: Math.min(watchTime, 15),
        interactionEvents: Math.floor(Math.random() * 3),
        suspicious: false,
        riskScore: Math.floor(Math.random() * 30),
      }
      
      // Simulate some fraud detection
      if (signals.watchTime < 5) {
        signals.suspicious = true
        signals.riskScore += 40
      }
      
      resolve({
        verified: signals.riskScore < 50 && signals.foregroundActive,
        signals,
        verificationTime: Date.now(),
      })
    }, 1000)
  })
}

// Calculate transfer fees and subsidy
export const calculateFees = async (transferData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { amount, paymentMode, transferRoute } = transferData
      
      // Base fee calculation
      let baseFee = 15
      
      // Adjust for transfer route
      if (transferRoute === 'pesonet') {
        baseFee = 20
      }
      
      const feeResult = {
        amount,
        baseFee,
        subsidyAmount: paymentMode === 'sponsored' ? baseFee : 0,
        userPaysFee: paymentMode === 'sponsored' ? 0 : baseFee,
        total: amount + (paymentMode === 'sponsored' ? 0 : baseFee),
        subsidyPercentage: paymentMode === 'sponsored' ? 100 : 0,
        subsidyReason: paymentMode === 'sponsored' ? 'Ad completion verified' : 'Standard fee',
      }
      
      resolve(feeResult)
    }, 600)
  })
}

// Process transfer
export const processTransfer = async (transferData, feeInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate processing steps
      const referenceNumber = 'TXN' + Date.now().toString().slice(-9)
      
      resolve({
        status: 'success',
        referenceNumber,
        timestamp: new Date().toISOString(),
        transactionDetails: {
          sender: mockUser.account,
          recipient: transferData.recipient.mobile,
          amount: transferData.amount,
          fee: feeInfo.userPaysFee,
          subsidyAmount: feeInfo.subsidyAmount,
          total: feeInfo.total,
          route: transferData.transferRoute,
          paymentMode: transferData.paymentMode,
        },
        updatedBalance: mockUser.wallet.balance - transferData.amount,
        auditTrail: {
          validationAt: Date.now() - 45000,
          adSelectionAt: Date.now() - 40000,
          adCompletionAt: Date.now() - 25000,
          feeVerificationAt: Date.now() - 5000,
          executionAt: Date.now(),
        },
      })
    }, 3000)
  })
}

// Get user eligibility for sponsored transfers
export const checkSponsoredEligibility = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        eligible: true,
        dailySponsored: mockUser.wallet.dailySpent,
        dailySponsoredLimit: VALIDATION_RULES.sponsoredMaxDaily,
        dailyRemaining: VALIDATION_RULES.sponsoredMaxDaily - mockUser.wallet.dailySpent,
        accountStatus: 'verified',
      })
    }, 400)
  })
}

// Get mock user data
export const getUserData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser)
    }, 300)
  })
}

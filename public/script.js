// Mobile menu toggle functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Animate the menu icon
    const spans = this.querySelectorAll('span');
    spans.forEach((span, index) => {
      if (navLinks.classList.contains('active')) {
        span.style.transform = index === 1 ? 'translateY(8px) rotate(45deg)' : index === 2 ? 'translateY(-8px) rotate(-45deg)' : 'scale(0)';
      } else {
        span.style.transform = '';
      }
    });
  });

  // Close menu when clicking outside
  window.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !e.target.closest('.mobile-menu-btn') && !e.target.closest('.nav-links')) {
      navLinks.classList.remove('active');
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans.forEach(span => span.style.transform = '');
    }
  });
}

// Fetch BTC/DOGE prices from CoinGecko
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,dogecoin&vs_currencies=usd')
  .then(response => response.json())
  .then(data => {
    const btcPrice = data.bitcoin.usd;
    const dogePrice = data.dogecoin.usd;
    const btcAmount = (500 / btcPrice).toFixed(6);
    const dogeAmount = (500 / dogePrice).toFixed(0);
    
    const btcElement = document.getElementById('btc-amount');
    const dogeElement = document.getElementById('doge-amount');
    
    if (btcElement) btcElement.textContent = `~${btcAmount} BTC ($500)`;
    if (dogeElement) dogeElement.textContent = `~${dogeAmount} DOGE ($500)`;
  })
  .catch(error => console.error('Error fetching prices:', error));

// Form validation and submission
let formElements = {};

// Initialize form elements
function initializeFormElements() {
  const elementIds = [
    'invest-form',
    'submitBtn', 
    'fullName',
    'email',
    'investmentAmount',
    'paymentMethod',
    'fullNameError',
    'emailError', 
    'tierError',
    'paymentError'
  ];

  let allFound = true;
  
  elementIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      formElements[id] = element;
    } else {
      console.error(`Element with ID '${id}' not found`);
      allFound = false;
    }
  });

  return allFound;
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Form validation
function validateForm() {
  let isValid = true;
  
  // Reset all error messages
  const errorElements = [
    formElements.fullNameError,
    formElements.emailError,
    formElements.tierError,
    formElements.paymentError
  ];
  
  errorElements.forEach(el => {
    if (el) {
      el.classList.remove('show');
      el.style.display = 'none';
    }
  });

  // Validate full name
  if (!formElements.fullName?.value.trim()) {
    if (formElements.fullNameError) {
      formElements.fullNameError.textContent = 'Please enter your full name';
      formElements.fullNameError.style.display = 'block';
    }
    isValid = false;
  }

  // Validate email
  if (!formElements.email?.value.trim()) {
    if (formElements.emailError) {
      formElements.emailError.textContent = 'Please enter your email address';
      formElements.emailError.style.display = 'block';
    }
    isValid = false;
  } else if (!isValidEmail(formElements.email.value)) {
    if (formElements.emailError) {
      formElements.emailError.textContent = 'Please enter a valid email address';
      formElements.emailError.style.display = 'block';
    }
    isValid = false;
  }

  // Validate investment tier
  if (!formElements.investmentAmount?.value) {
    if (formElements.tierError) {
      formElements.tierError.textContent = 'Please select an investment tier';
      formElements.tierError.style.display = 'block';
    }
    isValid = false;
  }

  // Validate payment method
  if (!formElements.paymentMethod?.value) {
    if (formElements.paymentError) {
      formElements.paymentError.textContent = 'Please select a payment method';
      formElements.paymentError.style.display = 'block';
    }
    isValid = false;
  }

  return isValid;
}

// Update submit button state
function updateSubmitButton() {
  if (!formElements.submitBtn) return;
  
  const isFormValid = formElements.fullName?.value.trim() && 
                     formElements.email?.value.trim() && 
                     isValidEmail(formElements.email.value) &&
                     formElements.investmentAmount?.value &&
                     formElements.paymentMethod?.value;

  formElements.submitBtn.disabled = !isFormValid;
  formElements.submitBtn.style.opacity = isFormValid ? '1' : '0.6';
  formElements.submitBtn.style.cursor = isFormValid ? 'pointer' : 'not-allowed';
  formElements.submitBtn.style.pointerEvents = isFormValid ? 'auto' : 'none';
}

// Initialize button state
function initializeButtonState() {
  if (!formElements.submitBtn) {
    console.error('Submit button not found');
    return;
  }
  
  formElements.submitBtn.disabled = true;
  formElements.submitBtn.style.opacity = '0.6';
  formElements.submitBtn.style.cursor = 'not-allowed';
  formElements.submitBtn.style.pointerEvents = 'none';
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  if (validateForm()) {
    showModal();
    
    // Reset form
    if (formElements['invest-form']) {
      formElements['invest-form'].reset();
      updateSubmitButton();
    }
  }
}

// Show modal function
function showModal() {
  const modal = document.getElementById('submissionModal');
  if (modal) {
    modal.classList.add('show');
  }
}

// Close modal function
function closeModal() {
  const modal = document.getElementById('submissionModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Add event listeners to form fields
function addFormEventListeners() {
  const inputFields = ['fullName', 'email', 'investmentAmount', 'paymentMethod'];
  
  inputFields.forEach(fieldName => {
    const field = formElements[fieldName];
    if (field) {
      field.addEventListener('input', updateSubmitButton);
      field.addEventListener('change', updateSubmitButton);
    }
  });

  // Add form submit listener
  if (formElements['invest-form']) {
    formElements['invest-form'].addEventListener('submit', handleFormSubmit);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modal as hidden
  const modal = document.getElementById('submissionModal');
  if (modal) {
    modal.classList.remove('show');
    
    // Add close modal event listeners
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Initialize form elements
  if (initializeFormElements()) {
    console.log('Form elements initialized successfully');
    initializeButtonState();
    addFormEventListeners();
  } else {
    console.error('Failed to initialize all form elements');
  }
});

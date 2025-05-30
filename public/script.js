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
}

// Close menu when clicking outside
const closeMenuOutside = (e) => {
  if (navLinks && navLinks.classList.contains('active') && !e.target.closest('.mobile-menu-btn') && !e.target.closest('.nav-links')) {
    navLinks.classList.remove('active');
    const spans = document.querySelector('.mobile-menu-btn')?.querySelectorAll('span');
    if (spans) {
      spans.forEach(span => span.style.transform = '');
    }
  }
};

// Add the click event listener only if navLinks exists
if (navLinks) {
  window.addEventListener('click', closeMenuOutside);
}

// Remove duplicate click event listener since we already have it in the mobile menu code

// Fetch BTC/DOGE prices from CoinGecko
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,dogecoin&vs_currencies=usd')
  .then(response => response.json())
  .then(data => {
    const btcPrice = data.bitcoin.usd;
    const dogePrice = data.dogecoin.usd;
    const btcAmount = (500 / btcPrice).toFixed(6);
    const dogeAmount = (500 / dogePrice).toFixed(0);
    document.getElementById('btc-amount').textContent = `~${btcAmount} BTC ($500)`;
    document.getElementById('doge-amount').textContent = `~${dogeAmount} DOGE ($500)`;
  })
  .catch(error => console.error('Error fetching prices:', error));

// Form validation and submission
let form = null;
let submitBtn = null;
let fullName = null;
let email = null;
let investmentAmount = null;
let paymentMethod = null;

// Initialize form elements
function initializeFormElements() {
  // Wait for elements to be loaded
  const elements = [
    { id: 'invest-form', name: 'form' },
    { id: 'submitBtn', name: 'submit button' },
    { id: 'fullName', name: 'full name input' },
    { id: 'email', name: 'email input' },
    { id: 'investmentAmount', name: 'investment amount select' },
    { id: 'paymentMethod', name: 'payment method select' }
  ];

  // Try to get all elements
  elements.forEach(element => {
    const el = document.getElementById(element.id);
    if (el) {
      window[element.id] = el; // Store in global scope
    } else {
      console.error(`${element.name} not found`);
    }
  });

  // Check if all required elements exist
  if (!window.investForm || !window.submitBtn || !window.fullName || !window.email || !window.investmentAmount || !window.paymentMethod) {
    console.error('One or more form elements not found');
    return false;
  }

  // Update references
  form = window.investForm;
  submitBtn = window.submitBtn;
  fullName = window.fullName;
  email = window.email;
  investmentAmount = window.investmentAmount;
  paymentMethod = window.paymentMethod;
  fullNameError = window.fullNameError;
  emailError = window.emailError;
  tierError = window.tierError;
  paymentError = window.paymentError;

  // Debugging
  console.log('Form elements initialized:', { form, submitBtn, fullName, email, investmentAmount, paymentMethod });
  return true;
}

// Initialize button state
function initializeButtonState() {
  if (!submitBtn) {
    console.error('Submit button not found');
    return;
  }
  
  // Set button properties
  submitBtn.disabled = true;
  if (submitBtn.style) {
    submitBtn.style.opacity = '0.6';
    submitBtn.style.cursor = 'not-allowed';
    submitBtn.style.pointerEvents = 'none';
  } else {
    console.error('Button style not accessible');
  }
}

// Initialize modal as hidden
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('submissionModal');
  if (modal) {
    modal.classList.remove('show');
  }
});

// Form validation
function validateForm() {
  let isValid = true;
  
  // Reset all error messages
  [fullNameError, emailError, tierError, paymentError].forEach(el => {
    el.classList.remove('show');
    el.style.display = 'none';
  });

  // Validate full name
  if (!fullName.value.trim()) {
    fullNameError.textContent = 'Please enter your full name';
    fullNameError.style.display = 'block';
    isValid = false;
  }

  // Validate email
  if (!email.value.trim()) {
    emailError.textContent = 'Please enter your email address';
    emailError.style.display = 'block';
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    emailError.textContent = 'Please enter a valid email address';
    emailError.style.display = 'block';
    isValid = false;
  }

  // Validate investment tier
  if (!investmentAmount.value || investmentAmount.value === '') {
    tierError.textContent = 'Please select an investment tier';
    tierError.style.display = 'block';
    isValid = false;
  }

  // Validate payment method
  if (!paymentMethod.value || paymentMethod.value === '') {
    paymentError.textContent = 'Please select a payment method';
    paymentError.style.display = 'block';
    isValid = false;
  }

  return isValid;
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Initialize button state
function initializeButtonState() {
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.6';
  submitBtn.style.cursor = 'not-allowed';
  submitBtn.style.pointerEvents = 'none';
}

// Update submit button state
function updateSubmitButton() {
  const isValid = validateForm();
  submitBtn.disabled = !isValid;
  submitBtn.style.opacity = isValid ? '1' : '0.6';
  submitBtn.style.pointerEvents = isValid ? 'auto' : 'none';
}

// Add input event listeners
[fullName, email, investmentAmount, paymentMethod].forEach(field => {
  field.addEventListener('input', updateSubmitButton);
});

// Initialize form state
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all elements
  if (!initializeFormElements() || !initializeErrorElements()) {
    console.error('Failed to initialize form elements');
    return;
  }
  
  // Initialize button state
  initializeButtonState();
  
  // Add input event listeners
  [fullName, email, investmentAmount, paymentMethod].forEach(field => {
    field.addEventListener('input', updateSubmitButton);
  });
  
  // Add form submit event listener
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent default form submission
      
      if (validateForm()) {
        // Form is valid, handle submission
        showModal(); // Show the modal instead of alert
        
        // Optionally reset the form
        form.reset();
        updateSubmitButton(); // Update button state after reset
      }
    });
  }
});

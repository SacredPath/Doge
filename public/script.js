// Mobile menu toggle functionality
document.querySelector('.mobile-menu-btn')?.addEventListener('click', function() {
  const navLinks = document.querySelector('.nav-links');
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
window.addEventListener('click', function(e) {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks.classList.contains('active') && !e.target.closest('.mobile-menu-btn') && !e.target.closest('.nav-links')) {
    navLinks.classList.remove('active');
    const spans = document.querySelector('.mobile-menu-btn').querySelectorAll('span');
    spans.forEach(span => span.style.transform = '');
  }
});

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

// Form submission (fake confirmation)
document.getElementById('invest-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Investment submitted! You’ll receive confirmation within 24 hours.');
});
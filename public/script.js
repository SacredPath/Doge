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
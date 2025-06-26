// Translation dictionary example
const translations = {
  es: {
    hero_title: "¡Invierte desde $500 y gana hasta $7,200 en 14 días!",
    hero_subtitle: "Únete a miles que comparten la riqueza de la tecnología.",
    btn_get_started: "Comenzar",
    tiers_title: "Niveles de inversión",
    wallets_title: "Carteras para depósito",
    social_proof_title: "Lo que otros están diciendo",
    verify_title: "Verifica tu correo electrónico para continuar",
    verify_instructions: "Revisa tu bandeja de entrada y haz clic en el enlace de confirmación.",
    btn_verify: "Verificar correo",
    success_title: "¡Depósito confirmado!",
    success_subtitle: "Tu inversión está activa. Mira cómo crecen tus retornos.",
    countdown_label: "Tiempo restante:",
    referral_text: "¡Invita a 3 amigos y obtén un bono del 15%!",
    chatbot_title: "Chatea con Sophie, tu agente de inversión",
    btn_restart_chat: "Reiniciar chat"
  },
  de: {
    hero_title: "Investieren Sie ab $500 und verdienen Sie bis zu $7.200 in 14 Tagen!",
    hero_subtitle: "Schließen Sie sich Tausenden an, die den Wohlstand der Technologie teilen.",
    btn_get_started: "Loslegen",
    tiers_title: "Investmentstufen",
    wallets_title: "Einzahlungswallets",
    social_proof_title: "Was andere sagen",
    verify_title: "Bestätigen Sie Ihre E-Mail, um fortzufahren",
    verify_instructions: "Überprüfen Sie Ihren Posteingang und klicken Sie auf den Bestätigungslink.",
    btn_verify: "E-Mail bestätigen",
    success_title: "Einzahlung bestätigt!",
    success_subtitle: "Ihre Investition ist aktiv. Beobachten Sie Ihr Wachstum.",
    countdown_label: "Verbleibende Zeit:",
    referral_text: "Laden Sie 3 Freunde ein und erhalten Sie einen 15% Bonus!",
    chatbot_title: "Chatten Sie mit Sophie, Ihrer Investment-Agentin",
    btn_restart_chat: "Chat neu starten"
  }
};

function translatePage(lang = 'en') {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    el.textContent = translations[lang]?.[key] || el.textContent;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Language toggle
  const langToggle = document.getElementById('langToggle');
  let currentLang = 'en';

  if (langToggle) {
    langToggle.addEventListener('click', e => {
      if (e.target.dataset.lang) {
        currentLang = e.target.dataset.lang;
        translatePage(currentLang);
        // update active class
        langToggle.querySelectorAll('span').forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');
      }
    });
  }

  translatePage(currentLang);

  // Clipboard copy buttons
  document.querySelectorAll('.copyBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const text = document.getElementById(targetId)?.textContent || '';
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          alert('Copied to clipboard: ' + text);
        });
      }
    });
  });

  // Email form submission (example)
  const emailForm = document.getElementById('emailForm');
  if (emailForm) {
    emailForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('emailInput').value;
      if (email) {
        // Save email or send to backend (SMTP or API)
        alert(`Thanks! Email ${email} captured.`);
        window.location.href = 'verify.html';
      }
    });
  }

  // Verify email form
  const verifyForm = document.getElementById('verifyEmailForm');
  if (verifyForm) {
    verifyForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('verifyEmailInput').value;
      if (email) {
        alert(`Email ${email} verified! You can now see wallet addresses.`);
        document.getElementById('walletSection').style.display = 'block';
        document.getElementById('agentChat').style.display = 'block';
        verifyForm.style.display = 'none';
      }
    });
  }

  // Agent chat close
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  if (chatCloseBtn) {
    chatCloseBtn.addEventListener('click', () => {
      document.getElementById('agentChat').style.display = 'none';
    });
  }

  // Countdown timer on success.html
  const countdownTimer = document.getElementById('countdownTimer');
  if (countdownTimer) {
    let timeLeft = 14 * 24 * 60 * 60; // 14 days in seconds

    function updateTimer() {
      let days = Math.floor(timeLeft / (24 * 3600));
      let hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
      let minutes = Math.floor((timeLeft % 3600) / 60);
      let seconds = timeLeft % 60;
      countdownTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      if (timeLeft > 0) {
        timeLeft--;
        setTimeout(updateTimer, 1000);
      }
    }
    updateTimer();
  }

  // Chatbot simple restart (chatbot.html)
  const restartChatBtn = document.getElementById('restartChatBtn');
  if (restartChatBtn) {
    restartChatBtn.addEventListener('click', () => {
      const chatWindow = document.getElementById('chatWindow');
      if (chatWindow) {
        chatWindow.innerHTML = `
          <div class="message agent">Hi, this is Sophie from the payout team.</div>
          <div class="message user">Is $1,000 enough?</div>
          <div class="message agent" id="agentReply">Perfect for Gold Tier. Use this BTC wallet: bc1q...</div>
        `;
      }
    });
  }

});

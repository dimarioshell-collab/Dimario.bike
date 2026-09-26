/**
 * Dimario — Telegram-сповіщення про заявки
 * Бот: @DimariobikesBot
 */
window.DIMARIO_TG = {
  botToken: '8606211892:AAHzHdxZa-E9_0G55uxM5Etiu0haTpTirkE',
  chatId:   '7524320825',

  fallbackLink: 'https://t.me/DimariobikesBot',
  constructorLink: 'https://t.me/DimariobikesBot',
  phone: '+380631446701',
  siteName: 'Dimario Bike Master'
};

window.dimarioSendTelegram = async function (text, opts) {
  const cfg = window.DIMARIO_TG || {};
  if (!cfg.botToken || !cfg.chatId) {
    console.warn('[Dimario TG] Немає botToken/chatId');
    return false;
  }
  try {
    const body = {
      chat_id: cfg.chatId,
      text: String(text),
      disable_web_page_preview: true
    };
    if (opts && opts.html) body.parse_mode = 'HTML';
    const res = await fetch('https://api.telegram.org/bot' + cfg.botToken + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!data.ok) {
      console.error('[Dimario TG] API error:', data);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Dimario TG] network error:', err);
    return false;
  }
};

window.dimarioTestTelegram = async function () {
  const ok = await window.dimarioSendTelegram(
    '✅ Тест Dimario\nСповіщення працюють.\n' + new Date().toLocaleString('uk-UA')
  );
  console.log(ok ? '[Dimario TG] OK — перевірте Telegram' : '[Dimario TG] FAIL');
  return ok;
};

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

async function spawnBot(gamePin, name) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Replace with your Gimkit game URL
  const gameUrl = `https://www.gimkit.com/game/${gamePin}`;

  try {
    await page.goto(gameUrl, { waitUntil: 'networkidle2' });
    // Add your steps to join the game, answer questions, etc.
    // Example:
    // await page.click('button.join'); // hypothetical selector
    // await page.type('input[name="name"]', name);
    // await page.click('button.start');

    // This is placeholder; you'll need to inspect the Gimkit page
    // and add actual selectors and actions

  } catch (err) {
    console.error('Error spawning bot:', err);
  }

  // Keep the bot alive or close
  // await browser.close();
}
curl -X POST https://gimkit-flooder-render.onrender.com \
-H "Content-Type: application/json" \
-d '{"gamePin":"131657","amount":2,"namePattern":"Bot#"}'

app.post('https://gimkit-flooder-render.onrender.com', async (req, res) => {
  const { gamePin, amount, namePattern } = req.body;
  for (let i = 0; i < amount; i++) {
    const botName = namePattern.replace('#', i + 1);
    spawnBot(gamePin, botName);
  }
  res.send(`Spawning ${amount} bots...`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

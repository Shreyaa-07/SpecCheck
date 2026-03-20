const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/scan', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    console.error('Error: URL is required');
    return res.status(400).json({ error: 'URL is required' });
  }

  console.log('Scanning URL:', url);

  let targetUrl = url.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    const results = await new AxePuppeteer(page).analyze();
    await browser.close();

    const violationsCount = results.violations.reduce((acc, v) => acc + v.nodes.length, 0);
    const passesCount = results.passes.reduce((acc, p) => acc + p.nodes.length, 0);
    
    let totalPossibleWeight = 0;
    let earnedWeight = 0;

    const getWeight = (impact) => {
      switch (impact) {
        case 'critical': return 10;
        case 'serious': return 5;
        case 'moderate': return 2;
        case 'minor': return 1;
        default: return 5;
      }
    };

    results.passes.forEach(p => {
      const w = getWeight(p.impact);
      totalPossibleWeight += w;
      earnedWeight += w;
    });

    results.violations.forEach(v => {
      const w = getWeight(v.impact);
      totalPossibleWeight += w;
    });

    let score = 100;
    if (totalPossibleWeight > 0) {
      score = Math.round((earnedWeight / totalPossibleWeight) * 100);
    } else if (results.violations.length > 0) {
      score = 0;
    }

    console.log('Scan completed successfully');

    res.json({
      score,
      violations: results.violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        nodes: v.nodes.map(n => ({
          html: n.html,
          target: n.target,
          failureSummary: n.failureSummary
        }))
      })),
      passesCount,
      violationsCount
    });
  } catch (error) {
    if (browser) await browser.close();
    console.error('Scan failed:', error.message);
    res.status(500).json({ error: 'Failed to scan the URL. Ensure it is reachable.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

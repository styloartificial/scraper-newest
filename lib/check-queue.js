const fs = require('fs');
const path = require('path');

const queuePath = path.join(__dirname, '../..', 'queue.json');

function checkQueue() {
  try {
    if (!fs.existsSync(queuePath)) {
      return null;
    }

    const raw = fs.readFileSync(queuePath, 'utf8');

    if (!raw.trim()) {
      return null;
    }

    const queue = JSON.parse(raw);

    if (!Array.isArray(queue) || queue.length === 0) {
      return null;
    }

    return queue[0];
  } catch (err) {
    console.error('Gagal membaca queue:', err.message);
    return null;
  }
}

module.exports = checkQueue;
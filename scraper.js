const checkQueue = require('./lib/check-queue');

function check() {
  const item = checkQueue();

  if (item) {
    console.log('Queue ditemukan:', item);
  } else {
    console.log('Queue kosong');
  }
}

check();

setInterval(check, 3000);
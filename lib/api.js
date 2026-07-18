const axios = require('axios');

const coreUrl = 'https://styloartificial.my.id/api';
const scraperUrl = 'https://scraper.styloartificial.my.id/api';

const {
  CORE_EMAIL,
  CORE_PASSWORD,
  SCRAPER_KEY,
} = process.env;

let authToken = null;

async function loginScraper() {
  try {
    const { data } = await axios.post(`${coreUrl}/login/scraper`, {
      email: CORE_EMAIL,
      password: CORE_PASSWORD,
    });

    authToken = data.token;

    return authToken;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || err.message
    );
  }
}

async function getToken() {
  if (!authToken) {
    await loginScraper();
  }

  return authToken;
}

async function setTicketDone(ticket_request_id, storedData) {
  try {
    const token = await getToken();

    const { data } = await axios.post(
      `${coreUrl}/scraper/set-done-ticket-request`,
      {
        ticket_request_id,
        storedData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || err.message
    );
  }
}

async function removeQueue(ticket_id) {
  try {
    const { data } = await axios.post(
      `${scraperUrl}/remove-to-queue-scraper`,
      {
        ticket_id,
      },
      {
        headers: {
          secret_key: SCRAPER_KEY,
        },
      }
    );

    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || err.message
    );
  }
}

module.exports = {
  loginScraper,
  setTicketDone,
  removeQueue,
};
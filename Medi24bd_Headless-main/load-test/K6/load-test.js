import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20,               // Virtual users
  duration: '30s',       // Total test time
};

export default function () {
  const res = http.get('https://admin-dev.medi24bd.com/api/v1/client/categories');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'has data': (r) => r.json('data.length') > 0,
    'data exists': (r) => !!r.json('data'),
  });

  sleep(1); // Wait time between requests
}

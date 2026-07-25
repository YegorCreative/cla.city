import test from 'node:test';
const enabled = process.env.CLA_INTEGRATION === '1';
for (const name of ['successful contact creation','failed database persistence','prayer auto-creation','visitor auto-creation','login success','login failure','unauthorized admin API access','authenticated admin API access']) test(name, { skip: !enabled }, () => { throw new Error('Configure a deployed test Worker and database to run integration tests.'); });

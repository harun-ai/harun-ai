const { startUnleash } = require('unleash-client');

startUnleash({
  url: 'https://unleash.laura.systems/api/',
  appName: 'testTest',
  customHeaders: {
    Authorization:
      '72a22975d1f10e75a841b174fe0f09590ff49b7959d63a63d8cfcb69b81a1747',
  },
})
  .then(unleash => {
    const unleashContext = {
      tenantId: '15',
    };

    setInterval(() => {
      if (unleash.isEnabled('testTenantId', unleashContext)) {
        console.log('Toggle enabled');
      } else {
        console.log('Toggle disabled');
      }
    }, 1000);
  })
  .catch(error => console.log(error));

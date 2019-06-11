import _ from 'lodash';
import * as map from '../../../src/server/crawl/map';
import crawl from '../../../src/server/crawl';
import config from '../../../src/server/crawl/config';

describe('crawl', () => {
  it('should return a result in a right form', async () => {
    const { exclude } = config;
    const companyNameList = Object.keys(map)
      .filter(companyName => !(exclude.includes(companyName)));
    const result = await crawl();
    expect(Object.keys(result)).toEqual(companyNameList);
    _.each(result, (company) => {
      _.each(company, (jobGroup) => {
        jobGroup.forEach((jobNotice) => {
          expect(jobNotice).toEqual(expect.objectContaining({
            title: expect.any(String),
            content: expect.any(String),
          }));
        });
      });
    });
    console.warn('This test doesn\'t guarantee the code works as intended!');
    console.warn('Must execute the code and see the result!');
  }, 600000);
});

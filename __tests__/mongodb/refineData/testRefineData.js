import leaveRemovedDataOnly from '../../../src/mongodb/refineData/leaveRemovedDataOnly';
import leaveNewDataOnly from '../../../src/mongodb/refineData/leaveNewDataOnly';
import leaveUpdatedDataOnly from '../../../src/mongodb/refineData/leaveUpdatedDataOnly';
import refineJobData from '../../../src/mongodb/refineData/refineJobData';

describe('refineData', () => {
  const soldierHiringNotice = {
    companyName: 'ROK Army',
    title: '신입 병사 채용',
    content: '신체 3급 이상 남성 아무나',
    jobGroup: 'soldier',
    originUrl: 'https://www.mma.go.kr/board/boardView.do?gesipan_id=69&gsgeul_no=1501112&pageIndex=1&searchCondition=&searchKeyword=&pageUnit=10&mc=usr0000127&jbc_gonggibodo=0',
    dateCreated: new Date().getTime(),
  };
  const rapperHiringNotice = {
    companyName: 'Just Music',
    title: '래퍼 채용',
    content: '라임에 대한 이해가 있으신 분',
    jobGroup: 'rapper',
    originUrl: 'http://wejustmusic.com/bbs/board.php?bo_table=News&wr_id=1',
    dateCreated: new Date().getTime(),
  };
  const producerHiringNotice = {
    companyName: 'Just Music',
    title: '프로듀서 채용',
    content: '프알못이에요. 못 쓰겠음 ㅠㅠ',
    jobGroup: 'producer',
    originUrl: 'http://wejustmusic.com/bbs/board.php?bo_table=News&wr_id=2',
    dateCreated: new Date().getTime(),
  };
  describe('leaveRemovedDataOnly', () => {
    it('should leave data belong to existingData but not belong to newData', () => {
      const existingData = [
        { _id: 1, ...soldierHiringNotice },
        { _id: 2, ...rapperHiringNotice },
        { _id: 3, ...producerHiringNotice },
      ];
      const newData = [soldierHiringNotice];

      const result = leaveRemovedDataOnly(newData, existingData);
      expect(result).toEqual([
        { _id: 2, ...rapperHiringNotice },
        { _id: 3, ...producerHiringNotice },
      ]);
    });
  });
  describe('leaveNewDataOnly', () => {
    it('should leave data belong to newData but not belong to existingData', () => {
      const existingData = [{ _id: 1, ...soldierHiringNotice }];
      const newData = [soldierHiringNotice, rapperHiringNotice, producerHiringNotice];

      const result = leaveNewDataOnly(newData, existingData);
      expect(result).toEqual([rapperHiringNotice, producerHiringNotice]);
    });
  });
  describe('leaveUpdateDataOnly', () => {
    it('should leave data both belong to existingData and newData but have different values', () => {
      const existingData = [
        { _id: 1, ...soldierHiringNotice },
        { _id: 2, ...rapperHiringNotice },
        { _id: 3, ...producerHiringNotice },
      ];
      const modifiedRapperHiringNotice = Object.assign({}, rapperHiringNotice);
      modifiedRapperHiringNotice.content = '라임과 플로우에 대한 이해가 있으신 분';
      const modifiedProducerHiringNotice = Object.assign({}, producerHiringNotice);
      modifiedProducerHiringNotice.content = '프알못의 프는 프로듀싱일까요 프로그래밍일까요';
      const newData = [
        soldierHiringNotice,
        modifiedRapperHiringNotice,
        modifiedProducerHiringNotice,
      ];

      const result = leaveUpdatedDataOnly(newData, existingData);
      expect(result).toEqual([
        { _id: 2, ...modifiedRapperHiringNotice },
        { _id: 3, ...modifiedProducerHiringNotice },
      ]);
    });
  });
  describe('refineJobData', () => {
    const jobData = {
      'ROK Army': {
        soldier: [{ _id: 1, ...soldierHiringNotice }],
      },
      'Just Music': {
        rapper: [{ _id: 2, ...rapperHiringNotice }],
        producer: [{ _id: 3, ...producerHiringNotice }],
      },
    };
    it('should convert jobData to suitable one for HiringNotice model', () => {
      const result = refineJobData(jobData);
      expect(result).toEqual([
        {
          _id: 1,
          ...soldierHiringNotice,
          companyName: 'ROK Army',
          jobGroup: 'soldier',
          dateCreated: expect.any(Number),
        },
        {
          _id: 2,
          ...rapperHiringNotice,
          companyName: 'Just Music',
          jobGroup: 'rapper',
          dateCreated: expect.any(Number),
        },
        {
          _id: 3,
          ...producerHiringNotice,
          companyName: 'Just Music',
          jobGroup: 'producer',
          dateCreated: expect.any(Number),
        },
      ]);
    });
  });
});

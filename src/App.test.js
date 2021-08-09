import {render, screen} from '@testing-library/react';
import timeConvert from './helpers/timeConvert';
import {getSearch} from './helpers/my-api';

describe('timeConvert helper function', () => {
  test('it returns correct format "#h #m"', () => {

    const durationInMinutes = 133;
    const result = timeConvert(durationInMinutes);
    expect(
      result
    ).toMatch('2h 13m');
  });
});

describe('getSearch helper function', () => {
  test('it returns correct format "#m" if duration is less than 60 min', () => {

    const durationInMinutes = 59;
    const result = timeConvert(durationInMinutes);
    expect(
      result
    ).toMatch('59m');
  });
});

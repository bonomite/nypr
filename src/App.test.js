import {render, screen} from '@testing-library/react';
import timeConvert from './helpers/timeConvert';
import {getSearch} from './helpers/my-api';
import TheHeader from './components/shared/TheHeader';

describe('timeConvert helper function', () => {
  test('it returns correct format "#h #m"', () => {

    const durationInMinutes = 133;
    const result = timeConvert(durationInMinutes);
    expect(
      result
    ).toMatch('2h 13m');
  });
  test('it returns correct format "#m" if duration is less than 60 min', () => {

    const durationInMinutes = 59;
    const result = timeConvert(durationInMinutes);
    expect(
      result
    ).toMatch('59m');
  });
});

describe('getSearch helper function', () => {

  test('it doesnt return a fetch with the query is empty', () => {
    const query = '';
    const result = getSearch(query);
    expect(
      result
    ).toEqual(undefined);
  });

  test('it returns data when a query is NOT empty', () => {
    const query = 'doubtfire';
    getSearch(query).then(data => {
      expect(data).not.toEqual(undefined);
    });
  });
});


describe('Header search bar rendering', () => {

  test('at sm breakpoint(>= 600px) and higher, we see the full search bar component', () => {

    const header = render(<TheHeader/>);
    window.innerWidth = 600;
    window.dispatchEvent(new Event('resize'));

    expect(header).toMatchSnapshot();
  });

  test('at xs breakpoint(< 600px) and lower, we see the magnifying glass button icon', () => {

    const header = render(<TheHeader/>);
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    expect(header).toMatchSnapshot();
  });

});

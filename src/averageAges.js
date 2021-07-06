'use strict';

/* ---------------------------------------------------------------- */

const calulateAvarageAge = (womenAverageAgeay) => {
  const womenAverageAgeLength = womenAverageAgeay.length;
  const resultOfAverageAge = (womenAverageAgeay
    .reduce((accum, current) => accum + current) / womenAverageAgeLength);

  return resultOfAverageAge;
};

/* ---------------------------------------------------------------- */

function calculateMenAverageAge(people, century) {
  const withoutCentury = [];
  const withCentury = [];
  const allDateWithoutCentury = people.map(item => {
    (item.sex === 'm')
      && withoutCentury.push(item.died - item.born);

    return withoutCentury;
  });
  const allDataWithCentury = people.map(item => {
    (item.sex === 'm' && Math.ceil(item.died / 100) === century)
          && withCentury.push(item.died - item.born);

    return withCentury;
  });

  return century ? calulateAvarageAge(allDataWithCentury[0])
    : calulateAvarageAge(allDateWithoutCentury[0]);
}

/* ---------------------------------------------------------------- */

function calculateWomenAverageAge(people, withChildren) {
  const womenWithChild = [];
  const womenWithoutChild = [];

  const allWoman = people.filter(person => person.sex === 'f');

  const allWomenLifeTim = allWoman.map(value => {
    womenWithoutChild.push(value.died - value.born);

    return womenWithoutChild;
  });

  const womenLifeTimeWithChild = allWoman.map(item => {
    people.map(value => {
      (item.name === value.mother)
       && womenWithChild.push(item.died - item.born);
    });

    return womenWithChild;
  });

  return withChildren
    ? calulateAvarageAge(womenLifeTimeWithChild[0].filter((x, index, array) =>
      array.indexOf(x) === index))
    : calulateAvarageAge(allWomenLifeTim[0]);
}

/* ---------------------------------------------------------------- */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const withSunAgeDate = [];
  const withoutSunAgeDate = [];

  const averageAgeWithSun = people.filter(child => child.sex === 'm'
  && people.map(mother => mother.name === child.mother));
  const averageAgeWithoutSun = people.filter(child => people.find(
    mother => mother.name === child.mother));

  const withSunOrNo = (person, array) => {
    person.map(item => {
      people.map(value => (value.name === item.mother)
        && array.push(item.born - value.born));
    });

    return array;
  };

  return onlyWithSon
    ? calulateAvarageAge(withSunOrNo(averageAgeWithSun, withSunAgeDate))
    : calulateAvarageAge(withSunOrNo(averageAgeWithoutSun, withoutSunAgeDate));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

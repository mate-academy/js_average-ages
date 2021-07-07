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
  const withoutCentury = people.filter(x => x.sex === 'm');

  const withCentury = withoutCentury.filter(item =>
    century === Math.ceil(item.died / 100));

  const withCenturyOrNo = century ? withCentury : withoutCentury;

  return (calulateAvarageAge(calculateDate(withCenturyOrNo)));
}

const calculateDate = (person) => {
  const resOfFunction = [];

  person.map(item => resOfFunction.push(item.died - item.born));

  return resOfFunction;
};

/* ---------------------------------------------------------------- */

function calculateWomenAverageAge(people, withChildren) {
  const womenWithChild = [];

  const allWoman = people.filter(person => person.sex === 'f');

  const allWomenLifeTime = allWoman.map(value => (value.died - value.born));

  let womenLifeTimeWithChild = allWoman.filter(item => {
    people.map(value => (item.name === value.mother)
          && womenWithChild.push(item.died - item.born));

    return womenWithChild;
  });

  womenLifeTimeWithChild = womenWithChild.filter((item, index, array) =>
    array.indexOf(item) === index);

  const res = withChildren ? womenLifeTimeWithChild : allWomenLifeTime;

  return calulateAvarageAge(res);
}

/* ---------------------------------------------------------------- */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people
    .filter(person => people.some(parent => person.mother === parent.name));

  const filteredChildren = onlyWithSon
    ? children.filter(x => x.sex === 'm')
    : children;

  const mothers = filteredChildren
    .map(child => people.find(mother => mother.name === child.mother));

  const differenceAges = filteredChildren
    .map((child, index) => child.born - mothers[index].born);

  return calulateAvarageAge(differenceAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

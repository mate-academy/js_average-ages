'use strict';

function calculateAge(people) {
  const ageArr = people.map((person) => person.died - person.born);
  const sumAge = ageArr.reduce((a, b) => a + b);

  return sumAge / ageArr.length;
}

function calculateMenAverageAge(people, century) {
  const menArr = people.filter((person) => person.sex === 'm');
  const menCenturyArr = menArr
    .filter((person) => Math.ceil(person.died / 100) === century);

  if (century) {
    return calculateAge(menCenturyArr);
  }

  return calculateAge(menArr);
}

function calculateWomenAverageAge(people, withChildren) {
  const womenArr = people.filter((person) => person.sex === 'f');
  const womenWithChildArr = womenArr.filter((person) =>
    people.find((children) => children.mother === person.name)
  );

  if (withChildren) {
    return calculateAge(womenWithChildArr);
  }

  return calculateAge(womenArr);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const withChild = people.filter((child) => child.mother
    && people.find((person) => person.name === child.mother)
  );

  const onlySon = withChild.filter((person) => person.sex === 'm');

  const calcAge = arr => arr.reduce((prev, item) =>
    prev + item.born - people.find((person) =>
      person.name === item.mother).born, 0) / arr.length;

  if (onlyWithSon) {
    return calcAge(onlySon);
  }

  return calcAge(withChild);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

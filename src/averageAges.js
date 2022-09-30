'use strict';

function calculateAge(people) {
  return people.reduce((prev, current) =>
    prev + (current.died - current.born), 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const menArr = people.filter((person) => person.sex === 'm');

  if (century) {
    const menCenturyArr = menArr
      .filter((person) => Math.ceil(person.died / 100) === century);

    return calculateAge(menCenturyArr);
  }

  return calculateAge(menArr);
}

function calculateWomenAverageAge(people, withChildren) {
  const womenArr = people.filter((person) => person.sex === 'f');

  if (withChildren) {
    const womenWithChildArr = womenArr.filter((person) =>
      people.find((children) => children.mother === person.name)
    );

    return calculateAge(womenWithChildArr);
  }

  return calculateAge(womenArr);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const withChild = people.filter((child) => child.mother
    && people.find((person) => person.name === child.mother)
  );

  const calcAge = arr => arr.reduce((prev, item) =>
    prev + item.born - people
      .find((person) => person.name === item.mother)
      .born, 0) / arr.length;

  if (onlyWithSon) {
    const onlySon = withChild.filter((person) => person.sex === 'm');

    return calcAge(onlySon);
  }

  return calcAge(withChild);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

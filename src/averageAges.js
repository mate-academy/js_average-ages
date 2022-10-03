'use strict';

function calculateAge(people) {
  return people.reduce((prev, current) =>
    prev + (current.died - current.born), 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => person.sex === 'm');

  let menOrMenCentury = [];

  if (century) {
    const menCentury = men
      .filter((person) => Math.ceil(person.died / 100) === century);

    menOrMenCentury = [...menCentury];
  } else {
    menOrMenCentury = [...men];
  }

  return calculateAge(menOrMenCentury);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person) => person.sex === 'f');

  let womenOrWomenWithChild = [];

  if (withChildren) {
    const womenWithChild = women.filter((person) =>
      people.find((children) => children.mother === person.name)
    );

    womenOrWomenWithChild = [...womenWithChild];
  } else {
    womenOrWomenWithChild = [...women];
  }

  return calculateAge(womenOrWomenWithChild);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const withChild = people.filter((child) => child.mother
    && people.find((person) => person.name === child.mother)
  );

  const calcAge = arr => arr.reduce((prev, item) =>
    prev + item.born - people
      .find((person) => person.name === item.mother)
      .born, 0) / arr.length;

  let onlySonOrWithChild = [];

  if (onlyWithSon) {
    const onlySon = withChild.filter((person) => person.sex === 'm');

    onlySonOrWithChild = [...onlySon];
  } else {
    onlySonOrWithChild = [...withChild];
  }

  return calcAge(onlySonOrWithChild);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

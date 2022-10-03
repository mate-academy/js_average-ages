'use strict';

function calculateAge(people) {
  return people.reduce((prev, current) =>
    prev + (current.died - current.born), 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => {
    if (century) {
      if (person.sex === 'm' && Math.ceil(person.died / 100) === century) {
        return person;
      }
    } else if (person.sex === 'm') {
      return person;
    }
  });

  return calculateAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person) => {
    if (withChildren) {
      if (person.sex === 'f'
        && people.find((children) => children.mother === person.name)) {
        return person;
      }
    } else if (person.sex === 'f') {
      return person;
    }
  });

  return calculateAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const withChild = people.filter((child) => {
    if (onlyWithSon) {
      if (child.mother
        && people.find((person) => person.name === child.mother)
        && child.sex === 'm') {
        return child;
      }
    } else if (child.mother && people.find((person) =>
      person.name === child.mother)) {
      return child;
    }
  });

  const calcAge = arr => arr.reduce((prev, item) =>
    prev + item.born - people
      .find((person) => person.name === item.mother)
      .born, 0) / arr.length;

  return calcAge(withChild);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

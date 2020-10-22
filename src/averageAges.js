'use strict';

function calculateMenAverageAge(people, century) {
  let list = people.filter((person) => {
    return person.sex === 'm';
  });

  if (century) {
    list = list.filter((person) => {
      const centuryOfDeath = Math.ceil(person.died / 100);

      return centuryOfDeath === century;
    });
  }

  const res = list.reduce((sum, person) => {
    return sum + person.died - person.born;
  }, 0);

  return res / list.length;
}

function calculateWomenAverageAge(people, withChildren) {
  let list = people.filter((person) => {
    return person.sex === 'f';
  });

  if (withChildren) {
    const womenWithChildren = people.reduce((result, person) => {
      if (person.mother) {
        return [...result, person.mother];
      }

      return result;
    }, []);

    list = list.filter((person) => {
      return womenWithChildren.includes(person.name);
    });
  }

  const res = list.reduce((sum, person) => {
    return sum + person.died - person.born;
  }, 0);

  return res / list.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let childrenWithMothersInList = 0;
  let children = people.filter((person) => {
    return person.mother !== null;
  });

  if (onlyWithSon) {
    children = children.filter((child) => child.sex === 'm');
  }

  const sumOfDiff = children.reduce((sum, child) => {
    const mother = people.find((person) => {
      return person.name === child.mother;
    });

    if (mother) {
      childrenWithMothersInList++;

      return sum + child.born - mother.born;
    }

    return sum;
  }, 0);

  return sumOfDiff / childrenWithMothersInList;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

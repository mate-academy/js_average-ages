'use strict';

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filteredMen = people.filter((person) => {
    return person.sex === 'm'
    && (century ? Math.ceil(person.died / 100) === century : true);
  });

  return filteredMen.reduce((accumulator, man) => {
    return accumulator + man.died - man.born;
  }, 0) / filteredMen.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter(person => {
    return person.sex === 'f'
    && (withChildren ? people.some((child) => {
      return child.mother === person.name;
    }) : true);
  });

  return filteredWomen.reduce((accumulator, woman) => {
    return accumulator + woman.died - woman.born;
  }, 0) / filteredWomen.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredChildren = people.filter(child => {
    return people.find(person => {
      return person.name === child.mother;
    })
    && (onlyWithSon ? child.sex === 'm' : true);
  });
  const mothers = filteredChildren.map((child) => {
    return people.find(mother => {
      return child.mother === mother.name;
    });
  });

  return filteredChildren.reduce((accumulator, child, index) => {
    return accumulator + child.born - mothers[index].born;
  }, 0) / filteredChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

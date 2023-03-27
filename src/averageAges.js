'use strict';

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menList = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const averageAge = getAverageAge(menList);

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenList = withChildren
    ? people.filter(person => person.sex === 'f'
      && hasChild(people, person.name))
    : people.filter(person => person.sex === 'f');

  const averageAge = getAverageAge(womenList);

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const mothers = people.filter(mother => hasChild(people, mother.name));

  const children = onlyWithSon
    ? people.filter(person => hasMother(mothers, person.mother)
      && person.sex === 'm')
    : people.filter(person => hasMother(mothers, person.mother));

  const differenceOfAge = children.reduce((difference, child) => {
    const childMom = mothers.find(woman => woman.name === child.mother);

    return difference + (child.born - childMom.born);
  }, 0);

  return differenceOfAge / children.length;
}

function getAverageAge(peopleList) {
  return peopleList
    .map(({ died, born }) => died - born)
    .reduce((a, b) => a + b) / peopleList.length;
}

function hasMother(mothersList, name) {
  return mothersList.some(mother => mother.name === name);
};

function hasChild(peopleList, motherName) {
  return peopleList.some(person => person.mother === motherName);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

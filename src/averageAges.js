'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menData = people.filter(
    century
      ? person => person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person => person.sex === 'm'
  );

  return getAverageAge(menData);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothersList = people.map(person => person.mother).filter(name => name);

  const womenData = people.filter(
    withChildren
      ? person => person.sex === 'f' && mothersList.includes(person.name)
      : person => person.sex === 'f'
  );

  return getAverageAge(womenData);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  function findMother(child) {
    return people.find(person => person.name === child.mother);
  }

  function checkMother(child) {
    const hasMother = findMother(child);

    return onlyWithSon
      ? hasMother && child.sex === 'm'
      : hasMother;
  }

  const childrenWithMother = people.filter(checkMother);

  const averageAge = childrenWithMother.reduce((sum, child) => {
    const difference = child.born - findMother(child).born;

    return sum + difference;
  }, 0) / childrenWithMother.length;

  return averageAge;
};

function getAverageAge(data) {
  const dataLength = data.length;
  const averageAge = data.reduce((accum, person) => {
    return accum + (person.died - person.born);
  }, 0) / dataLength;

  return averageAge;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

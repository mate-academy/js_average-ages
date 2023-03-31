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
  const result = [];

  const menAverageAge = people.filter(person =>
    century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm'
  );

  menAverageAge.map(man => {
    return result.push(man.died - man.born);
  });

  return result.reduce((x, y) => x + y) / result.length;
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
  const result = [];

  const womenAverageAge = people.filter(woman =>
    withChildren
      ? people.some(child => woman.name === child.mother) && woman.sex === 'f'
      : woman.sex === 'f'
  );

  womenAverageAge.map(woman => {
    return result.push(woman.died - woman.born);
  });

  return result.reduce((x, y) => x + y) / result.length;
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
  const result = [];

  const arrMother = people.filter(person =>
    onlyWithSon
      ? people.some(child => person.mother === child.name && person.sex === 'm')
      : people.some(child => person.mother === child.name)
  );

  arrMother.map(child => {
    return result.push(child.born - people.find(mother =>
      mother.name === child.mother).born);
  });

  return result.reduce((x, y) => x + y) / result.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  const man = people
    .filter(person => {
      return century
        ? person.sex === 'm' && century === Math.ceil(person.died / 100)
        : person.sex === 'm';
    })
    .map(person => person.died - person.born);

  return man.reduce((acc, livedYears) => acc + livedYears, 0) / man.length;
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
  const mothers = people.map(person => person.mother);

  const women = people
    .filter(person => {
      return withChildren
        ? person.sex === 'f' && mothers.includes(person.name)
        : person.sex === 'f';
    })
    .map(person => person.died - person.born);

  return women.reduce((acc, livedYears) => acc + livedYears, 0) / women.length;
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
  const children = people.filter(child =>
    onlyWithSon
      ? people.find(mother => mother.name === child.mother) && child.sex === 'm'
      : people.find(mother => mother.name === child.mother)
  );
  const ageDifference = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born
  );

  return ageDifference.reduce((acc, age) => acc + age, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

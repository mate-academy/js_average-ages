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
 *
 *  */
function averageAge(array) {
  const average = array.reduce((total, person) => {
    let sum = total;

    sum += (person.died - person.born) / array.length;

    return sum;
  }, 0);

  return Math.round(average * 100) / 100;
};

function calculateMenAverageAge(people, century) {
  const onlyMan = people.filter(century
    ? person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century
    : person => person.sex === 'm');

  return averageAge(onlyMan);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for wom6
 *
 *  * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = people.filter(withChildren
    ? person => person.sex === 'f'
      && people.find(child => child.mother === person.name)
    : person => person.sex === 'f');

  return averageAge(onlyWomen);
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
  const onlyChildren = people.filter(onlyWithSon
    ? person => person.sex === 'm'
      && people.some(woman => woman.name === person.mother)
    : person => people.some(woman => woman.name === person.mother));

  const diferentAge = onlyChildren.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  return diferentAge.reduce((a, b) => a + b, 0) / diferentAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

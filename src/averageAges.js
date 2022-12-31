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
  const men = (century)
    ? people.filter(el => {
      return el.sex === 'm' && Math.ceil(el.died / 100) === century;
    })
    : filterBySex('m', people);

  return getAverageAge(men);
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
  const women = withChildren
    ? people.filter(person => {
      return person.sex === 'f'
        && people.some(innerEl => person.name === innerEl.mother);
    })
    : filterBySex('f', people);

  return getAverageAge(women);
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
  const children = (onlyWithSon)
    ? people.filter(child => {
      return child.mother !== null
        && people.some(innerEl => child.mother === innerEl.name)
        && child.sex === 'm';
    })
    : people.filter(el => {
      return el.mother !== null
        && people.some(innerEl => el.mother === innerEl.name);
    });

  return children.reduce((a, b) => {
    return a + (b.born - people.find(el => el.name === b.mother).born);
  }, 0) / children.length;
}

const getAverageAge = (array) => {
  return array.reduce((a, b) => a + (b.died - b.born), 0) / array.length;
};

const filterBySex = (sex, array) => {
  return array.filter(el => el.sex === sex);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

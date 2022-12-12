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
  const men = people.filter(person => (person.sex === 'm')
    && (century ? century === Math.ceil(person.died / 100) : true));

  const ageOfDeath = men.map(man => man.died - man.born);

  return getAverageAge(ageOfDeath);
}

// let men;
// if (century) {
//   men = people.filter(person => century === Math.ceil(person.died / 100)
//   && person.sex === 'm');
// } else {
//   men = people.filter(person => person.sex === 'm');
// }

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
  const women = people.filter(person => (person.sex === 'f')
  && (withChildren ? people.find(children => children.mother === person.name)
    : true));

  const ageOfDeath = women.map(woman => woman.died - woman.born);

  return getAverageAge(ageOfDeath);
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
    people.find(person => person.name === child.mother)
      && (onlyWithSon ? child.sex === 'm' : true));

  const childrenAgeDiff = children.map(child =>
    child.born - people.find(person => person.name === child.mother).born
  );

  const sumofAge = childrenAgeDiff.reduce((sum, age) => sum + age, 0);

  return Number((sumofAge / childrenAgeDiff.length).toFixed(2));
}

function getAverageAge(array) {
  const sumOfAge = array.reduce((sum, year) => (sum + year));

  return Number((sumOfAge / array.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

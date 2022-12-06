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
  const men = century
    ? people.filter(person => century === Math.ceil(person.died / 100)
      && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const ageOfDeath = men.map(man => man.died - man.born);

  const sumofAge = ageOfDeath.reduce((sum, age) => sum + age, 0);

  const averageOfMen = Number((sumofAge / ageOfDeath.length).toFixed(2));

  return averageOfMen;
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
  const women = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.find(children => children.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const ageOfDeath = women.map(woman => woman.died - woman.born);

  const sumofAge = ageOfDeath.reduce((sum, age) => sum + age, 0);

  const averageOfWomen = Number((sumofAge / ageOfDeath.length).toFixed(2));

  return averageOfWomen;
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
  const children = onlyWithSon
    ? people.filter(child =>
      people.find(person => person.name === child.mother)
      && child.sex === 'm')
    : people.filter(child =>
      people.find(person => person.name === child.mother));

  const childrenAgeDiff = children.map(child =>
    child.born - people.find(person => person.name === child.mother).born
  );

  const sumofAge = childrenAgeDiff.reduce((sum, age) => sum + age, 0);

  return Number((sumofAge / childrenAgeDiff.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

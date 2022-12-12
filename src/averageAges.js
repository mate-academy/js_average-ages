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
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const onlyMen = century
    ? people.filter(men => men.sex === 'm'
      && Math.ceil(men.died / 100) === century)
    : people.filter(men => men.sex === 'm');

  const ages = onlyMen.map(men => (men.died - men.born));

  const sumOfAge = ages.reduce((sum, age) => sum + age, 0);

  const menAverageAge = sumOfAge / ages.length;

  return menAverageAge;
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
  const onlyWomen = withChildren
    ? people.filter(women => people
      .some(kid => kid.mother === women.name))
    : people.filter(women => women.sex === 'f');

  const ages = onlyWomen.map(women => (women.died - women.born));

  const sumOfAge = ages.reduce((sum, age) => sum + age, 0);

  const womenAverageAge = sumOfAge / ages.length;

  return womenAverageAge;
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
    ? people.filter(kid => people
      .some(mom => kid.sex === 'm' && mom.name === kid.mother))
    : people.filter(kid => people
      .some(mom => mom.name === kid.mother));

  const ageDifference = children.map(kid => {
    const mother = people.find(mom => kid.mother === mom.name);

    return kid.born - mother.born;
  });

  const sumOfAge = ageDifference.reduce((sum, age) => sum + age, 0);

  const averageDifference = sumOfAge / ageDifference.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

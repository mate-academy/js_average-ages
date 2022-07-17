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
  const arrMan = people.filter(item => item.sex === 'm'
    && (century ? Math.ceil(item.died / 100) === century : true));

  const ageMan = arrMan.map(man => man.died - man.born);

  const avereAge = ageMan.reduce((sum, age) => {
    return sum + age;
  }, 0) / ageMan.length;

  return avereAge;
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
  const allWomen = people.filter(moms => moms.sex === 'f'
  && (withChildren ? people.some(child => child.mother === moms.name) : true));

  const ageWomen = allWomen.map(mother => mother.died - mother.born);

  const averageAge = +(ageWomen.reduce(
    (cumulate, age) => {
      return cumulate + age;
    }, 0) / ageWomen.length).toFixed(2);

  return averageAge;
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
  const children = people.filter((person) => onlyWithSon
    ? people.some((mother) => person.mother === mother.name
      && person.sex === 'm')
    : people.some((mother) => person.mother === mother.name));
  const average = children.reduce((sum, child) => {
    const mother = people.find((person) => person.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0) / children.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

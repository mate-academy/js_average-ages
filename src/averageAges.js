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
  const menList = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const ageDifference = menList.map(men => men.died - men.born);

  const avgAge = ageDifference.reduce((prevAge, currentAge) =>
    prevAge + currentAge) / ageDifference.length;

  return avgAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const motherNameList = [];
  let women = people.filter(person => person.sex === 'f');

  people.forEach(name => motherNameList.push(name.mother));

  if (withChildren) {
    women = women.filter(child => child.name === motherNameList.filter(mother =>
      mother === child.name)[0]);
  }

  const womenAge = women.map(person => person.died - person.born);

  const avgAge = womenAge.reduce((prevAge, currenAge) =>
    prevAge + currenAge, 0) / women.length;

  return avgAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childs = onlyWithSon
    ? people.filter(person => person.sex === 'm'
    && people.some(son => person.mother === son.name))
    : people.filter(women => people.some(son => women.mother === son.name));

  const ageDifference = childs.map(person => person.born - people.find(child =>
    person.mother === child.name).born);

  const avgAge = ageDifference.reduce((prevAge, currenAge) =>
    prevAge + currenAge, 0) / ageDifference.length;

  return avgAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

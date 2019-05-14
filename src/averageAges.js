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
  const allMen = century ? people.filter(person => person['sex'] === 'm' && Math.ceil(person['died'] / 100) === century) :
    people.filter(person => person['sex'] === 'm');

  if (!allMen.length) return `There are no men from ${century} century`;

  const averageAge = allMen.reduce((sum, currentMan) => {
    sum += (currentMan['died'] - currentMan['born']);
    return sum;
  }, 0);

  return (averageAge / allMen.length).toFixed(2);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const allWomen = withChildren ? people.filter(person => person['sex'] === "f" && people.some(human => human['mother'] === person['name'])) :
    people.filter(person => person['sex'] === 'f');

  const averageAge = allWomen.reduce((sum, currentWoman) => {
    sum += (currentWoman['died'] - currentWoman['born']);
    return sum
  }, 0);

  return (averageAge / allWomen.length).toFixed(2);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const allWomen = people.filter(person => person['sex'] === 'f');
  const allChidren = people.filter(person => allWomen.map(woman => woman['name']).includes(person['mother']));
  const children = onlyWithSon ? allChidren.filter(child => child['sex'] === 'm') : allChidren;

  const totalAge =  children.reduce((sum, child) => {
    sum += child['born'] - allWomen.find(woman => woman['name'] === child['mother']).born;
    return sum;
  },0);
 
  return (totalAge / children.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff
};

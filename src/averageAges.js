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
const middleAge = (age) => {
  return age.reduce((sum, a) => sum + (a.died - a.born), 0);
};

function calculateMenAverageAge(people, century) {
  const peopleWhichDiedInCentury = century
    ? people.filter(x => Math.ceil(x.died / 100) === century)
    : people;

  const menList = peopleWhichDiedInCentury.filter(men => men.sex === 'm');

  return middleAge(menList) / menList.length;
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
  const mothers = people
    .map(person => person.mother).filter(mother => mother !== null);

  const peopleWhitChildren = withChildren
    ? people.filter(child => mothers.includes(child.name))
    : people;

  const womenWithChidlren = peopleWhitChildren
    .filter(female => female.sex === 'f');

  return middleAge(womenWithChidlren) / womenWithChidlren.length;
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
  const children = people.filter(person => onlyWithSon
    ? people.some(male => person.mother === male.name) && (person.sex === 'm')
    : people.some(male => male.name === person.mother));

  const differentAge = children.map(person =>
    person.born - people.find(male => male.name === person.mother).born);

  const different = differentAge.reduce((p, y) => y + p, 0);

  return different / differentAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

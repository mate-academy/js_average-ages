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
const midleAge = (age) => {
  return age.reduce((sum, a) => sum + (a.died - a.born), 0);
};

function calculateMenAverageAge(people, century) {
  const centuryList = century
    ? people.filter(x => Math.ceil(x.died / 100) === century)
    : people;

  const menList = centuryList.filter(x => x.sex === 'm');

  return midleAge(menList) / menList.length;
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
  const mother = people.map(p => p.mother).filter(p => p !== null);

  const peopleWhitChildred = withChildren
    ? people.filter(x => mother.includes(x.name))
    : people;

  const womenWithChidlren = peopleWhitChildred.filter(x => x.sex === 'f');

  return midleAge(womenWithChidlren) / womenWithChidlren.length;
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
  const children = people.filter(p => onlyWithSon
    ? people.some(m => p.mother === m.name) && (p.sex === 'm')
    : people.some(m => m.name === p.mother));

  const differentAge = children.map(p =>
    p.born - people.find(m => m.name === p.mother).born);

  return differentAge.reduce((p, y) => y + p, 0)
  / differentAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

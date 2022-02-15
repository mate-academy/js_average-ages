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
  const men = people.filter(person => century
    ? person.sex === 'm' && calculateCentury(person.died) === century
    : person.sex === 'm'
  );

  const totalMenAges = men.reduce((total, { born, died }) => (
    total + (died - born)
  ), 0);

  return totalMenAges / men.length;
}

/**
 *
 * @param {number} died
 *
 * @return {number}
 */
function calculateCentury(died) {
  return Math.ceil(died / 100);
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
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && isMother(people, person)
    : person.sex === 'f'
  );

  const totalWomenAges = women.reduce((total, { born, died }) => (
    total + (died - born)
  ), 0);

  return totalWomenAges / women.length;
}

/**
 *
 * @param {object[]} people
 * @param {object} mother
 *
 * @return {boolean}
 */
function isMother(people, mother) {
  return people.some(person => person.mother === mother.name);
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
  const kids = people.filter(person => onlyWithSon
    ? person.sex === 'm' && hasMother(people, person)
    : hasMother(people, person)
  );

  const totalAges = kids.reduce((total, kid) => {
    const mother = people.find(person =>
      person.sex === 'f' && kid.mother === person.name
    );

    return total + (kid.born - mother.born);
  }, 0);

  return totalAges / kids.length;
}

/**
 *
 * @param {object[]} people
 * @param {object} kid
 *
 * @return {boolean}
 */
function hasMother(people, kid) {
  return people.some(person =>
    person.sex === 'f' && person.name === kid.mother
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const menAge = men.map((age) =>
    age.died - age.born);

  const totalManAge = menAge.reduce((sum, index) => sum + index);

  return totalManAge / men.length;
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
    ? person.sex === 'f' && motherAndChildren(people, person)
    : person.sex === 'f'
  );

  const womenAge = women.map((age) =>
    age.died - age.born);

  const totalAge = womenAge.reduce((sum, index) => sum + index);

  return totalAge / women.length;
}

function motherAndChildren(people, mother) {
  return people.some(person => person.mother === mother.name);
};

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
  const children = people.filter(person => onlyWithSon
    ? person.sex === 'm' && hasMother(people, person.mother)
    : hasMother(people, person.mother));

  const ageOfMothers = children.map(child =>
    child.born - motherBorn(people, child.mother));

  const totalAge = ageOfMothers.reduce((sum, index) => sum + index, 0);

  return totalAge / children.length;
}

function hasMother(people, motherName) {
  return people.some(person => person.name === motherName);
}

function motherBorn(people, motherName) {
  const mother = people.find(person => person.name === motherName);

  return mother.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

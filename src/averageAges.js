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
  const filteredPeople = century
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;

  const male = filteredPeople.filter(person => person.sex === 'm');

  const ages = male.reduce((sum, man) => sum + (man.died - man.born), 0);

  return ages / male.length;
};

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
  const filteredPeople = withChildren
    // eslint-disable-next-line max-len
    ? people.filter(person => people.some(child => child.mother === person.name))
    : people;

  const female = filteredPeople.filter(person => person.sex === 'f');
  // eslint-disable-next-line max-len
  const ages = female.reduce((sum, woman) => sum + (woman.died - woman.born), 0);

  return ages / female.length;
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
  const female = people
    .filter(person => person.sex === 'f')
    .filter(person => people.some(child => child.mother === person.name));

  const agePerson = [];

  if (onlyWithSon) {
    female.map(mother => people.map(child => {
      if (child.sex === 'm' && child.mother === mother.name) {
        agePerson.push(child.born - mother.born);
      }
    }));
  } else {
    female.map(mother => people.map(child => {
      if (child.mother === mother.name) {
        agePerson.push(child.born - mother.born);
      }
    }));
  }

  return agePerson.reduce((sum, gap) => sum + gap) / agePerson.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

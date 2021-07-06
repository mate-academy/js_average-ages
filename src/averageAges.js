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
  const filteredPeople = people.filter(person => person.sex === 'm');
  const filteredByCentury = filteredPeople
    .filter(person => Math.ceil(person.died / 100) === century);

  return !century
    ? calculateAverageAge(filteredPeople)
    : calculateAverageAge(filteredByCentury);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const filteredPeople = people.filter(person => person.sex === 'f');

  const filterChild = (person) => people
    .find(child => person.name === child.mother);
  const filteredByChild = filteredPeople.filter(filterChild);

  return !withChildren
    ? calculateAverageAge(filteredPeople)
    : calculateAverageAge(filteredByChild);
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
  const findAllWomenWithSon = (person) => {
    return person.sex === 'm'
    && people.some((mom) => mom.name === person.mother);
  };

  const findAllWomenWithChild = (person) =>
    people.some((mom) => mom.name === person.mother);

  const children = people.filter(
    onlyWithSon ? findAllWomenWithSon : findAllWomenWithChild
  );

  const yearsOld = children.map(child => {
    const mother = people.find(mom => child.mother === mom.name);

    return child.born - mother.born;
  });

  return yearsOld.reduce((acc, age) => acc + age) / yearsOld.length;
}

const calculateAverageAge = (ages) => {
  return +(ages
    .reduce((sum, age) => sum + (age.died - age.born), 0) / ages.length)
    .toFixed(2);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

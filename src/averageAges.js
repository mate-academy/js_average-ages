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
  const filteredArrayOfMen = people.filter((person) =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  const totalAge = getAverageAge(filteredArrayOfMen);

  return totalAge / filteredArrayOfMen.length;
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
  const filteredArrOfWomen = people.filter((human) => {
    return withChildren
      ? human.sex === 'f'
            && people.some(person => (person.mother === human.name))
      : human.sex === 'f';
  });

  const totalAge = getAverageAge(filteredArrOfWomen);

  return totalAge / filteredArrOfWomen.length;
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
  const ageDiff = people
    .filter((person) => (onlyWithSon ? person.sex === 'm' : person))
    .map((person) => {
      const motherOfPerson = people.find(
        (mother) => mother.name === person.mother
      );

      return motherOfPerson ? person.born - motherOfPerson.born : 0;
    })
    .filter((age) => age > 0);

  const totalAge = ageDiff.reduce((prev, next) => prev + next, 0);

  return +(totalAge / ageDiff.length).toFixed(2);
}

function getAverageAge(arr) {
  return arr.reduce((total, person) => {
    return total + (person.died - person.born);
  }, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

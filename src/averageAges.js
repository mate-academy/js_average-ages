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
  const diedInCentury = (person, centuryToCheck) => {
    return Math.ceil(person.died / 100) === centuryToCheck;
  };

  const isManAndDiedInCentury = (person, centuryToCheck) => {
    return hasSex(person, 'm') && diedInCentury(person, centuryToCheck);
  };

  const men = people.filter(man =>
    century
      ? isManAndDiedInCentury(man, century)
      : hasSex(man, 'm'));

  const agesSum = men.reduce(addAge, 0);

  return agesSum / men.length;
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
  const isWomanAndHasChild = (persons, woman) => {
    return persons.some(child => isChild(woman, child))
      && hasSex(woman, 'f');
  };

  const women = people.filter(woman =>
    withChildren
      ? isWomanAndHasChild(people, woman)
      : hasSex(woman, 'f'));

  const agesSum = women.reduce(addAge, 0);

  return agesSum / women.length;
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
  const isManAndIsChild = (persons, person) => {
    return hasSex(person, 'm')
      && persons.some(woman => isChild(woman, person));
  };

  const childrens = people.filter(person =>
    onlyWithSon
      ? isManAndIsChild(people, person)
      : people.some(woman => isChild(woman, person))
  );

  const mothersYears = childrens.map(children => {
    const mother = people.find(woman => isChild(woman, children));

    return children.born - mother.born;
  });

  const diffSum = mothersYears.reduce((a, b) => a + b, 0);

  return diffSum / mothersYears.length;
}

function addAge(sum, person) {
  return sum + person.died - person.born;
}

function hasSex(person, sex) {
  return person.sex === sex;
}

function isChild(woman, person) {
  return woman.name === person.mother;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

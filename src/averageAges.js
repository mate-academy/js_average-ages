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
  const men = people.filter(person => person.sex === 'm');

  if (century !== undefined) {
    const menDiedInCentury = men.filter(man =>
      (Math.ceil(man.died / 100)) === century);
    const ageOfMenDiedInCentury = menDiedInCentury.map(man =>
      man.died - man.born);
    const averageAgeOfDiedInCentury = ageOfMenDiedInCentury.reduce((p, n) =>
      p + n) / ageOfMenDiedInCentury.length;

    return averageAgeOfDiedInCentury;
  }

  const ageOfMen = men.map(man => man.died - man.born);
  const averageLifespan = ageOfMen.reduce((prev, curr) =>
    prev + curr) / ageOfMen.length;

  return averageLifespan;
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
  const women = people.filter(person => person.sex === 'f');

  if (withChildren !== undefined) {
    const mothers = women.filter(person =>
      people.some(child => child.mother === person.name));
    const ageOfMother = mothers.map(woman =>
      woman.died - woman.born);
    const averageLifespanMother = ageOfMother.reduce((p, n) =>
      p + n) / ageOfMother.length;

    return averageLifespanMother;
  }

  const ageOfWomen = women.map(woman =>
    woman.died - woman.born);
  const averageLifespan = ageOfWomen.reduce((p, n) =>
    p + n) / ageOfWomen.length;

  return averageLifespan;
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
  const children = people.filter(person =>
    people.some(mother => person.mother === mother.name));
  const mothers = people.filter(person =>
    children.some(child => child.mother === person.name));
  const motherOfChild = (child) => {
    return mothers.find(mother =>
      child.mother === mother.name);
  };

  if (onlyWithSon) {
    const sons = children.filter(person =>
      person.sex === 'm');

    return sons.reduce((p, n) =>
      p + (n.born - motherOfChild(n).born), 0) / sons.length;
  }

  return children.reduce((p, n) =>
    p + (n.born - motherOfChild(n).born), 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

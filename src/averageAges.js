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
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting
function calculateMenAverageAge(people, century) {
  const arrayOfMen = people.filter(man => man.sex === 'm');
  const arrayOfMenByCenturies = arrayOfMen.filter(man => century
    ? Math.ceil(man.died / 100) === century : man);
  const ageOfMen = arrayOfMenByCenturies.map(man => man.died - man.born);
  const averageOfMenAge = ageOfMen.reduce((prev, next) => prev + next, 0);

  return averageOfMenAge / ageOfMen.length;
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
  const arrayOfWomen = people.filter(woman => woman.sex === 'f');
  const womenWithChildren = arrayOfWomen.filter(woman => withChildren
    ? people.some(person => person.mother === woman.name) : woman);
  const ageOfWomen = womenWithChildren.map(woman => woman.died - woman.born);
  const averageOfWomenAge = ageOfWomen.reduce((prev, next) => prev + next, 0);

  return averageOfWomenAge / ageOfWomen.length;
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
  const peopleWithMother = people.filter(person => people.some(mother => (
    mother.name === person.mother && (onlyWithSon ? person.sex === 'm' : person)
  )));

  const sumOfDifferences = peopleWithMother
    .reduce((acc, { born: personBornDate, mother: motherName }) => {
      const motherBornDate = people.find((person) => person.name === motherName)
        .born;

      return acc + personBornDate - motherBornDate;
    }, 0);

  return Math.round(((sumOfDifferences / peopleWithMother.length) * 100)) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

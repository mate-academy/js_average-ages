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
  const men = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm');
  const ageMan = men.map((age) => age.died - age.born);

  const answer
    = ageMan.reduce((sum, item) => sum + item, 0) / ageMan.length;

  return Math.round(answer * 100) / 100;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const Woman = withChildren
    ? people.filter(
      (female) =>
        female.sex === 'f'
          && people.some((children) => female.name === children.mother)
    )
    : people.filter((female) => female.sex === 'f');

  const ageWoman = Woman.map((person) => person.died - person.born);
  const answer
    = ageWoman.reduce((sum, item) => sum + item, 0) / ageWoman.length;

  return Math.round(answer * 100) / 100;
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
  const differenceChildrenList = people
    .filter((item) => (onlyWithSon ? item.sex === 'm' : true))
    .map((person) => {
      const mother = people.find(
        (female) => female.name === person.mother && female.sex === 'f'
      );

      return mother ? person.born - mother.born : undefined;
    })
    .filter((item) => item !== undefined);

  const answer
    = differenceChildrenList.reduce((sum, current) => sum + current, 0)
    / differenceChildrenList.length;

  return Math.round(answer * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

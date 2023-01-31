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
const ageReducer = (prev, person) => (prev + (person.died - person.born));

function calculateMenAverageAge(people, century) {
  const allMen = people.filter(person => person.sex === 'm');
  const centuryFilter = person => (Math.ceil(person.died / 100) === century);
  const menArrayForRaduce = century === undefined
    ? allMen
    : allMen.filter(centuryFilter);

  return menArrayForRaduce.reduce(ageReducer, 0) / menArrayForRaduce.length;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
};

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
  const allWomen = people.filter(person => person.sex === 'f');
  const womenArrayForRaduce = withChildren === undefined
    ? allWomen
    : allWomen
      .filter(person => people
        .some(x => x.mother === person.name));

  return womenArrayForRaduce
    .reduce(ageReducer, 0) / womenArrayForRaduce.length;
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
  const children = people
    .filter(child => people
      .some(mother => child.mother === mother.name));
  const sons = children.filter(son => son.sex === 'm');

  const arrayToReduce = onlyWithSon === undefined ? children : sons;

  return arrayToReduce.reduce((prev, child) => {
    const motherObject = people.find(mother => child.mother === mother.name);

    return prev + (child.born - motherObject.born);
  }, 0) / arrayToReduce.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
function personAvgAge(male) {
  const totalAges = male.reduce((sum, human) =>
    sum + (human.died - human.born), 0);
  const avgAge = totalAges / male.length;

  return avgAge;
}

function filteredPeople(object, sex) {
  return object.filter((human) => human.sex === sex);
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = filteredPeople(people, 'm');
  const filteredMen = men.filter((human) => (century)
    ? Math.ceil(human.died / 100) === century
    : men);

  return personAvgAge(filteredMen);
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
  const women = filteredPeople(people, 'f');
  const filteredWomen = women.filter((human) => (withChildren)
    ? people.some((woman) =>
      woman.mother === human.name)
    : women);

  return personAvgAge(filteredWomen);
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
  const children = people.filter((human) => {
    const mother = people.some((woman) =>
      woman.name === human.mother);

    if (onlyWithSon) {
      return mother && human.sex === 'm';
    }

    return mother;
  });

  const difference = children.map((child) => {
    const motherObj = people.find((mom) => mom.name === child.mother);

    return child.born - motherObj.born;
  });

  const totalDiff = difference.reduce((diff, diffNext) => diff + diffNext, 0);

  return totalDiff / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

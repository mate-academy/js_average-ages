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
  let men = people.filter((x) => x.sex === 'm');

  if (century) {
    men = men.filter(onePeople =>
      century === Math.ceil(onePeople.died / 100)
    );
  }

  const sumOfAges = men.reduce((sum, man) => sum + (man.died - man.born), 0);

  return sumOfAges / men.length;
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
  let women = people.filter(x => x.sex === 'f');

  if (withChildren) {
    women = people.filter(oneWoman => {
      return people.some(x => x.mother === oneWoman.name);
    });
  }

  const sumOfAges = women.reduce((sum, wom) =>
    sum + (wom.died - wom.born), 0);

  return sumOfAges / women.length;
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
  let child = people.filter(onePeople => {
    return people.some(x => onePeople.mother === x.name);
  });

  if (onlyWithSon) {
    child = people.filter(one => {
      return (people.some(x => one.mother === x.name) && one.sex === 'm');
    });
  }

  const arrayAge = child.map(oneC => {
    return oneC.born - people.find(one => one.name === oneC.mother).born;
  });

  const sumArray = arrayAge.reduce((sum, index) => sum + index);

  return sumArray / child.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

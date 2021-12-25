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
function calculateMenAverageAge(people, century = 0) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const men = people.filter(human => human.sex === 'm');
  const correctMen = men.filter(man => Math.ceil(man.died / 100) === century);
  const resultMen = (century && correctMen) || men;
  const sumOfAges = resultMen.reduce(
    (sum, man) => sum + man.died - man.born, 0
  );

  return sumOfAges / resultMen.length;
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
function calculateWomenAverageAge(people, withChildren = 0) {
  const women = people.filter(human => human.sex === 'f');
  const mothers = women.filter(woman =>
    people.some(human => human.mother === woman.name));
  const resultWomen = (withChildren && mothers) || women;

  const sumOfAges = resultWomen.reduce(
    (sum, woman) => sum + woman.died - woman.born, 0
  );

  return sumOfAges / resultWomen.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const mothers = people.filter(human => {
    return people.some(person => person.mother === human.name);
  });

  const mothersWithSon = people.filter(human => {
    return people.some(person => ((person.mother === human.name)
      && (person.sex === 'm')));
  });

  const correctMothers = (onlyWithSon && mothersWithSon) || mothers;

  const children = people.filter(child =>
    correctMothers.some(mother => mother.name === child.mother));

  const sons = people.filter(child =>
    correctMothers.some(mother => (mother.name === child.mother)
    && (child.sex === 'm')));

  const correctChildren = (onlyWithSon && sons) || children;

  const countOfAgeDifferences = correctChildren.reduce(
    (sum, child) =>
      sum - correctMothers.find(mother => mother.name === child.mother).born
      + child.born
    , 0);

  return countOfAgeDifferences / correctChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

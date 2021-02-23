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
  const men = people.filter(
    human => human.sex === 'm'
  );

  const menOfCentury = men.filter(
    man => Math.ceil(man.died / 100) === century
  );

  const filteredMen = century ? menOfCentury : men;

  const allAges = filteredMen.map(
    man => man.died - man.born
  );

  const sumOfAges = allAges.reduce(
    (ageSum, age) => ageSum + age
  );

  return sumOfAges / allAges.length;
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
  const women = people.filter(
    human => human.sex === 'f'
  );
  const womenWithChildren = women.filter(woman =>
    people.some(human =>
      human.mother === woman.name)
  );
  const filteredWomen = withChildren ? womenWithChildren : women;

  const allAges = filteredWomen.map(
    woman => woman.died - woman.born
  );

  const sumOfAges = allAges.reduce(
    (ageSum, age) => ageSum + age
  );

  return sumOfAges / allAges.length;
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
  const children = people.filter(potentialChild =>
    people.some(potentialMother =>
      potentialChild.mother === potentialMother.name
    )
  );

  const onlySons = people.filter(potentialSon =>
    people.some(potentialMother =>
      potentialMother.name === potentialSon.mother && potentialSon.sex === 'm'
    )
  );

  const filteredChildren = onlyWithSon ? onlySons : children;

  const allAgesDifference = filteredChildren.map(child =>
    child.born - people.find(mother =>
      mother.name === child.mother).born
  );

  const sumOfDifference = allAgesDifference.reduce((diffSum, ageDiff) =>
    diffSum + ageDiff
  );

  const averageAgeDifference = sumOfDifference / filteredChildren.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

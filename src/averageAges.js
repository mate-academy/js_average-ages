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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const ifCentury = people.filter((person) => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'
  );

  const menAge = ifCentury.map((somth) => somth.died - somth.born);

  const averageMenAge = menAge.reduce((a, b) => a + b) / ifCentury.length;

  return averageMenAge;
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
  // write code here

  const ifWithChildren = people.filter((person) => withChildren
    ? people.find(child => child.mother === person.name) && person.sex === 'f'
    : person.sex === 'f'
  );

  const womenAge = ifWithChildren.map(sombody => sombody.died - sombody.born);

  const womenAverageAge
   = womenAge.reduce((a, b) => a + b, 0) / ifWithChildren.length;

  return womenAverageAge;
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
  // write code here

  const peopleChildren
   = people.filter((human) => onlyWithSon
     ? human.sex === 'm'
     && people.some((woman) => woman.name === human.mother)
     : people.some((woman) => woman.name === human.mother));

  const diffOfAge
  = peopleChildren.map((son) => {
    const truFalse = people.find((per) => son.mother === per.name);

    return son.born - truFalse.born;
  });

  const averageOfAges
   = diffOfAge.reduce((total, age) => total + age, 0) / diffOfAge.length;

  return averageOfAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

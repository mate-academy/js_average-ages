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
  const menArr = people.filter(
    person => person.sex === 'm'
      && (century === undefined
        ? true : Math.ceil(person.died / 100) === century
      )
  );

  const menAge = menArr.map(man => man.died - man.born);
  const totalAge = menAge.reduce((sum, age) => sum + age, 0);
  const avgAge = totalAge / menAge.length;

  return avgAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const womenArr = people.filter((person, index, all) =>
    person.sex === 'f'
    && (withChildren
      ? all.some(someone => someone.mother === person.name) : true
    )
  );

  const womenAge = womenArr.map(woman => woman.died - woman.born);
  const totalAge = womenAge.reduce((sum, age) => sum + age, 0);
  const avgAge = totalAge / womenAge.length;

  return avgAge;
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
  // write code here
  const allChild = people.filter(person => people.find(
    mother => mother.name === person.mother));
  const motherSon = people.filter(person => people.find(
    mother => mother.name === person.mother && person.sex === 'm'));

  const result = allChild.reduce((sum, child) => {
    const mother = people.find(mother1 => child.mother === mother1.name);

    return sum + (child.born - mother.born);
  }, 0) / allChild.length;

  const result2 = motherSon.reduce((sum, child) => {
    const mother = people.find(mother2 => child.mother === mother2.name);

    return sum + (child.born - mother.born);
  }, 0) / motherSon.length;

  return onlyWithSon === undefined ? result : result2;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

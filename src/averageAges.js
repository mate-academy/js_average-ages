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
  const onlyMen = people.filter(person => person.sex === 'm');
  const onlyMenAge = onlyMen.map(x => x.died - x.born);

  const menDiedInSomeCentury = onlyMen.filter(person =>
    century === (Math.ceil(person.died / 100)));
  const menDiedInSomeCenturyAge = menDiedInSomeCentury.map(x =>
    x.died - x.born);

  const middleAge = century ? menDiedInSomeCenturyAge : onlyMenAge;

  return middleAge.reduce((previousValue,
    currentValue) => previousValue + currentValue) / middleAge.length;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const onlyWomen = people.filter(person => person.sex === 'f');
  const onlyWomenAge = onlyWomen.map(x => x.died - x.born);

  const onlyWomenWithChildren = onlyWomen.filter(person =>
    people.some((child) => child.mother === person.name));
  const onlyWomenWithChildrenAge = onlyWomenWithChildren.map(x =>
    x.died - x.born);

  const middleAge = withChildren ? onlyWomenWithChildrenAge : onlyWomenAge;

  return middleAge.reduce((previousValue,
    currentValue) => previousValue + currentValue) / middleAge.length;
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
  const allChildren = people.filter(children =>
    people.some(mother => children.mother === mother.name));
  const allSon = allChildren.filter(person => person.sex === 'm');

  const operetionArrayOfChildren = onlyWithSon ? allSon : allChildren;

  const ageDifference = operetionArrayOfChildren.reduce((prev, child) => {
    const mother = people.find(person =>
      person.name === child.mother);

    return (child.born - mother.born) + prev;
  }, 0) / operetionArrayOfChildren.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

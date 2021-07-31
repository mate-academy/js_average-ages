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

  let arrMen;

  century
    ? arrMen = people.filter(person => person['sex'] === 'm'
      && Math.ceil(person.died / 100) === century)
    : arrMen = people.filter(person => person['sex'] === 'm');

  return (arrMen.reduce((prev, person) =>
    (prev + (person['died'] - person['born'])), 0)) / arrMen.length;
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
  // write code here
  let arrWomen;

  withChildren
    ? arrWomen = people.filter(person => person['sex'] === 'f'
      && people.some(el => (el['mother']) === person['name']))
    : arrWomen = people.filter(person => person['sex'] === 'f');

  return (arrWomen.reduce((prev, person) =>
    (prev + (person['died'] - person['born'])), 0)) / arrWomen.length;
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
  function calculateChildren(prev, person) {
    const copyPerson = { ...person };
    const mother = people.find(el => el['name'] === person['mother']);

    if (onlyWithSon && person['sex']
      === 'm' && people.some(el => el['name'] === person['mother'])) {
      copyPerson.bornMother = mother['born'];
      prev.push(copyPerson);
    }

    if (!onlyWithSon && people.some(el => el['name'] === person['mother'])) {
      copyPerson.bornMother = mother['born'];
      prev.push(copyPerson);
    }

    return prev;
  }

  const arrСhild = people.reduce(calculateChildren, []);

  function calculateDifferenceAge(prev, person) {
    const differenceAge = prev + (person['born'] - person['bornMother']);

    return differenceAge;
  }

  return arrСhild.reduce(calculateDifferenceAge, 0) / arrСhild.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

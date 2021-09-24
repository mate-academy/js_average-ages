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

  const filtered = people.filter(human => {
    const humanCentury = Math.ceil(human['died'] / 100);

    const isCentury = century === undefined
      ? human['sex'] === 'm'
      : humanCentury === century && human['sex'] === 'm';

    return isCentury;
  });

  const result = filtered.reduce((prev, curr) => {
    const currAge = curr['died'] - curr['born'];

    return prev + currAge;
  }, 0) / filtered.length;

  return result;
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

  const filtered = people.filter(human => {
    const isMother = people.some(potentialChild => {
      return potentialChild['mother'] === human['name'];
    });
    const isWoman = human['sex'] === 'f';
    const isWithChildren = withChildren === undefined
      ? isWoman
      : isMother && isWoman;

    return isWithChildren;
  });

  const result = filtered.reduce((prev, curr) => {
    const currAge = curr['died'] - curr['born'];

    return prev + currAge;
  }, 0) / filtered.length;

  return result;
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
  const result = [];

  people.forEach(human => {
    const mother = people.find(potentialMother => {
      const condition = onlyWithSon === undefined
        ? potentialMother['name'] === human['mother']
        : potentialMother['name'] === human['mother'] && human['sex'] === 'm';

      return condition;
    });

    const diffAge = mother
      ? human['born'] - mother['born']
      : 0;

    result.push(diffAge);
  });

  const resultWhoHasMom = result.filter(diff => diff !== 0);
  const sum = resultWhoHasMom.reduce((prev, curr) => prev + curr, 0);

  return sum / resultWhoHasMom.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

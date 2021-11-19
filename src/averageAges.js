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

function getSumAge(people) {
  return people
    .map((person) => person.died - person.born)
    .reduce((initValue, currentValue) => initValue + currentValue, 0);
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const arrMen = century
    ? people.filter(
      (person) =>
        person.sex === 'm' && Math.ceil(person.died / 100) === century
    )
    : people.filter((person) => person.sex === 'm');
  const sumAges = getSumAge(arrMen);

  return sumAges / arrMen.length;
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
  const arrWomen = withChildren
    ? people.filter(
      (person) =>
        person.sex === 'f'
          && people.find((child) => child.mother === person.name)
    )
    : people.filter((person) => person.sex === 'f');

  const sumAge = getSumAge(arrWomen);

  return Math.round((sumAge / arrWomen.length) * 100) / 100;
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

function getChildren(people, motherName) {
  const children = people.filter((item) => item.mother === motherName);

  return children;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const arrWomen = people.filter((person) => person.sex === 'f');
  const arrWomenWithExtraData = [];

  arrWomen.forEach((woman) => {
    const arrChildren = onlyWithSon
      ? getChildren(people, woman.name).filter((child) => child.sex === 'm')
      : getChildren(people, woman.name);

    if (arrChildren.length) {
      arrWomenWithExtraData.push({
        ...woman,
        ageOfBirthOfChildren: arrChildren.map(
          (child) => child.born - woman.born
        ),
      });
    }
  });

  const arrAges = arrWomenWithExtraData.reduce(
    (acc, woman) => [...acc, ...woman.ageOfBirthOfChildren],
    []
  );
  const sumAge = arrAges.reduce((acc, currentValue) => acc + currentValue, 0);

  return Math.round((sumAge / arrAges.length) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

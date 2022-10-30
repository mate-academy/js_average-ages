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
  let menArr = people.filter(el => el.sex === 'm');

  if (century) {
    menArr = menArr.filter(el => Math.ceil(el.died / 100) === century);
  }

  return getAverageAge(menArr);
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
  const mothers = people.map(el => el.mother);
  let womenArr = people.filter(el => el.sex === 'f');

  if (withChildren) {
    womenArr = getMothersWithCild(womenArr, mothers);
  }

  return getAverageAge(womenArr);
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
  const diffAgeArr = [];
  const mothers = people.map(el => el.mother);
  const mothersArr = getMothersWithCild(people, mothers);
  let kids = people.filter(el => el.mother !== null);

  if (onlyWithSon) {
    kids = kids.filter(el => el.sex === 'm');
  }

  for (const child of kids) {
    const mom = mothersArr.find(el => el.name === child.mother);

    if (mom) {
      diffAgeArr.push(child.born - mom.born);
    }
  }

  const diffAverageAge = diffAgeArr.reduce((sum, el) => sum + el, 0);

  return diffAverageAge / diffAgeArr.length;
}

function getAverageAge(people) {
  const age = people.map(el => el.died - el.born);
  const ageSum = age.reduce((sum, el) => sum + el, 0);

  return ageSum / age.length;
}

function getMothersWithCild(peopleArr, motherNamesArr) {
  const newArr = [];

  for (let i = 0; i < motherNamesArr.length; i++) {
    if (!newArr.find(el => el.name === motherNamesArr[i])) {
      newArr.push(...peopleArr.filter(el => el.name === motherNamesArr[i]));
    }
  }

  return newArr;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

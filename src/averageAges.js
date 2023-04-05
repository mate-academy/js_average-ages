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
  const males = people.filter(person => person.sex === 'm');
  const sumOfAge = males.reduce((totalAge, currentMale) => {
    return totalAge + (currentMale.died - currentMale.born);
  }, 0);

  const malesInCentury = males.filter(person => {
    return Math.ceil(person.died / 100) === century;
  });

  const sumOfAgeWithCentury = malesInCentury.reduce((totalAge, currentMale) => {
    return totalAge + (currentMale.died - currentMale.born);
  }, 0);

  const avarageAge = sumOfAge / males.length;
  const avrageAgeWithCentury = sumOfAgeWithCentury / malesInCentury.length;

  return century ? avrageAgeWithCentury : avarageAge;
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
  const females = people.filter(person => person.sex === 'f');
  const sumOfAge = females.reduce((totalAge, currentFemale) => {
    return totalAge + (currentFemale.died - currentFemale.born);
  }, 0);

  const femalesWithChildren = females.filter(person => {
    return people.some(child => child.mother === person.name);
  });

  const ageWithChild = femalesWithChildren.reduce((totalAge, currentFemale) => {
    return totalAge + (currentFemale.died - currentFemale.born);
  }, 0);

  return withChildren
    ? ageWithChild / femalesWithChildren.length
    : sumOfAge / females.length;
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
  const mothers = people.filter(person => {
    return people.some(child => child.mother === person.name);
  });

  const childrens = mothers.map(mother => {
    const children = people.filter(child => child.mother === mother.name);

    return children;
  }).reduce((total, current) => total.concat(current), []);

  const ageDifferences = childrens.map(child => {
    const childMother = mothers.find(mother => mother.name === child.mother);

    return child.born - childMother.born;
  });

  const boys = childrens.filter(child => child.sex === 'm');

  const ageDiffwithBoys = boys.map(boy => {
    const boyMother = mothers.find(mother => mother.name === boy.mother);

    return boy.born - boyMother.born;
  });

  const sumOfAge = ageDifferences.reduce((total, current) => {
    return total + current;
  }, 0);

  const sumOfAgeWithBoys = ageDiffwithBoys.reduce((total, current) => {
    return total + current;
  }, 0);

  const avgAgeDifference = sumOfAge / ageDifferences.length;
  const avgAgeDiffWithBoys = sumOfAgeWithBoys / boys.length;

  return onlyWithSon ? avgAgeDiffWithBoys : avgAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

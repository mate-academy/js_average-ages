'use strict';

function getSex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function getAges(people) {
  return people.map(person => person.died - person.born);
}

function getAverageAge(yearsOfLife) {
  const sumOfAges = yearsOfLife.reduce((sum, age) => sum + age);

  return sumOfAges / yearsOfLife.length;
}

function getMothers(people) {
  let arrOfMothersName = new Set(people.map(person => person.mother));

  arrOfMothersName.delete(null);
  arrOfMothersName = [...arrOfMothersName];

  return people.filter(
    person => arrOfMothersName.includes(person.name)
  );
}

function getChildren(people, sex) {
  const children = people.filter(person => person.mother !== null);

  return (sex)
    ? getSex(children, sex)
    : children;
}

function getMotherAndChildDiff(mothers, children) {
  const motherAndChildDiff = children.map(child => {
    const mother = mothers.find(m => m.name === child.mother);

    return mother === undefined ? '' : child.born - mother.born;
  });

  return motherAndChildDiff.filter(element => element !== '');
}
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
  const men = getSex(people, 'm');

  const peopleToSum = (century)
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  return getAverageAge(getAges(peopleToSum));
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
  const peopleToSum = (withChildren)
    ? getMothers(people)
    : getSex(people, 'f');

  return getAverageAge(getAges(peopleToSum));
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
  const mothers = getMothers(people);

  const children = (onlyWithSon)
    ? getChildren(people, 'm')
    : getChildren(people);

  const motherAndChildDiff = getMotherAndChildDiff(mothers, children);

  return getAverageAge(motherAndChildDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

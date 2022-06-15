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
  const peopleToSum = people.filter(person => {
    const condition = person.sex === 'm';
    const fullCondition = (
      condition && Math.ceil(person.died / 100) === century
    );

    return century === undefined ? condition : fullCondition;
  });

  const peopleAges = peopleToSum.map(person => person.died - person.born);

  const sumOfAges = peopleAges.reduce((sum, age) => sum + age);

  return sumOfAges / peopleToSum.length;
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
  let peopleToSum = people.filter(person => person.sex === 'f');

  if (withChildren) {
    let arrOfMothersName = new Set(people.map(person => person.mother));

    arrOfMothersName.delete(null);
    arrOfMothersName = [...arrOfMothersName];

    const mothers = peopleToSum.filter(
      person => arrOfMothersName.includes(person.name)
    );

    peopleToSum = mothers;
  }

  const peopleAges = peopleToSum.map(person => person.died - person.born);

  const sumOfAges = peopleAges.reduce((sum, age) => sum + age);

  return sumOfAges / peopleToSum.length;
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
  let arrOfMothersName = new Set(people.map(person => person.mother));

  arrOfMothersName.delete(null);
  arrOfMothersName = [...arrOfMothersName];

  const mothers = people.filter(
    person => arrOfMothersName.includes(person.name)
  );

  const children = people.filter(person => {
    const condition = person.mother !== null;
    const fullCondition = condition && person.sex === 'm';

    return onlyWithSon === undefined ? condition : fullCondition;
  });

  let motherAndChildDiff = children.map(child => {
    const mother = mothers.find(m => m.name === child.mother);

    return mother === undefined ? '' : child.born - mother.born;
  });

  motherAndChildDiff = motherAndChildDiff.filter(element => element !== '');

  const sumOfYears = motherAndChildDiff.reduce(
    (sum, difference) => sum + difference
  );

  return sumOfYears / motherAndChildDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

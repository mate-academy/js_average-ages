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
function calculateMenAverageAge(people, century = false) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter((person) => person.sex === 'm');
  let averageAge = 0;

  men.map((person) => (person.century = Math.ceil(person.died / 100)));
  men.map((person) => (person.age = person.died - person.born));

  if (century) {
    const menOfCentury = men.filter((person) => person.century === century);

    averageAge = menOfCentury.reduce((sum, currentObj) =>
      sum + currentObj.age, 0) / menOfCentury.length;

    return +averageAge.toFixed(2);
  }

  averageAge = men.reduce((sum, currentObj) =>
    sum + currentObj.age, 0) / men.length;

  return +averageAge.toFixed(2);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a women has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  const women = people.filter((person) => person.sex === 'f');
  let averageAgeWomen = 0;

  women.map((person) => (person.age = person.died - person.born));

  if (withChildren) {
    const mothersName = [];

    people.map((person) => mothersName.push(person.mother));

    const mothers = people.filter((person) =>
      mothersName.includes(person.name)
    );

    averageAgeWomen = mothers.reduce((sum, currentObj) =>
      sum + currentObj.age, 0) / mothers.length;

    return +averageAgeWomen.toFixed(2);
  }

  averageAgeWomen = women.reduce((sum, currentObj) =>
    sum + currentObj.age, 0) / women.length;

  return +averageAgeWomen.toFixed(2);
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const mothersArr = [];
  const childsArr = [];
  let count = 0;
  let ageSum = 0;
  let averageAgeDiff = 0;

  people.map((person) => mothersArr.push(person.mother));

  const mothers = people.filter((person) => mothersArr.includes(person.name));

  people.map((person) => childsArr.push(person.name));

  const childs = people.filter((person) => childsArr.includes(person.mother));

  if (onlyWithSon) {
    const sons = childs.filter((person) => person.sex === 'm');

    for (const mother of mothers) {
      for (const son of sons) {
        if (mother.name === son.mother) {
          count++;
          ageSum += son.born - mother.born;
        }
      }
    }
    averageAgeDiff = (ageSum / count).toFixed(2);

    return +averageAgeDiff;
  }

  for (const mother of mothers) {
    for (const child of childs) {
      if (mother.name === child.mother) {
        count++;
        ageSum += child.born - mother.born;
      }
    }
  }

  averageAgeDiff = (ageSum / count).toFixed(2);

  return +averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

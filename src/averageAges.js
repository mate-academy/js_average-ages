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
  const menOfPeople = people.filter(x => x.sex === 'm');

  const callback = (total, next) => {
    return total + (next.died - next.born);
  };

  if (century !== undefined) {
    const menOfPeopleCentury = menOfPeople.filter(x => {
      return Math.ceil(x.died / 100) === century;
    });

    const ageSumCentury = menOfPeopleCentury.reduce(callback, 0);

    return ageSumCentury / menOfPeopleCentury.length;
  }

  const ageSum = menOfPeople.reduce(callback, 0);

  return ageSum / menOfPeople.length;
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

  const womenOfPeople = people.filter(x => x.sex === 'f');

  const callback = (total, next) => {
    return total + (next.died - next.born);
  };

  if (withChildren === true) {
    const womenWithChildren = womenOfPeople.filter(x => {
      const mother = x.name;

      return people.some(y => y.mother === mother);
    });

    const agewomenWithChildren = womenWithChildren.reduce(callback, 0);

    return agewomenWithChildren / womenWithChildren.length;
  }

  const ageSum = womenOfPeople.reduce(callback, 0);

  return ageSum / womenOfPeople.length;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const callback = (total, next) => {
    const position = people.findIndex(x => x.name === next.mother);

    return total + (next.born - people[position].born);
  };

  const personWithMother = people.filter(x => {
    const mother = x.mother;

    return people.some(y => y.name === mother);
  });

  if (onlyWithSon === true) {
    const sonWithMother = people.filter(x => {
      const mother = x.mother;

      return people.some(y => y.name === mother) && x.sex === 'm';
    });

    const differenceMotherSon = sonWithMother.reduce(callback, 0);

    return differenceMotherSon / sonWithMother.length;
  }

  const differenceMotherChildren = personWithMother.reduce(callback, 0);

  return differenceMotherChildren / personWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

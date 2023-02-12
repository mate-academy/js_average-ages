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
  const men = people.filter(person => person.sex === 'm');
  let menDiedCentury;

  century ? menDiedCentury = men.filter(
    person => Math.ceil(person.died / 100) === century
  ) : menDiedCentury = men;

  const ages = menDiedCentury.map(person => (person.died - person.born));
  const sumAge = ages.reduce((sum, age) => sum + age, 0);

  return sumAge / ages.length;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = people.filter(person => person.sex === 'f');
  let womenWithChildren;

  if (withChildren) {
    womenWithChildren = [];

    women.forEach(woman => {
      if (people.findIndex(
        person => person.mother === woman.name) >= 0) {
        womenWithChildren.push(woman);
      }
    });
  } else {
    womenWithChildren = women;
  }

  const ages = womenWithChildren.map(person => (person.died - person.born));
  const sumAge = ages.reduce((sum, age) => sum + age, 0);

  return sumAge / ages.length;
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
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = [];

  women.forEach(woman => {
    if (people.findIndex(
      person => person.mother === woman.name) >= 0) {
      womenWithChildren.push(woman);
    }
  });

  const womenWithSon = [];
  let ages = [];

  if (onlyWithSon) {
    womenWithChildren.forEach(woman => {
      if (people.findIndex(
        person => person.mother === woman.name && person.sex === 'm') >= 0) {
        womenWithSon.push(woman);
      }
    });

    womenWithSon.forEach(woman => {
      const son1 = people.filter(
        son => woman.name === son.mother && son.sex === 'm');

      const sonBorn = [];

      son1.forEach(child => sonBorn.push(child.born));

      ages = ages.concat(sonBorn.map(age => age - woman.born));
    });
  } else {
    womenWithChildren.forEach(woman => {
      const son1 = people.filter(son => woman.name === son.mother);

      const sonBorn = [];

      son1.forEach(child => sonBorn.push(child.born));

      ages = ages.concat(sonBorn.map(age => age - woman.born));
    });
  }

  const sumAge = ages.reduce((sum, age) => sum + age, 0);

  return sumAge / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

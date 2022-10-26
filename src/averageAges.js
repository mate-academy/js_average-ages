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
  const men = people.filter(person => person.sex === 'm');
  const menOfTheCentury = !century ? men
    : men.filter(person => Math.ceil(person.died / 100) === century);
  const ages = menOfTheCentury.map(man => man.died - man.born);
  const fullSum = ages.reduce((sum, age) => sum + age, 0);

  // return Math.round(fullSum / ages.length);
  return fullSum / ages.length;
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
  const women = people.filter(person => person.sex === 'f');
  const filteredWomen = withChildren
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;
  const ages = filteredWomen.map(woman => woman.died - woman.born);
  const fullSum = ages.reduce((sum, age) => sum + age, 0);

  return fullSum / ages.length;
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
  const peopleWithMother = people.filter(person => person.mother !== null);
  const women = people.filter(woman => woman.sex === 'f');

  const getNameAndBirth = (prev, woman) => {
    return {
      ...prev,
      [woman.name]: woman.born,
    };
  };

  const mothersObj = women.reduce(getNameAndBirth, {});

  const targetAudience = onlyWithSon
    ? peopleWithMother.filter(man => man.sex === 'm')
    : peopleWithMother;

  const ageDiff = targetAudience
    .map(person => person.born - mothersObj[person.mother])
    .filter(element => !isNaN(element));

  const fullSum = ageDiff.reduce((prev, current) => prev + current, 0);

  return fullSum / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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

  const menOnlyArray = people.filter(el => el.sex === 'm');

  const filteredMenArray = !century
    ? menOnlyArray
    : menOnlyArray.filter(el => Math.ceil(el.died / 100) === century);

  const agesArr = filteredMenArray.map(el => el.died - el.born);
  const avgAge = agesArr.reduce((sum, age) => (sum + age), 0) / agesArr.length;

  return avgAge;
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
  const womenOnlyArray = people.filter(el => el.sex === 'f');
  const motherNamesList = people.map(el => el.mother);

  const filteredWomenArray = !withChildren
    ? womenOnlyArray
    : womenOnlyArray.filter(el => motherNamesList.includes(el.name));

  const agesArr = filteredWomenArray.map(el => el.died - el.born);
  const avgAge = agesArr.reduce((sum, age) => (sum + age), 0) / agesArr.length;

  return avgAge;
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

  // function to search birth year by name
  const bornYearByName = (name) =>
    people.find(el => el.name === name)
      ? people.find(el => el.name === name).born
      : null;

  // add new property to object
  people.forEach(el => {
    el.motherBorn = bornYearByName(el.mother);
  });

  // find an input array depends on 'onlyWithSon' param to provide calculations
  const mothersAndChildren = onlyWithSon
    ? people.filter(el => el.motherBorn !== null && el.sex === 'm')
    : people.filter(el => el.motherBorn !== null);

  // get age differences
  const ageDiff = mothersAndChildren.map(el => el.born - el.motherBorn);

  // get sum of age differences
  const ageDiffSum = ageDiff.reduce((sum, age) => (sum + age), 0);

  return ageDiffSum / mothersAndChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

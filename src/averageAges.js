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
  const fullData = people.map(person => {
    const result = Object.assign(person,
      person.century = Math.ceil(person.died / 100),
      person.age = person.died - person.born);

    return result;
  });

  const mansData = fullData.filter(person => person.sex === 'm');

  const averageAgeOfMans = mansData.reduce((acc, val) =>
    acc + val.age, 0) / mansData.length;

  const mansDataWithCentury = mansData.filter(person =>
    person.century === century);

  const averageAgeOfMansWithCentury = mansDataWithCentury.reduce((acc, val) =>
    acc + val.age, 0) / mansDataWithCentury.length;

  return +(averageAgeOfMansWithCentury).toFixed(2)
    || +(averageAgeOfMans).toFixed(2);
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
  // write code here
  const peopleAddAge = people.map(person => {
    const result = Object.assign(
      person,
      person.age = person.died - person.born);

    return result;
  });

  const womenData = peopleAddAge.filter(person => person.sex === 'f');

  const averageAgeOfWomen = womenData.reduce((acc, val) =>
    acc + val.age, 0) / womenData.length;

  const mothers = womenData.filter(mother => {
    return people.find(children => children.mother === mother.name);
  });

  const motherUnic = mothers.filter((person, index, array) => {
    return array.indexOf(person) === index;
  });

  const averageAgeOfWomenWithChildren = motherUnic.reduce((acc, val) => {
    return acc + val.age;
  }, 0) / motherUnic.length;

  return (withChildren
    && +(averageAgeOfWomenWithChildren).toFixed(2))
    || +(averageAgeOfWomen).toFixed(2);
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
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const children = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.some(mother => person.mother === mother.name)
    : people.some(mother => person.mother === mother.name)
  );

  const ageDiff = children.map(child =>
    child.born - people.find(mother => child.mother === mother.name).born
  );

  return +(ageDiff.reduce((acc, val) => acc + val)
    / ageDiff.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

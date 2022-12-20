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
function getResult(ageArray) {
  const agesArray = ageArray.filter(x => x > 0);

  const result = agesArray.reduce((sum, x) => sum + x, 0) / agesArray.length;

  return result;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const menAge = men.map(person => {
    person.age = person.died - person.born;

    century && (person.century = Math.ceil(person.died / 100));

    return person;
  });

  const ageArray = menAge.map(person => {
    return ((person.century === century) && person.age);
  });

  return getResult(ageArray);
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

  const womenAge = women.map(person => {
    person.age = person.died - person.born;

    return person;
  });

  const motherArr = people.map(person => person.mother);

  const ageArray = womenAge.map(person => ((withChildren
  && (motherArr.includes(person.name))) && person.age)
  || ((!withChildren) && person.age));

  return getResult(ageArray);
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
  const men = people.filter(person => person.sex === 'm');

  let newPeople;

  onlyWithSon ? newPeople = men : newPeople = people;

  const ageArray = newPeople.map(person1 => {
    people.map(person2 => {
      (person1.mother === person2.name)
      && (person1.difference = person1.born - person2.born);
    });

    return person1.difference;
  });

  return getResult(ageArray);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

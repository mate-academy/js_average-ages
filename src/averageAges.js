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
  const newPeople = people.filter(person => person.sex === 'm');

  const newPeopleAge = newPeople.map(person => {
    person.age = person.died - person.born;

    century && (person.century = Math.ceil(person.died / 100));

    return person;
  });

  const ageArr = newPeopleAge.map(person => {
    return ((person.century === century) && person.age);
  });

  const newAgeArr = ageArr.filter(x => x > 0);

  const avAge = newAgeArr.reduce((sum, x) => sum + x, 0) / newAgeArr.length;

  return avAge;
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
  const newPeople = people.filter(person => person.sex === 'f');

  const newPeopleAge = newPeople.map(person => {
    person.age = person.died - person.born;

    return person;
  });

  const motherArr = people.map(person => person.mother);

  const ageArr = newPeopleAge.map(person => ((withChildren
  && (motherArr.includes(person.name))) && person.age)
  || ((!withChildren) && person.age));

  const newAgeArr = ageArr.filter(x => x > 0);

  const avAge = newAgeArr.reduce((sum, x) => sum + x, 0) / newAgeArr.length;

  return avAge;
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
  const manPeople = people.filter(person => person.sex === 'm');

  let newPeople;

  onlyWithSon ? newPeople = manPeople : newPeople = people;

  const AgeDif = newPeople.map(person1 => {
    people.map(person2 => {
      (person1.mother === person2.name)
      && (person1.dif = person1.born - person2.born);
    });

    return person1.dif;
  });

  const newAgeDif = AgeDif.filter(x => x > 0);

  const avAgeDif = newAgeDif.reduce((sum, x) => sum + x, 0) / newAgeDif.length;

  return avAgeDif;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

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
  let ageMale = people.filter((x) => x.sex === 'm');

  if (century) {
    ageMale = ageMale.filter(onePeople =>
      century === Math.ceil(onePeople.died / 100)
    );
  }

  const agesInArray = ageMale.map(x => x.died - x.born);
  const sumArray = agesInArray.reduce((sum, index) => sum + index);

  return sumArray / ageMale.length;
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
  let womenWithCildren = people.filter((x) => x.sex === 'f');

  if (withChildren) {
    womenWithCildren = womenWithCildren.filter(person => {
      const motherList = people.some(name => name.mother === person.name);

      return motherList;
    });
  }

  const womenAgeInArray = womenWithCildren.reduce(
    (sum, person) => person.died - person.born + sum, 0);
  const res = womenAgeInArray / womenWithCildren.length;

  return res;
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
  let peopleWithMomList = people.filter(person => person.mother);
  let momCount = 0;

  if (onlyWithSon) {
    peopleWithMomList = people.filter(person => person.sex === 'm');
  }

  const allAge = peopleWithMomList.reduce((sum, person) => {
    const mom = people.find(momData => momData.name === person.mother);

    if (mom) {
      momCount++;

      return person.born - mom.born + sum;
    }

    return sum;
  }, 0);
  const averAge = allAge / momCount;

  return averAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

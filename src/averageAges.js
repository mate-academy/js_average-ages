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
  let diedMen;

  diedMen = people.filter(person => person.sex === 'm');

  if (century) {
    diedMen = people.filter(person => (Math.ceil(person.died / 100) === century)
     && (person.sex === 'm'));
  }

  const ageMen = diedMen.map(person => person.died - person.born);
  const sumAge = ageMen.reduce((acc, item) => acc + item);
  const averageAge = sumAge / ageMen.length;

  return averageAge;
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
  let womenArr;

  womenArr = people.filter(person => person.sex === 'f');

  const motherArr = [];

  if (withChildren) {
    womenArr.forEach(woman => {
      people.forEach(person => {
        if (person.mother === woman.name) {
          motherArr.push(woman);
        }
      });
    });
    womenArr = [...new Set(motherArr)];
  }

  const age = womenArr.map(person => person.died - person.born);
  const sum = age.reduce((acc, agePerson) => acc + agePerson, 0);
  const averegeAge = sum / age.length;

  return averegeAge;
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
  let ageMotherBorn = [];

  people.forEach(person => {
    const mother = people.find(item => item.name === person.mother);

    if (mother) {
      const ageBorn = +person.born - (+mother.born);

      ageMotherBorn.push(ageBorn);
    }
  });

  if (onlyWithSon) {
    const ageSonsMother = [];

    people.forEach(person => {
      const mother = people.find(item => item.name === person.mother
         && person.sex === 'm');

      if (mother) {
        const ageBorn = +person.born - (+mother.born);

        ageSonsMother.push(ageBorn);
      }
    });
    ageMotherBorn = [...ageSonsMother];
  }

  const sum = ageMotherBorn.reduce((acc, agePerson) => acc + agePerson, 0);

  const averegeAge = sum / ageMotherBorn.length;

  return averegeAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

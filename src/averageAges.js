'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  let menArray = people.filter((man) => {
    return man.sex === 'm';
  });

  if (century) {
    menArray = menArray.filter((man) => {
      return Math.ceil(man.died / 100) === century;
    });
  }

  const ageOfEveryPerson = menArray.map((manAge) => {
    return manAge.died - manAge.born;
  });

  const menAverageAge = ageOfEveryPerson.reduce((previousAge, currentAge) => {
    return previousAge + currentAge;
  }, 0);

  return menAverageAge / ageOfEveryPerson.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let womenArray = people.filter((woman) => (
    woman.sex === 'f'
  ));

  if (withChildren) {
    womenArray = womenArray.filter((womanName) => {
      return people.find((motherName) => {
        return motherName.mother === womanName.name;
      });
    });
  }

  const ageOfEveryPerson = womenArray.map((womanAge) => {
    return womanAge.died - womanAge.born;
  });

  const womenAverageAge = ageOfEveryPerson.reduce((previousAge, currentAge) => {
    return previousAge + currentAge;
  }, 0);

  return womenAverageAge / ageOfEveryPerson.length;
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let withMother = people.map((person) => {
    return {
      ...person,
      motherInfo:
      people.filter((mother) => {
        return mother.name === person.mother;
      }).map((motherBorn) => {
        return motherBorn.born;
      }).find((dateOfBorn) => {
        return dateOfBorn;
      }),
    };
  });

  if (onlyWithSon) {
    withMother = withMother.filter((man) => {
      return man.sex === 'm';
    });
  }

  withMother = withMother.filter((bithday) => {
    return bithday.motherInfo;
  });

  const everyAverageAge = withMother.reduce((previousAge, currentAge) => {
    return previousAge + (currentAge.born - currentAge.motherInfo);
  }, 0) / withMother.length;

  return everyAverageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

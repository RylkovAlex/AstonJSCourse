const createPerson = ({ name = 'New User', skills = [] }) => {
  const _skills = Symbol('skills');

  const user = {
    name,
    skills,
    addSkill(skill) {
      this[_skills].add(skill);
      this.skills = Array.from(this[_skills]);
      return this;
    },
    removeSkill(skill) {
      this[_skills].delete(skill);
      this.skills = Array.from(this[_skills]);
      return this;
    },
    addName(name) {
      this.name = name;
      return this;
    },
  };

  Object.defineProperty(user, _skills, {
    value: new Set(skills),
    enumerable: false,
    configurable: false,
  });

  return user;
};

// можно сразу геттер на skills, но тогда результат вывода будет отличаться от ТЗ (в skills будет геттер а не массив):
/* const createPerson = ({ name = 'New User', skills = [] }) => {
  const _skills = Symbol('skills');

  const user = {
    name,
    get skills() {
      return Array.from(this[_skills])
    },
    addSkill(skill) {
      this[_skills].add(skill);
      return this;
    },
    removeSkill(skill) {
      this[_skills].delete(skill);
      return this;
    },
    addName(name) {
      this.name = name;
      return this;
    },
  };

  Object.defineProperty(user, _skills, {
    value: new Set(skills),
    enumerable: false,
    configurable: false,
  });

  return user;
}; */

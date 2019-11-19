// create classes and relationships between classes and users
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        { class_name: 'Potions' },
        { class_name: 'Intro to React' },
        { class_name: 'Calculus' }
      ])
        .then(() => {
          return knex('user_classes').insert([
            { user_id: 1, class_id: 1 },
            { user_id: 2, class_id: 1 },
            { user_id: 3, class_id: 1 },
            { user_id: 2, class_id: 2 },
            { user_id: 3, class_id: 2 },
            { user_id: 1, class_id: 3 },
            { user_id: 3, class_id: 3 }
          ]);
        });
    });
};

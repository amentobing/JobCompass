/* eslint-disable camelcase */

exports.shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable('refreshToken', {
    id: {
      type: 'TEXT',
      primaryKey: true,
      notNull: true,
      default: pgm.func('gen_random_uuid()::text'),
    },
    userId: {
      type: 'TEXT',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    token: {
      type: 'TEXT',
      notNull: true,
      unique: true,
    },
  });
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('refreshToken');
};

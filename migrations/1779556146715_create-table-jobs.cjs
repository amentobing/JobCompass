/* eslint-disable camelcase */

exports.shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable('jobs', {
    id: {
      type: 'TEXT',
      primaryKey: true,
      notNull: true,
    },
    resumeId: {
      type: 'TEXT',
      notNull: true,
      references: 'resumes(id)',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    organization: {
      type: 'TEXT',
      notNull: true,
    },
    location: {
      type: 'TEXT',
      notNull: false,
    },
    countries: {
      type: 'TEXT',
      notNull: false,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    url: {
      type: 'TEXT',
      notNull: true,
    },
    org_url: {
      type: 'TEXT',
      notNull: false,
    },
    org_employees: {
      type: 'INTEGER',
      notNull: false,
    },
    org_slogan: {
      type: 'TEXT',
      notNull: false,
    },
    org_industry: {
      type: 'TEXT',
      notNull: false,
    },
    org_specialties: {
      type: 'TEXT',
      notNull: false,
    },
    org_locations: {
      type: 'TEXT',
      notNull: false,
    },
    org_description: {
      type: 'TEXT',
      notNull: false,
    },
    org_followers: {
      type: 'INTEGER',
      notNull: false,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable('jobs');
};

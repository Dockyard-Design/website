import * as migration_20260223_202100_add_section_galleries from './20260223_202100_add_section_galleries';

export const migrations = [
  {
    up: migration_20260223_202100_add_section_galleries.up,
    down: migration_20260223_202100_add_section_galleries.down,
    name: '20260223_202100_add_section_galleries'
  },
];

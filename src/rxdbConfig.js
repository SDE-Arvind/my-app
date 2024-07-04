import { addRxPlugin, createRxDatabase } from 'rxdb';

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

const schema = {
  title: 'user schema',
  version: 0,
  description: 'describes a user',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    }
  },
  required: ['firstName', 'lastName']
};

let dbPromise = null;
const _create = async () => {
  console.log('Creating database...');
  const db = await createRxDatabase({
    name: 'rxdbreactdb',
    storage:  getRxStorageDexie(),
    ignoreDuplicate: true
  });

  await db.addCollections({
    users: {
      schema: schema
    }
  });

  return db;
};

export const getDatabase = () => {
  if (!dbPromise) {
    dbPromise = _create();
  }
  return dbPromise;
};

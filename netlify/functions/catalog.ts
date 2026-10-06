import { CATALOGO_SMARTPHONES } from '../../src/data/phonesData.ts';

export const handler = async (event: any) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ catalog: CATALOGO_SMARTPHONES }),
  };
};

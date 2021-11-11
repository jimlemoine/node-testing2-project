const Car = require('./cars-model');
const db = require('../../data/db-config');

test('is testing environment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  
  beforeEach(async () => {
    await db.seed.run()
  })
  
  afterAll(async () => {
    await db.destroy()
  })

  describe('Cars model', () => {
      describe('getAll', () => {
          test('resolves all cars in the db', async () => {
            let data = await Car.getAll()  
            expect(data).toHaveLength(3)
          })
          test('resolves the correct shape', async () => {
            let data = await Car.getAll()  
            expect(data).toMatchObject(
                [
                    {name: 'Land Cruiser'},
                    {name: 'Gelandewagen'},
                    {name: 'Range Rover'}
                  ]
              )
          })
      })
      describe('getById', () => {
          test('returns correct car', async () => {
              const data = await Car.getById(2)
              expect(data).toMatchObject({ name: 'Gelandewagen' })
          })
      })
      describe('insert', () => {
          test('returns with inserted car', async () => {
              const data = await Car.insert({ name: 'Wrangler' })
              expect(data).toMatchObject({ id: 4, name: 'Wrangler' })
          })
      })
  })
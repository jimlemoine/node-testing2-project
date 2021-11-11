const server = require('./server');
const request = require('supertest');
const db = require('../data/db-config');

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

describe('[GET] /cars', () => {
    test('responds with all cars', async () => {
        const res = await request(server).get('/cars')
        expect(res.body).toHaveLength(3)
    })
    test('responds with 200', async () => {
        const res = await request(server).get('/cars')
        expect(res.status).toBe(200)
    })
})

describe('[GET] /cars/:id', () => {
    test('responds with Land Cruiser', async () => {
        const res = await request(server).get('/cars/1')
        expect(res.body).toMatchObject({ id: 1, name: 'Land Cruiser'})
    })
    test('responds with 200', async () => {
        const res = await request(server).get('/cars/1')
        expect(res.status).toBe(200)
    })
})

describe('[POST] /car', () => {
    test('responds with new car', async () => {
        const res = await request(server)
            .post('/cars').send({ name: 'Wrangler' })
        expect(res.body).toMatchObject({ id: 4, name: 'Wrangler' })
    })
    test('responds with status 201', async () => {
        const res = await request(server)
            .post('/cars').send({ name: 'Wrangler' })
        expect(res.status).toBe(201)
    })
})
import app from '../src/application'
import * as request from 'supertest';

// describe('We are grateful to you for doing this it.', () => {
//   it('thanks you', async () => {
//     await request(app)
//       .get('/hello')
//       .expect(200)
//       .expect(function(res) {
//         expect(res.body.greetings).toContain('Thank you');
//       });
//   })
// });

// Get Latest Entry
describe('Fetch latest entry of a person.', () => {
  it("Fetching last Record", async () => {
    await request(app)
      .get("/family/e3e2bff8-d318-4760-beea-841a75f00227")
      .expect(200)
      .expect(function(res) {
        console.log(res.body.event);
        expect(res.body.event).toHaveLength(1);
      });
  })
});

const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await agent.get('https://httpbin.org/ip');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await agent.get('https://httpbin.org/get').query(query);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
  });

  it('Consume HEAD Service', async () => {
    const response = await agent.head('https://httpbin.org/get');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.json).to.equal(undefined);
  });

  it('Consume PUT Service', async () => {
    const updateBody = {
      name: 'Holmes',
      age: '29',
      city: 'Sevilla'
    };

    const response = await agent.put('https://httpbin.org/put').send(updateBody);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.json).to.be.eql(updateBody);
  });

  it('Consume PATCH Service', async () => {
    const partialUpdateBody = {
      currentCity: 'Cali'
    };

    const response = await agent.patch('https://httpbin.org/patch').send(partialUpdateBody);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.json).to.be.eql(partialUpdateBody);
  });

  it('Consume DELETE Service', async () => {
    const deleteBody = {
      id: '1113'
    };

    const response = await agent.delete('https://httpbin.org/delete').send(deleteBody);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.json).to.be.eql(deleteBody);
  });
});

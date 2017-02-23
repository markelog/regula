describe('GET /hello', () => {
  it('respond with "hello world"', () => {
    return request(app)
      .get('/hello/world')
      .expect(200)
      .then((data) => {
        expect(data.text).to.equal('Hello world');
      });
  });
});

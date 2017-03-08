describe('/favicon.ico', () => {
  describe('GET /favicon.ico', () => {
    it('should ignore favicon request', () => {
      return request(app).get('/favicon.ico').expect(204);
    });
  });
});

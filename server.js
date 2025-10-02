app.get('/api/test', (req, res) => {
  res.json({ message: '서버 연결 성공!' });
});

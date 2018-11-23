import mockjs from 'mockjs';

export default {
  'GET /api/tags': (req, res) => {
    let current = req.query.page || 1
    res.send(mockjs.mock({
        'list|10': [{name: '@url',addr:'@county', date: '@date', 'value|1-100': 50, 'type|0-2': 1}],
        'total': 500,
        'current':current
      })
    )
  }
};

const middleware = (req, res, next) => {
  const urlParts = req.url.split('/');
  if (urlParts.length === 5 && urlParts[2] === 'courses' && urlParts[4] === 'lessons') {
    req.courseId = urlParts[3];
    req.lessonId = urlParts[5];
  }
  next();
};

module.exports = middleware;

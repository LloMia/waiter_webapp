module.exports = function(models) {
  const homepage = function(req, res, done) {
    user = req.params.user;
    res.render('index');
  }

        const selectedDays = function(req, res) {

            models.waiters.findOneAndUpdate({
              userName : req.params.user},{
                    days: req.body.days
                }, function(err, result) {
                    if (err) {
                        return done(err)

                    }

                    if (result == null) {
                      //create user with days
                      models.waiters.create({

                        userName : req.params.user,
                        days: req.body.days

                      }, function (err, createdName) {
                        if (err) {
                            return done(err)
                        }

                        // var data =

                        res.render('index', {
                          weeklyDays: createdName
                        })
                      })
                    }

                    if (result != null) {
                        res.render('index', {
                          weeklyDays: result
                        })
                    }

                })
            }

            return {
                selectedDays,
                homepage
            }
        }

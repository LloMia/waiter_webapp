module.exports = function(models) {
    const homepage = function(req, res, done) {
        user = req.params.user;

        res.render('index', {
            user
        });
    }

    const selectedDays = function(req, res) {
        var daysOfTheweek = req.body.days
        models.waiters.findOneAndUpdate({
            userName: req.params.user
        }, {
            days: req.body.days
        }, function(err, result) {
            if (err) {
                return done(err)

            }

            if (result == null) {
                //create user with days
                models.waiters.create({

                    userName: req.params.user,
                    days: req.body.days

                }, function(err, createdName) {
                    if (err) {
                        return done(err)
                    }

                    console.log(result);

                    res.render('index', {
                      userName: createdName.userName,
                      daysOfTheweek: createdName.days
                        // weeklyDays: createdName
                    })
                })
            }

            if (result != null) {
                res.render('index', {
                  userName: result.userName,
                  daysOfTheweek: result.days
                    // weeklyDays: result
                })
            }

        })
    }

    const admin = function(req, res) {
        models.waiters.find({}, function(err, results) {
            if (err) {
                return done(err);
            }
            if (results) {
                var data = [{
                        day: 'Sunday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Monday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Tuesday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Wednesday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Thursday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Friday',
                        user: [],
                        status: ''
                    },
                    {
                        day: 'Saturday',
                        user: [],
                        status: ''
                    }
                ]

                console.log(results);
                for (var i = 0; i < results.length; i++) {
                    var username = results[i].userName;
                    var workingdays = results[i].days;

                    for (var j = 0; j < workingdays.length; j++) {
                        var curDay = workingdays[j];
                        if (curDay == 'Sunday') {
                            data[0].user.push(username);
                        } else if (curDay == 'Monday') {
                            data[1].user.push(username);
                        } else if (curDay == 'Tuesday') {
                            data[2].user.push(username);
                        } else if (curDay == 'Wednesday') {
                            data[3].user.push(username);
                        } else if (curDay == 'Thursday') {
                            data[4].user.push(username);
                        } else if (curDay == 'Friday') {
                            data[5].user.push(username);
                        } else if (curDay == 'Saturday') {
                            data[6].user.push(username);
                        }
                    }
                    for (var b = 0; b < data.length; b++) {

                        var namesPerDay = data[b].user;
                        var statuscolor = data[b].status;

                        if (namesPerDay.length < 3) {
                            statuscolor = 'less';
                        }

                        if (namesPerDay.length == 3) {
                            statuscolor = 'enough';
                        }
                        if (namesPerDay.length > 3) {
                            statuscolor = 'many';
                        }

                        data[b].status = statuscolor

                    }
                }

                res.render('admin',  {data} )
            }
        })

    }
    const reset = function(req, res, done){


              models.waiters.remove(function(err) {
                  if (err) {

                      return done(err);

                  }
                  res.render('reset')
              })

    }

    return {
        selectedDays,
        homepage,
        admin,
        reset
    }
}
